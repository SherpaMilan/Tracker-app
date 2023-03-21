import { configureStore } from "@reduxjs/toolkit";
import setUSer from "./redux/user/userSlice";
import transReducer from "./redux/transaction/transSlice";

const store = configureStore({
  reducer: {
    user: setUSer,
    transaction: transReducer,
  },
});

export default store;
