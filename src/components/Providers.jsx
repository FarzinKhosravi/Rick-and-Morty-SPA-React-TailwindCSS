import CharactersProvider from "../context/CharactersContext";

function Providers({ children }) {
  return <CharactersProvider>{children}</CharactersProvider>;
}

export default Providers;
