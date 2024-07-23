import { toolTypes } from "../redux/constants/constants";

export const adjustmentRequired = (type) =>
  [toolTypes.RECTANGLE, toolTypes.LINE].includes(type);
