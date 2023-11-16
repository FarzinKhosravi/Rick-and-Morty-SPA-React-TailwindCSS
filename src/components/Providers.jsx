import CharactersProvider from "../context/CharactersContext";
import PageIdProvider from "../context/PageIdContext";
import CharacterDetailProvider from "./../context/CharacterDetailContext";
import EpisodesProvider from "./../context/EpisodesContext";
import FavoritesProvider from "./../context/FavoritesContext";

function Providers({ children }) {
  return (
    <CharactersProvider>
      <CharacterDetailProvider>
        <EpisodesProvider>
          <PageIdProvider>
            <FavoritesProvider>{children}</FavoritesProvider>
          </PageIdProvider>
        </EpisodesProvider>
      </CharacterDetailProvider>
    </CharactersProvider>
  );
}

export default Providers;
