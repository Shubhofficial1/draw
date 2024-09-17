import { useState, useRef, useLayoutEffect } from "react";
import Menu from "./Menu";
import rough from "roughjs";
import {
  toolTypes,
  actionTypes,
  cursorPositions,
} from "../redux/constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { createElement } from "../utils/createElement";
import {
  updateElement,
  updatePencilElementWhenMoving,
} from "../utils/updateElement";
import { drawElement } from "../utils/drawElement";
import { adjustmentRequired } from "../utils/adjustmentRequired";
import { updateElementInStore } from "../redux/slices/whiteboardSlice";
import { adjustmentElementCoordinates } from "../utils/adjustElementCoordinates";
import { getElementAtPosition } from "../utils/getElementAtPosition";

import { v4 as uuid } from "uuid";
import { getCursorForPosition } from "../utils/getCursorForPosition";
import { getResizedCoordinates } from "../utils/getResizedCoordinates";

const Whiteboard = () => {
  const canvasRef = useRef();
  const textAreaRef = useRef();
  const [action, setAction] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const toolType = useSelector((state) => state.whiteboard.tool);
  const elements = useSelector((state) => state.whiteboard.elements);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const roughCanvas = rough.canvas(canvas);
    elements.forEach((element) => {
      drawElement({ roughCanvas, context: ctx, element });
    });
  }, [elements]);

  const handleMouseDown = (event) => {
    const { clientX, clientY } = event;

    if (selectedElement && action === actionTypes.WRITING) {
      return;
    }

    switch (toolType) {
      case toolTypes.RECTANGLE:
      case toolTypes.LINE:
      case toolTypes.PENCIL: {
        const element = createElement({
          x1: clientX,
          y1: clientY,
          x2: clientX,
          y2: clientY,
          toolType,
          id: uuid(),
        });
        setAction(actionTypes.DRAWING);
        setSelectedElement(element);
        dispatch(updateElementInStore(element));
        break;
      }
      case toolTypes.TEXT: {
        const element = createElement({
          x1: clientX,
          y1: clientY,
          x2: clientX,
          y2: clientY,
          toolType,
          id: uuid(),
        });
        setAction(actionTypes.WRITING);
        setSelectedElement(element);
        dispatch(updateElementInStore(element));
        break;
      }
      case toolTypes.SELECTION: {
        const element = getElementAtPosition(clientX, clientY, elements);

        if (
          element &&
          (element.type === toolTypes.RECTANGLE ||
            element.type === toolTypes.TEXT ||
            element.type === toolTypes.LINE)
        ) {
          setAction(
            element.position === cursorPositions.INSIDE
              ? actionTypes.MOVING
              : actionTypes.RESIZING
          );

          const offsetX = clientX - element.x1;
          const offsetY = clientY - element.y1;
          setSelectedElement({ ...element, offsetX, offsetY });
        }

        if (element && element.type === toolTypes.PENCIL) {
          setAction(actionTypes.MOVING);
          const xOffsets = element.points.map((point) => clientX - point.x);
          const yOffsets = element.points.map((point) => clientY - point.y);
          setSelectedElement({ ...element, xOffsets, yOffsets });
        }
        break;
      }
      default:
        throw new Error("Something went wrong while setting actionType");
    }
  };

  const handleMouseUp = () => {
    const selectedElementIndex = elements.findIndex(
      (el) => el.id === selectedElement?.id
    );

    if (selectedElementIndex !== -1) {
      if (action === actionTypes.DRAWING || action === actionTypes.RESIZING) {
        if (adjustmentRequired(elements[selectedElementIndex].type)) {
          const { x1, y1, x2, y2 } = adjustmentElementCoordinates(
            elements[selectedElementIndex]
          );
          updateElement(
            {
              id: selectedElement.id,
              index: selectedElementIndex,
              x1,
              y1,
              x2,
              y2,
              type: elements[selectedElementIndex].type,
            },
            elements
          );
        }
      }
    }
    setAction(null);
    setSelectedElement(null);
  };

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;

    if (action === actionTypes.DRAWING) {
      // Find index of selected element in store's elements array
      const index = elements.findIndex((el) => el.id === selectedElement.id);
      if (index !== -1) {
        updateElement(
          {
            id: elements[index].id,
            x1: elements[index].x1,
            y1: elements[index].y1,
            x2: clientX,
            y2: clientY,
            type: elements[index].type,
            index,
          },
          elements
        );
      }
    }

    if (toolType == toolTypes.SELECTION) {
      const element = getElementAtPosition(clientX, clientY, elements);
      event.target.style.cursor = element
        ? getCursorForPosition(element.position)
        : "default";
    }

    if (
      toolType === toolTypes.SELECTION &&
      action === actionTypes.MOVING &&
      selectedElement.type === toolTypes.PENCIL
    ) {
      const newPoints = selectedElement.points.map((_, index) => ({
        x: clientX - selectedElement.xOffsets[index],
        y: clientY - selectedElement.yOffsets[index],
      }));

      const index = elements.findIndex((el) => el.id === selectedElement.id);
      if (index !== -1) {
        updatePencilElementWhenMoving({ index, newPoints }, elements);
      }
      return;
    }
    if (
      toolType === toolTypes.SELECTION &&
      action === actionTypes.MOVING &&
      selectedElement
    ) {
      const { id, x1, x2, y1, y2, type, offsetX, offsetY, text } =
        selectedElement;
      const width = x2 - x1;
      const height = y2 - y1;
      const newX1 = clientX - offsetX;
      const newY1 = clientY - offsetY;

      const index = elements.findIndex((el) => el.id === selectedElement.id);

      if (index !== -1) {
        updateElement(
          {
            id,
            x1: newX1,
            y1: newY1,
            x2: newX1 + width,
            y2: newY1 + height,
            type,
            index,
            text,
          },
          elements
        );
      }
    }

    if (
      toolType === toolTypes.SELECTION &&
      action === actionTypes.RESIZING &&
      selectedElement
    ) {
      const { id, type, position, ...coordinates } = selectedElement;

      const { x1, y1, x2, y2 } = getResizedCoordinates(
        clientX,
        clientY,
        position,
        coordinates
      );

      const selectedElementIndex = elements.findIndex((el) => el.id === id);

      if (selectedElementIndex !== -1) {
        updateElement(
          {
            x1,
            x2,
            y1,
            y2,
            type: type,
            id: id,
            index: selectedElementIndex,
          },
          elements
        );
      }
    }
  };

  const handleTextAreaBlur = (event) => {
    const { id, x1, y1, type } = selectedElement;
    const index = elements.findIndex((el) => el.id === selectedElement.id);
    if (index !== -1) {
      updateElement(
        { id, x1, y1, type, text: event.target.value, index },
        elements
      );
      setAction(null);
      setSelectedElement(null);
    }
  };

  return (
    <>
      <Menu />
      {action === actionTypes.WRITING ? (
        <textarea
          ref={textAreaRef}
          onBlur={handleTextAreaBlur}
          style={{
            position: "absolute",
            top: selectedElement.y1 - 3,
            left: selectedElement.x1,
            font: "24px sans-serif",
            margin: "0px",
            padding: "0px",
            border: "0px",
            outline: "0px",
            resize: "auto",
            overflow: "hidden",
            whiteSpace: "pre",
            background: "transparent",
          }}
        />
      ) : null}
      <canvas
        id="canvas"
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      />
    </>
  );
};

export default Whiteboard;
