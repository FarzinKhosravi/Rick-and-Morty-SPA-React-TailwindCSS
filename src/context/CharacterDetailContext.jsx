import { createContext, useContext, useState } from "react";

const CharacterDetailContext = createContext();
const CharacterDetailDispatcherContext = createContext();

function CharacterDetailProvider({ children }) {
  const [characterDetail, characterDetailDispatch] = useState(null);

  return (
    <CharacterDetailContext.Provider value={characterDetail}>
      <CharacterDetailDispatcherContext.Provider
        value={characterDetailDispatch}
      >
        {children}
      </CharacterDetailDispatcherContext.Provider>
    </CharacterDetailContext.Provider>
  );
}

export default CharacterDetailProvider;

export const useCharacterDetail = () => useContext(CharacterDetailContext);
export const useCharacterDetailDispatch = () =>
  useContext(CharacterDetailDispatcherContext);
