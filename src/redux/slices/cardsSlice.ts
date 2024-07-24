import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TCard } from '../../types/types';

type DetailedCardState = {
  detailedCard: TCard | Record<string, never>;
};

const initialState: DetailedCardState = {
  detailedCard: {},
};

export const detailedCardSlice = createSlice({
  name: 'detailedCardSlice',
  initialState,
  reducers: {
    addDetailedCard: (state, action: PayloadAction<TCard>) => {
      state.detailedCard = action.payload;
    },

    removeDetailedCard: state => {
      state.detailedCard = {};
    },
  },
});

export const { addDetailedCard, removeDetailedCard } = detailedCardSlice.actions;

export default detailedCardSlice.reducer;
