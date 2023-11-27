import { useLocation, useParams } from "react-router-dom";
import useFetchEpisodesPagination from "../../hooks/EpisodePage/useFetchEpisodesPagination";
import {
  useEpisodeDetail,
  useEpisodeDetailDispatch,
} from "../../context/EpisodePage/EpisodeDetailContext";
import { useEffect } from "react";
import { ActorsList, EpisodeDetail } from "./EpisodeList";
import { useEpisodes } from "../../context/EpisodePage/EpisodesContext";
import useFetchActorsList from "./../../hooks/EpisodePage/useFetchActorsList";

function DisplayEpisodeDetail() {
  const { episodeId } = useParams();
  const { pathname } = useLocation();
  const setEpisodeDetail = useEpisodeDetailDispatch();
  const episodes = useEpisodes();
  const episodeDetail = useEpisodeDetail();

  useFetchEpisodesPagination();

  const fetchActorsData = useFetchActorsList();

  useEffect(() => {
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
        <div className="mb-8 flex w-full items-center justify-center text-slate-900 dark:text-slate-300">
          <h2 className="border-b-2 border-red-600 pb-0.25 text-2xl font-semibold">
            {episodeDetail.name} Episode
          </h2>
        </div>
        <div className="flex w-full flex-col">
          <EpisodeDetail pathname={pathname} />
          <ActorsList pathname={pathname} />
        </div>
      </div>
    </section>
  );
}

export default DisplayEpisodeDetail;
