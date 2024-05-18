import React from "react";
import IconButton from "./IconButton";
import rectangleSVG from "/assets/rectangle.svg";
import { toolTypes } from "../redux/constants/constants";

const Menu = () => {
  return (
    <div className="absolute top-0 right-[calc(50%-175px)] h-[60px] w-[350px] bg-slate-400  rounded-b-md flex items-center justify-around">
      <IconButton src={rectangleSVG} type={toolTypes.RECTANGLE} />
    </div>
  );
};

export default Menu;
