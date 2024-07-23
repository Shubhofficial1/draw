import { toolTypes } from "../redux/constants/constants";

export const drawElement = ({ roughCanvas, context, element }) => {
  switch (element.type) {
    case toolTypes.RECTANGLE:
      return roughCanvas.draw(element.roughElement);
    default:
      throw new Error("Something went wrong while drawing element");
  }
};