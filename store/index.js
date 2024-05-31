import { configureStore } from "@reduxjs/toolkit";
import updateCartSlice from './updateCart';
import cartItemsSlice from "./cartItems";

const store = configureStore({
  reducer:{ updateCart: updateCartSlice, cartItems: cartItemsSlice.reducer }
});

export default store;