import rough from "roughjs";
import { toolTypes } from "../redux/constants/constants";

const generator = rough.generator();

const generateRectangle = ({ x1, y1, x2, y2 }) => {
  return generator.rectangle(x1, y1, x2 - x1, y2, y1);
};

export const createElement = ({ x1, y1, x2, y2, toolType, id }) => {
  let roughElement;
  switch (toolType) {
    case toolTypes.RECTANGLE:
      roughElement = generateRectangle({ x1, y1, x2, y2 });
      return {
        id: id,
        roughElement,
        type: toolType,
        x1,
        y1,
        x2,
        y2,
      };
    default:
      throw new Error("Something went wrong while creating element");
  }
};
