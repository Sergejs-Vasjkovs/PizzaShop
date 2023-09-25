import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { PizzaItem, PizzaSliceState, Status } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], Record<string, string>>(
  'pizzas/fetchPizzasStatus',
  async ({ categoryQuery, ratingQuery, searchQuery, limitQuery }) => {
    const { data } = await axios.get<PizzaItem[]>(
      'https://64b7971221b9aa6eb0788acf.mockapi.io/items?' +
        limitQuery +
        categoryQuery +
        ratingQuery +
        searchQuery,
    );
    return data;
  },
);

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setItems: (state, actions: PayloadAction<PizzaItem[]>) => {
      state.items = actions.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const getPizzasItemsSelector = (state: RootState) => state.pizzas.items;
export const getPizzasStatusSelector = (state: RootState) => state.pizzas.status;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
