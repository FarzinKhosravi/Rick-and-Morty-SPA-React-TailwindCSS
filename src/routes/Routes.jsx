import { useRoutes } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage";
import CharacterPage from "../pages/CharacterPage";
import EpisodePage from "../pages/EpisodePage";
import LocationPage from "../pages/LocationPage";

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
          path: "characters",
          element: <CharacterPage />,
        },
        {
          path: "episodes",
          element: <EpisodePage />,
        },
        {
          path: "locations",
          element: <LocationPage />,
        },
      ],
    },
  ]);

  return routes;
}

export default Routes;
