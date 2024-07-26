import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tool: null,
  elements: [],
};

const whiteboardSlice = createSlice({
  name: "whiteboard",
  initialState,
  reducers: {
    setToolType: (state, action) => {
      state.tool = action.payload;
    },
    updateElementInStore: (state, action) => {
      const { id } = action.payload;
      const index = state.elements.findIndex((element) => element.id === id);
      if (index === -1) {
        state.elements.push(action.payload);
      } else {
        // If index has been found, update that element in current array.
        state.elements[index] = action.payload;
      }
    },
    setElements: (state, action) => {
      state.elements = action.payload;
    },
  },
});

export const { setToolType, updateElementInStore, setElements } =
  whiteboardSlice.actions;

export default whiteboardSlice.reducer;
