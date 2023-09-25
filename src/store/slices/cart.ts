import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { CartSliceState, CartItem } from './types';

const initialState: CartSliceState = {
  items: [],
  totalPrice: 0,
  totalAmount: 0,
};

const calculateTotalPrice = (items: CartItem[]) => {
  return items.reduce((sum, item) => {
    return item.price * item.selectedCount + sum;
  }, 0);
};

const calculateTotalAmount = (items: CartItem[]) => {
  return items.reduce((sum, item) => {
    return item.selectedCount + sum;
  }, 0);
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const findItem = state.items.find((item) => item.selectedId === action.payload.selectedId);
      if (findItem) {
        findItem.selectedCount++;
      } else {
        state.items.push(action.payload);
      }
      state.totalPrice = calculateTotalPrice(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.selectedId !== action.payload);
      state.totalPrice = calculateTotalPrice(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
    },
    clearItems: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.totalAmount = 0;
    },
    increment: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.selectedId === action.payload);
      if (findItem) {
        findItem.selectedCount++;
        state.totalPrice = calculateTotalPrice(state.items);
        state.totalAmount = calculateTotalAmount(state.items);
      }
    },
    decrement: (state, action: PayloadAction<string>) => {
      const findItem = state.items.find((item) => item.selectedId === action.payload);
      if (findItem && findItem.selectedCount !== 1) {
        findItem.selectedCount--;
      }
      state.totalPrice = calculateTotalPrice(state.items);
      state.totalAmount = calculateTotalAmount(state.items);
    },
  },
});

export const getCartSelector = (state: RootState) => state.cart;
export const getCartItemsSelector = (state: RootState) => state.cart.items;
export const getCartTotalPriceSelector = (state: RootState) => state.cart.totalPrice;
export const getCartTotalAmountSelector = (state: RootState) => state.cart.totalAmount;
export const getCartItemByIdSelector = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { addItem, removeItem, clearItems, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
