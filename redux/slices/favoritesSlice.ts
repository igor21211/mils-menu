import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesState {
  favorites: string[];
}

const initialState: FavoritesState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<string>) => {
      const mealId = action.payload;
      if (!state.favorites.includes(mealId)) {
        console.log('Redux: Adding to favorites:', mealId);
        state.favorites.push(mealId);
        console.log('Redux: New favorites:', state.favorites);
      }
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      const mealId = action.payload;
      console.log('Redux: Removing from favorites:', mealId);
      state.favorites = state.favorites.filter((id) => id !== mealId);
      console.log('Redux: New favorites after removal:', state.favorites);
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const mealId = action.payload;
      const index = state.favorites.indexOf(mealId);
      if (index > -1) {
        state.favorites.splice(index, 1);
        console.log('Redux: Toggled OFF:', mealId);
      } else {
        state.favorites.push(mealId);
        console.log('Redux: Toggled ON:', mealId);
      }
    },
  },
});

export const { addFavorite, removeFavorite, toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

