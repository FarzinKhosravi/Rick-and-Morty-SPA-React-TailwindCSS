import { createContext, useContext, useReducer } from "react";

const CharactersContext = createContext();
const CharactersDispatcherContext = createContext();

const initialCharacters = { loading: false, characters: [] };

const charactersReducer = (state, action) => {
  switch (action.type) {
    case "CHARACTERS_PENDING":
      return { loading: true, characters: [] };

    case "CHARACTERS_SUCCESS":
      return { loading: false, characters: [...action.payload] };

    case "CHARACTERS_REJECTED":
      return { loading: false, characters: [] };

    default:
      throw new Error(`Unknown action ${action.type}`);
  }
};

function CharactersProvider({ children }) {
  const [characters, charactersDispatch] = useReducer(
    charactersReducer,
    initialCharacters
  );

  return (
    <CharactersContext.Provider value={characters}>
      <CharactersDispatcherContext.Provider value={charactersDispatch}>
        {children}
      </CharactersDispatcherContext.Provider>
    </CharactersContext.Provider>
  );
}

export default CharactersProvider;

export const useCharacters = () => useContext(CharactersContext);
export const useCharactersDispatch = () =>
  useContext(CharactersDispatcherContext);
