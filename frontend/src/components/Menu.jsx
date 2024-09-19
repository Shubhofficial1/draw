import IconButton from "./IconButton";
import rectangleSVG from "/assets/rectangle.svg";
import lineSVG from "/assets/line.svg";
import rubberSVG from "/assets/rubber.svg";
import pencilSVG from "/assets/pencil.svg";
import textSVG from "/assets/text.svg";
import selectionSVG from "/assets/selection.svg";
import { toolTypes } from "../redux/constants/constants";

const Menu = () => {
  return (
    <div className="top-4 px-3 right-[calc(50%-125px)] absolute flex justify-around items-center bg-[#1a1f26] rounded-lg w-[250px] h-[45px]">
      <IconButton src={rectangleSVG} type={toolTypes.RECTANGLE} />
      <IconButton src={lineSVG} type={toolTypes.LINE} />
      <IconButton src={rubberSVG} type={toolTypes.RUBBER} isRubber />
      <IconButton src={pencilSVG} type={toolTypes.PENCIL} />
      <IconButton src={textSVG} type={toolTypes.TEXT} />
      <IconButton src={selectionSVG} type={toolTypes.SELECTION} />
    </div>
  );
};

export default Menu;
