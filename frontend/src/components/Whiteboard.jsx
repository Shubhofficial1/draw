import React, { useState, useRef, useLayoutEffect } from "react";
import Menu from "./Menu";
import rough from "roughjs";
import { toolTypes, actions } from "../redux/constants/constants";
import { useSelector } from "react-redux";

const Whiteboard = () => {
  const canvasRef = useRef();
  const toolType = useSelector((state) => state.whiteboard.tool);
  const [action, setAction] = useState(null);

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
      setAction(actions.DRAWING);
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
      />
    </>
  );
};

export default Whiteboard;
