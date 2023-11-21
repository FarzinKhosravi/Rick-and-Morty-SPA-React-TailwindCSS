import { useLocation, useParams } from "react-router-dom";
import useFetchEpisodesPagination from "../../hooks/EpisodePage/useFetchEpisodesPagination";
import {
  useEpisodeDetail,
  useEpisodeDetailDispatch,
} from "../../context/EpisodePage/EpisodeDetailContext";
import { useEffect } from "react";
import { ActorsList, EpisodeDetail } from "./EpisodeList";
import getAllCharacters from "./../../services/CharacterPage/getAllCharactersService";
import { useEpisodes } from "../../context/EpisodePage/EpisodesContext";
import { useCharactersDispatch } from "./../../context/CharacterPage/CharactersContext";

function DisplayEpisodeDetail() {
  const { episodeId } = useParams();
  const { pathname } = useLocation();
  const setEpisodeDetail = useEpisodeDetailDispatch();
  const charactersDispatch = useCharactersDispatch();

  const episodes = useEpisodes();

  const episodeDetail = useEpisodeDetail();

  useFetchEpisodesPagination();

  useEffect(() => {
    async function fetchActorsData(selectedEpisode) {
      const { data } = await getAllCharacters();

      const actorsIdList = selectedEpisode.characters.map((actor) => {
        return actor.split("/").at(-1);
      });

      let actorsData = [];

      actorsIdList.forEach((id) => {
        const selectedActor = data.find((actor) => String(actor.id) === id);

        actorsData.push(selectedActor);
      });

      charactersDispatch({ type: "CHARACTERS_SUCCESS", payload: actorsData });
    }

    const selectedEpisode = episodes.find(
      (episode) => episode.id === Number(episodeId)
    );

    fetchActorsData(selectedEpisode);

    setEpisodeDetail(selectedEpisode);
  }, [episodeId, episodes]);

  if (!episodeDetail) return;

  return (
    <section className="mb-8 min-h-screen px-4 md:mb-16">
      <div className="flex flex-col items-start">
        <div className="mb-8 flex w-full items-center justify-center text-slate-300">
          <h2 className="border-b-2 border-red-600 pb-0.25 text-2xl font-semibold">
            {episodeDetail.name} Episode
          </h2>
        </div>
        <div className="flex w-full flex-col">
          <EpisodeDetail pathname={pathname} />
          <ActorsList />
        </div>
      </div>
    </section>
  );
}

export default DisplayEpisodeDetail;
