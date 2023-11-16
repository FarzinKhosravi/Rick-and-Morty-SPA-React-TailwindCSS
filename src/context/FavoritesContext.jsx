import { createContext, useContext, useState } from "react";
import getLocalStorage from "./../localStorage/getLocalStorage";
import saveLocalStorage from "./../localStorage/saveLocalStorage";

const FavoritesContext = createContext();
const FavoritesDispatcherContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(
    getLocalStorage("FAVORITES") || []
  );

  return (
    <FavoritesContext.Provider value={favorites}>
      <FavoritesDispatcherContext.Provider value={setFavorites}>
        {children}
      </FavoritesDispatcherContext.Provider>
    </FavoritesContext.Provider>
  );
}

export default FavoritesProvider;

export const useFavorites = () => useContext(FavoritesContext);
export const useFavoritesDispatch = () => {
  const favorites = useContext(FavoritesContext);
  const setFavorites = useContext(FavoritesDispatcherContext);

  const addFavoriteCharacter = (characters, id) => {
    const selectedFavoriteCharacter = characters.find(
      (character) => character.id === id
    );

    const favoritesData = [...favorites, selectedFavoriteCharacter];

    saveLocalStorage("FAVORITES", favoritesData);

    setFavorites(favoritesData);
  };

  const removeFavoriteCharacter = (id) => {
    const updatedFavorites = favorites.filter(
      (character) => character.id !== id
    );

    saveLocalStorage("FAVORITES", updatedFavorites);

    setFavorites(updatedFavorites);
  };

  return { addFavoriteCharacter, removeFavoriteCharacter };
};
