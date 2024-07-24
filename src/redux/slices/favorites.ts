import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '../../types/types';

type FavoritesState = {
  favorites: TCard[];
};

const initialState: FavoritesState = {
  favorites: [],
};

export const favoritesSlice = createSlice({
  name: 'favoritesList',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<TCard>) => {
      state.favorites = [...state.favorites, action.payload];
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.favorites = [...state.favorites.filter(card => card.id !== action.payload)];
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
