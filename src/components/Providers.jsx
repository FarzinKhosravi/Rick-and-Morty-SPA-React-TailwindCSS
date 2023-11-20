import CharactersProvider from "../context/CharactersContext";
import PageIdProvider from "../context/PageIdContext";
import CharacterDetailProvider from "./../context/CharacterDetailContext";
import EpisodesProvider from "./../context/EpisodesContext";
import FavoritesProvider from "./../context/FavoritesContext";
import EpisodeDetailProvider from "./../context/EpisodePage/EpisodeDetailContext";
import LocationsProvider from "../context/LocationPage/LocationsContext";
import LocationDetailProvider from "../context/LocationPage/LocationDetailContext";
import NotFoundProvider from "../context/NotFoundPage/NotFoundContext";

function Providers({ children }) {
  return (
    <CharactersProvider>
      <CharacterDetailProvider>
        <EpisodesProvider>
          <PageIdProvider>
            <FavoritesProvider>
              <EpisodeDetailProvider>
                <LocationsProvider>
                  <LocationDetailProvider>
                    <NotFoundProvider>{children}</NotFoundProvider>
                  </LocationDetailProvider>
                </LocationsProvider>
              </EpisodeDetailProvider>
            </FavoritesProvider>
          </PageIdProvider>
        </EpisodesProvider>
      </CharacterDetailProvider>
    </CharactersProvider>
  );
}

export default Providers;
