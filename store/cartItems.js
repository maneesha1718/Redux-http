import { createSlice } from "@reduxjs/toolkit";

const initialCartState = {showCart: false};

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState: initialCartState,
  reducers: {
    handleShowCart(state){
      state.showCart = !state.showCart;
    }
  }
})

export const cartItemsAction = cartItemsSlice.actions;

export default cartItemsSlice;