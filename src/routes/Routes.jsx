import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage";
import CharacterPage from "../pages/CharacterPage";
import EpisodePage from "../pages/EpisodePage";
import LocationPage from "../pages/LocationPage";
import DisplayCharacterDetail from "./../components/CharacterPage/DisplayCharacterDetail";
import DisplayEpisodeDetail from "../components/EpisodePage/DisplayEpisodeDetail";
import DisplayLocationDetail from "../components/LocationPage/DisplayLocationDetail";
import NotFoundPage from "../pages/NotFoundPage";

function Routes() {
  let routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "characters/:characterId",
          element: <DisplayCharacterDetail />,
        },
        {
          path: "characters",
          element: <CharacterPage />,
        },
        {
          path: "episodes/:episodeId",
          element: <DisplayEpisodeDetail />,
        },
        {
          path: "episodes",
          element: <EpisodePage />,
        },
        {
          path: "locations/:locationId",
          element: <DisplayLocationDetail />,
        },
        {
          path: "locations",
          element: <LocationPage />,
        },
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);

  return routes;
}

export default Routes;
