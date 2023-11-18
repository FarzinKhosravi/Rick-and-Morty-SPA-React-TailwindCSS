import CharactersProvider from "../context/CharactersContext";
import PageIdProvider from "../context/PageIdContext";
import CharacterDetailProvider from "./../context/CharacterDetailContext";
import EpisodesProvider from "./../context/EpisodesContext";
import FavoritesProvider from "./../context/FavoritesContext";
import EpisodeDetailProvider from "./../context/EpisodePage/EpisodeDetailContext";

function Providers({ children }) {
  return (
    <CharactersProvider>
      <CharacterDetailProvider>
        <EpisodesProvider>
          <PageIdProvider>
            <FavoritesProvider>
              <EpisodeDetailProvider>{children}</EpisodeDetailProvider>
            </FavoritesProvider>
          </PageIdProvider>
        </EpisodesProvider>
      </CharacterDetailProvider>
    </CharactersProvider>
  );
}

export default Providers;
