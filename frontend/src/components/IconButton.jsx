import React from "react";

const IconButton = ({ src, type }) => {
  return (
    <button className="w-[40px] h-[40px] rounded-md border-none bg-emerald-100 hover:bg-emerald-300 flex items-center justify-center ">
      <img src={src} type={type} className="w-[80%] h-[80%]" />
    </button>
  );
};

export default IconButton;
