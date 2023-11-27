import { useEpisodesDispatch } from "../../context/EpisodePage/EpisodesContext";
import getAllEpisodes from "./../../services/EpisodePage/getAllEpisodesService";

export default function useFetchEpisodesList() {
  const setEpisodes = useEpisodesDispatch();

  async function fetchEpisodesData(selectedCharacter) {
    const { data } = await getAllEpisodes();

    const episodesIdList = selectedCharacter.episode.map((episode) => {
      return episode.split("/").at(-1);
    });

    let episodesData = [];

    episodesIdList.forEach((id) => {
      const selectedEpisode = data.find((episode) => String(episode.id) === id);

      episodesData.push(selectedEpisode);
    });

    setEpisodes(episodesData);
  }

  return fetchEpisodesData;
}
