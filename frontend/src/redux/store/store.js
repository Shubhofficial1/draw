import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice.js";
import whiteboardSliceReducer from "../slices/whiteboardSlice.js";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    whiteboard: whiteboardSliceReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: ["whiteboard/updateElement"],
        ignorePaths: ["whiteboard.elements"],
      },
    }).concat(apiSlice.middleware),
  devTools: true,
});

export default store;
