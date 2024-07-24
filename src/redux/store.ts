import { configureStore } from '@reduxjs/toolkit';
import { api } from './services/api';
import { favoritesSlice } from './slices/favorites';
import { detailedCardSlice } from './slices/cardsSlice';
import { currentPageSlice } from './slices/currentPageSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    favorites: favoritesSlice.reducer,
    detailedCard: detailedCardSlice.reducer,
    currentPage: currentPageSlice.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
