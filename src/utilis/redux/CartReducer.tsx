import {createSlice} from '@reduxjs/toolkit';
// export interface CounterState {
//   value: number;
// }

const initialState = {
  cart: [],
};
export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemsPresent = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (itemsPresent) {
        itemsPresent.quantity++;
      } else {
        state.cart.push({...action.payload, quantity: 1});
      }
    },
    removeFromCart: (state, action) => {
      const removeItem = state.cart.filter(
        item => item.id !== action.payload.id,
      );
      state.cart = removeItem;
    },
    incrementQty: (state, action) => {
      const itemsPresent = state.cart.find(
        item => item.id === action.payload.id,
      );
      itemsPresent.quantity++;
    },
    decrementQty: (state, action) => {
      const itemsPresent = state.cart.find(
        item => item.id === action.payload.id,
      );
      if (itemsPresent.quantity === 1) {
        itemsPresent.quantity = 0;
        const removeItem = state.cart.filter(
          item => item.id !== action.payload.id,
        );
        state.cart = removeItem;
      } else {
        itemsPresent.quantity--;
      }
    },
    clearCart: state => {
      state.cart = [];
    },
  },
});
export const {
  addToCart,
  removeFromCart,
  incrementQty,
  decrementQty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
