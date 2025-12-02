import React, { createContext, ReactNode, useState } from "react";
import Meal from "../../utils/models/meal";
import { MEALS } from "@/utils/dummy-data";

export const FavoritesContext = createContext({
  favorites: [] as string[],
  addFavorite: (favoriteId: string) => {},
  removeFavorite: (favoriteId: string) => {},
});

interface FavoriteContextProviderProps {
  children: ReactNode;
}

const FavoriteContextProvider = ({ children }: FavoriteContextProviderProps): React.ReactElement => {
  const [favorites, setFavorites] = useState<string[]>([]);

  const addFavorite = (favoriteId: string) => {
    console.log('Adding to favorites:', favoriteId);
    setFavorites((prevFavorites) => {
      const newFavorites = [...prevFavorites, favoriteId];
      console.log('New favorites:', newFavorites);
      return newFavorites;
    });
  };

  const removeFavorite = (favoriteId: string) => {
    console.log('Removing from favorites:', favoriteId);
    setFavorites((prevFavorites) => {
      const newFavorites = prevFavorites.filter((favorite) => favorite !== favoriteId);
      console.log('New favorites after removal:', newFavorites);
      return newFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoriteContextProvider;

