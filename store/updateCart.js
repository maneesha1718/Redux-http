import { createSlice } from '@reduxjs/toolkit';

const initialCart = { cartItems: [], totalQuantity: 0 }

const updateCartSlice = createSlice({
  name: 'updateCart',
  initialState: initialCart,
  reducers: {
    replaceCart(state, action) {
      state.totalQuantity = action.payload.totalQuantity;
      state.cartItems = action.payload.items;
    },
    handleAddToCart(state, action) {
      const cartItem = action.payload;
      console.log(cartItem);
      const existingItem = state.cartItems.find(item => item.id === cartItem.id);
      state.totalQuantity++;

      if (existingItem) {
        console.log(existingItem);
        existingItem.quantity++;
        existingItem.total = existingItem.total + existingItem.price;
      }
      else {
        state.cartItems.push({ id: cartItem.id, title: cartItem.title, quantity: 1, total: cartItem.price, price: cartItem.price })
      }
    },

    handleRemovefromCart(state, action) {
      const id = action.payload;
      const existingItemIndex = state.cartItems.findIndex(item => item.id === id);
      const existingItem = state.cartItems[existingItemIndex];
      state.totalQuantity--;
      console.log(existingItem)

      if (existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.total = existingItem.total - existingItem.price;
      }

      else {
        state.cartItems = state.cartItems.filter(item => item.id !== id);
      }
    }

  }
})

export const updateCartActions = updateCartSlice.actions;
export default updateCartSlice.reducer;
