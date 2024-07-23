import { toolTypes } from "../redux/constants/constants";
import { createElement } from "./createElement";
import store from "../redux/store/store";
import { setElements } from "../redux/slices/whiteboardSlice";

export const updateElement = (
  { id, x1, x2, y1, y2, type, index },
  elements
) => {
  const elementsCopy = [...elements];

  switch (type) {
    case toolTypes.LINE:
    case toolTypes.RECTANGLE:
      const updatedElement = createElement({
        id,
        x1,
        y1,
        x2,
        y2,
        toolType: type,
      });
      elementsCopy[index] = updatedElement;
      store.dispatch(setElements(elementsCopy));
      break;
    default:
      throw new Error("Something went wrong while updating element");
  }
};
