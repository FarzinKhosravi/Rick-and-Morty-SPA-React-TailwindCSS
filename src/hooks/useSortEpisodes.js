import { useEffect, useState } from "react";
import { useEpisodes, useEpisodesDispatch } from "../context/EpisodesContext";

function useSortEpisodes() {
  const [sortType, setSortType] = useState("earliest");
  const setEpisodes = useEpisodesDispatch();
  const episodes = useEpisodes();

  useEffect(() => {
    if (episodes.length) {
      switch (sortType) {
        case "earliest":
          {
            const sortedEpisodes = [...episodes].sort((a, b) => {
              return new Date(a.created) > new Date(b.created) ? 1 : -1;
            });

            setEpisodes(sortedEpisodes);
          }
          break;

        case "latest":
          {
            const sortedEpisodes = [...episodes].sort((a, b) => {
              return new Date(a.created) > new Date(b.created) ? -1 : 1;
            });

            setEpisodes(sortedEpisodes);
          }
          break;

        default:
          break;
      }
    }
  }, [sortType]);

  const sortDateHandler = () => {
    setSortType(sortType === "earliest" ? "latest" : "earliest");
  };

  return { sortType, sortDateHandler };
}

export default useSortEpisodes;
