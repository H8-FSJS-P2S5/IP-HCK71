import { configureStore } from "@reduxjs/toolkit";
// Import your reducers here
import gadgetReducer from "./features/gadgetSlice";

const store = configureStore({
  reducer: {
    // Add your reducers here
    gadget: gadgetReducer,
  },
});

export default store;
