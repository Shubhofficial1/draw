import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice.js";
import whiteboardSliceReducer from "../slices/whiteboardSlice.js";
import cursorSliceReducer from "../slices/cursorSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    whiteboard: whiteboardSliceReducer,
    cursor: cursorSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
  devTools: true,
});

export default store;

// serializableCheck: false, // use this for now , but not recommended

// serializableCheck: {
//   ignoreActions: ["whiteboard/updateElementInStore"],
//   ignorePaths: ["whiteboard.elements"],
// },
