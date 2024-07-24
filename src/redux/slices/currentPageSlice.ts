import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '../../types/types';

type PageState = {
  pages: number | undefined;
  currentPage: number;
  currentPageCards: TCard[] | undefined;
};
const initialState: PageState = {
  pages: 0,
  currentPage: 1,
  currentPageCards: [],
};
export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    addPage: (state, action: PayloadAction<PageState>) => {
      const { pages, currentPage, currentPageCards } = action.payload;
      state.pages = pages;
      state.currentPageCards = currentPageCards;
      state.currentPage = pages && action.payload.currentPage > pages ? pages : currentPage;
    },
  },
});

export const { addPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
