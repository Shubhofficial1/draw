import React, { useState, useRef, useLayoutEffect } from "react";
import Menu from "./Menu";
import rough from "roughjs";
import { toolTypes, actionTypes } from "../redux/constants/constants";
import { useSelector, useDispatch } from "react-redux";
import { createElement } from "../utils/createElement";
import { v4 as uuid } from "uuid";
import { updateElement } from "../redux/slices/whiteboardSlice";

let selectedElement;

const setSelectedElement = (el) => {
  selectedElement = el;
};

const Whiteboard = () => {
  const canvasRef = useRef();
  const [action, setAction] = useState(null);

  const toolType = useSelector((state) => state.whiteboard.tool);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const rc = rough.canvas(canvas);
    rc.rectangle(10, 10, 100, 100);
    rc.rectangle(20, 20, 300, 300);
    rc.line(80, 120, 300, 100);
  }, []);

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
    dispatch(updateElement(element));
  };

  const handleMouseUp = () => {
    setAction(null);
    setSelectedElement(null);
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
      />
    </>
  );
};

export default Whiteboard;
