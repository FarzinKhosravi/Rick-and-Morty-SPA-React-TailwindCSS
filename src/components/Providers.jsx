import PageIdProvider from "../context/PageIdContext";
import EpisodeDetailProvider from "./../context/EpisodePage/EpisodeDetailContext";
import LocationsProvider from "../context/LocationPage/LocationsContext";
import LocationDetailProvider from "../context/LocationPage/LocationDetailContext";
import NotFoundProvider from "../context/NotFoundPage/NotFoundContext";
import CharactersProvider from "./../context/CharacterPage/CharactersContext";
import CharacterDetailProvider from "./../context/CharacterPage/CharacterDetailContext";
import EpisodesProvider from "./../context/EpisodePage/EpisodesContext";
import FavoritesProvider from "./../context/CharacterPage/FavoritesContext";

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
