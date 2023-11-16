import CharactersProvider from "../context/CharactersContext";
import PageIdProvider from "../context/PageIdContext";
import CharacterDetailProvider from "./../context/CharacterDetailContext";
import EpisodesProvider from "./../context/EpisodesContext";

function Providers({ children }) {
  return (
    <CharactersProvider>
      <CharacterDetailProvider>
        <EpisodesProvider>
          <PageIdProvider>{children}</PageIdProvider>
        </EpisodesProvider>
      </CharacterDetailProvider>
    </CharactersProvider>
  );
}

export default Providers;
