import { toolTypes } from "../redux/constants/constants";
import { getStroke } from "perfect-freehand";
import { getSvgPathFromStroke } from "./getSvgPathFromStroke.js";

const drawPencilElement = (context, element) => {
  const myStroke = getStroke(element.points, {
    size: 10,
    simulatePressure: true,
  });
  const pathData = getSvgPathFromStroke(myStroke);
  const myPath = new Path2D(pathData);
  context.fill(myPath);
};

export const drawElement = ({ roughCanvas, context, element }) => {
  switch (element.type) {
    case toolTypes.RECTANGLE:
    case toolTypes.LINE:
      return roughCanvas.draw(element.roughElement);
    case toolTypes.PENCIL:
      drawPencilElement(context, element);
      break;
    default:
      throw new Error("Something went wrong while drawing element");
  }
};
