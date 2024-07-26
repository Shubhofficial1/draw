import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setElements, setToolType } from "../redux/slices/whiteboardSlice";
import { emitClearWhiteboard } from "../socket/socketConnection";

const IconButton = ({ src, type, isRubber }) => {
  const dispatch = useDispatch();
  const selectedToolType = useSelector((state) => state.whiteboard.tool);

  const setToolTypeHandler = () => {
    dispatch(setToolType(type));
  };

  const handleClearCanvas = () => {
    dispatch(setElements([]));
    emitClearWhiteboard();
  };

  return (
    <button
      className={`w-[40px] h-[40px] rounded-md border-none bg-emerald-100 hover:bg-emerald-300 flex items-center justify-center ${
        selectedToolType == type ? "bg-emerald-300" : ""
      }`}
      onClick={isRubber ? handleClearCanvas : setToolTypeHandler}
    >
      <img src={src} type={type} className="w-[80%] h-[80%]" />
    </button>
  );
};

export default IconButton;
