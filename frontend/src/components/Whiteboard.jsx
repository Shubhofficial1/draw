import React, { useRef, useLayoutEffect } from "react";
import Menu from "./Menu";
import rough from "roughjs";

const Whiteboard = () => {
  const canvasRef = useRef();

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const rc = rough.canvas(canvas);
    rc.rectangle(10, 10, 100, 100);
    rc.rectangle(20, 20, 300, 300);
    rc.line(80, 120, 300, 100);
  }, []);

  return (
    <>
      <Menu />
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
      />
    </>
  );
};

export default Whiteboard;
