import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SortSliceState } from './types';

const initialState: SortSliceState = {
  value: 'rating ↑',
  currentPage: 1,
  category: 'All',
  searchValue: '',
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSort: (state, actions: PayloadAction<string>) => {
      state.value = actions.payload;
    },
    setCurrentPage: (state, actions: PayloadAction<number>) => {
      state.currentPage = actions.payload;
    },
    setCurrentCategory: (state, actions: PayloadAction<string>) => {
      state.category = actions.payload;
    },
    setSearchValue: (state, actions: PayloadAction<string>) => {
      state.searchValue = actions.payload;
    },
    setFilters: (state, actions: PayloadAction<SortSliceState>) => {
      state.currentPage = Number(actions.payload.currentPage);
      state.value = actions.payload.value;
      state.category = actions.payload.category;
    },
  },
});

export const getSortValueSelector = (state: RootState) => state.sort.value;
export const getSortCurrentPageSelector = (state: RootState) => state.sort.currentPage;
export const getSortCategorySelector = (state: RootState) => state.sort.category;
export const getSortSearchValueSelector = (state: RootState) => state.sort.searchValue;

export const { setSort, setCurrentPage, setFilters, setSearchValue, setCurrentCategory } =
  sortSlice.actions;

export default sortSlice.reducer;
