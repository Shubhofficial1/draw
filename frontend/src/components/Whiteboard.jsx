import React, { useState, useRef, useLayoutEffect } from "react";
import Menu from "./Menu";
import rough from "roughjs";
import { toolTypes, actionTypes } from "../redux/constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { createElement } from "../utils/createElement";
import { updateElement } from "../utils/updateElement";
import { drawElement } from "../utils/drawElement";
import { updateElementInStore } from "../redux/slices/whiteboardSlice";
import { v4 as uuid } from "uuid";

let selectedElement;

const setSelectedElement = (el) => {
  selectedElement = el;
};

const Whiteboard = () => {
  const canvasRef = useRef();
  const [action, setAction] = useState(null);
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

    if (toolType === toolTypes.RECTANGLE) {
      setAction(actionTypes.DRAWING);
    }

    const element = createElement({
      x1: clientX,
      y1: clientY,
      x2: clientX,
      y2: clientY,
      toolType,
      id: uuid(),
    });

    setSelectedElement(element);
    dispatch(updateElementInStore(element));
  };

  const handleMouseUp = () => {
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
  };

  return (
    <>
      <Menu />
      <canvas
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
