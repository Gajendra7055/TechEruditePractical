import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../types/types';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    items: [] as Event[],
  },
  reducers: {
    addToFavorites: (state, action: PayloadAction<Event>) => {
      const event = action.payload;
      const isAlreadyFavorite = state.items.some((item) => item.event_date_id === event.event_date_id);

      if (!isAlreadyFavorite) {
        state.items.push(event); 
      }
    },
    removeFromFavorites: (state, action: PayloadAction<number>) => {
      const eventId = action.payload;
      state.items = state.items.filter((item) => item.event_date_id !== eventId); 
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;