import React from "react";
import IconButton from "./IconButton";
import rectangleSVG from "/assets/rectangle.svg";
import lineSVG from "/assets/line.svg";
import rubberSVG from "/assets/rubber.svg";
import pencilSVG from "/assets/pencil.svg";
import textSVG from "/assets/text.svg";

import { toolTypes } from "../redux/constants/constants";

const Menu = () => {
  return (
    <div className="top-0 right-[calc(50%-175px)] absolute flex justify-around items-center bg-slate-400 rounded-b-md w-[350px] h-[60px]">
      <IconButton src={rectangleSVG} type={toolTypes.RECTANGLE} />
      <IconButton src={lineSVG} type={toolTypes.LINE} />
      <IconButton src={rubberSVG} type={toolTypes.RUBBER} isRubber />
      <IconButton src={pencilSVG} type={toolTypes.PENCIL} />
      <IconButton src={textSVG} type={toolTypes.TEXT} />
    </div>
  );
};

export default Menu;
