import { useDispatch, useSelector } from "react-redux";
import { setElements, setToolType } from "../redux/slices/whiteboardSlice";
import { emitClearWhiteboard } from "../socket/socketConnection";

// eslint-disable-next-line react/prop-types
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
      className={`w-[35px] h-[35px] rounded-md border-none hover:bg-[#87CEFA] hover:opacity-90 flex items-center justify-center ${
        selectedToolType == type ? "bg-[#87CEFA]" : ""
      }`}
      onClick={isRubber ? handleClearCanvas : setToolTypeHandler}
    >
      <img src={src} type={type} alt={src} className="w-[100%] h-[100%] p-2" />
    </button>
  );
};

export default IconButton;
