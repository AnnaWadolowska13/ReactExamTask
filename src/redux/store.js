import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./products/reducer";
import { shopingListReducer } from "./shopingList/reducer";

export const store = configureStore({
  reducer: {
    products: productReducer,
    shopingList: shopingListReducer
  },
});
