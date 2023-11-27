import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useFetchEpisodesPagination from "../../hooks/EpisodePage/useFetchEpisodesPagination";
import { useState } from "react";
import {
  useEpisodeDetail,
  useEpisodeDetailDispatch,
} from "./../../context/EpisodePage/EpisodeDetailContext";
import { useCharacters } from "./../../context/CharacterPage/CharactersContext";
import { Link, useLocation } from "react-router-dom";
import { useEpisodes } from "../../context/EpisodePage/EpisodesContext";
import ListTitle from "./../../common/ListTitle";
import Nothing from "../../common/Nothing";
import AccordionItems from "../../common/AccordionItems";
import GridItems from "../../common/GridItems";
import BackButton from "../../common/BackButton";
import useFetchActorsList from "./../../hooks/EpisodePage/useFetchActorsList";

function EpisodeList() {
  const [episodeId, setEpisodeId] = useState(null);
  const setEpisodeDetail = useEpisodeDetailDispatch();
  const episodes = useEpisodes();

  const { pathname } = useLocation();

  useFetchEpisodesPagination();

  const fetchActorsData = useFetchActorsList();

  const showEpisodeDataHandler = (id) => {
    const selectedEpisode = episodes.find((episode) => episode.id === id);

    fetchActorsData(selectedEpisode);

    setEpisodeDetail(selectedEpisode);

    setEpisodeId(episodeId === id ? null : id);
  };

  function renderAccordionEpisodes() {
    if (!episodes.length) return <Nothing />;

    return episodes.map((episode) => {
      return (
        <div className="mb-4 last:mb-0" key={episode.id}>
          <Episode
            episode={episode}
            episodeId={episodeId}
            onShowEpisodeData={showEpisodeDataHandler}
          />
          <div
            className={`rounded-b-xl bg-slate-200 px-3 dark:bg-slate-800 md:hidden ${
              episode.id === episodeId
                ? "min-h-screen py-4 opacity-100 transition-all"
                : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
            }`}
          >
            <EpisodeDetail pathname={pathname} />
            <ActorsList pathname={pathname} />
          </div>
        </div>
      );
    });
  }

  function renderGridEpisodes() {
    if (!episodes.length) return <Nothing />;

    return episodes.map((episode) => {
      return (
        <Link to={`/episodes/${episode.id}`} key={episode.id} className="mb-4">
          <Episode episode={episode} />
        </Link>
      );
    });
  }

  return (
    <div className="mb-8">
      <ListTitle title="Episodes" items={episodes} />
      <AccordionItems renderMobileItems={renderAccordionEpisodes} />
      <GridItems items={episodes} renderWebItems={renderGridEpisodes} />
    </div>
  );
}

export default EpisodeList;

function Episode({ episode, onShowEpisodeData, episodeId = null }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-200 p-3 transition-all duration-200 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 md:p-5 ${
        episodeId === episode.id ? "rounded-b-none" : ""
      }`}
    >
      <div className="flex gap-x-4 md:w-full md:flex-col">
        <div className="flex flex-col justify-between md:flex-row md:pb-2">
          <div className="mb-1">
            <span className="text-base font-medium text-slate-900 dark:text-slate-300 lg:text-lg">
              {episode.name}
            </span>
          </div>
          <div>
            <span className="text-base font-normal text-slate-900 dark:text-slate-300 lg:text-lg">
              {episode.episode}
            </span>
          </div>
        </div>
      </div>
      <div className="block">
        <ChevronDownIcon
          onClick={() => onShowEpisodeData(episode.id)}
          className={`h-5 w-5 text-red-600 transition-all duration-300 md:hidden ${
            episodeId === episode.id ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
}

export function EpisodeDetail({ pathname }) {
  const episodeDetail = useEpisodeDetail();

  if (!episodeDetail) return;

  return (
    <div className="mb-8 ">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
          Episode Detail :
        </h2>
        <BackButton
          pathname={pathname}
          path="episodes"
          itemDetail={episodeDetail}
        />
      </div>

      <div
        className={`rounded-xl bg-slate-200 dark:bg-slate-800 md:flex md:overflow-hidden md:rounded-xl md:bg-slate-200 dark:md:bg-slate-800 ${
          pathname === `/episodes/${episodeDetail.id}` ? "p-4 md:p-0" : ""
        }`}
      >
        <div className="flex flex-col md:ml-4 md:w-full md:py-4">
          <div
            className={`mb-4 flex flex-col md:ml-0 ${
              pathname === "/episodes" ||
              pathname === `/episodes/${episodeDetail.id}`
                ? ""
                : "ml-3"
            }`}
          >
            <div className="mb-1">
              <span className="block text-sm text-slate-700 dark:text-slate-500">
                Episode Name:
              </span>
            </div>
            <div className="mb-1">
              <span className="text-sm font-medium text-slate-900 dark:text-slate-300 md:text-lg md:font-semibold">
                {episodeDetail.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="block text-sm text-slate-700 dark:text-slate-500 md:text-base">
                Episode Air-Date:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-300 md:text-base md:font-semibold">
                {episodeDetail.air_date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActorsList({ pathname }) {
  const { characters } = useCharacters();
  const episodeDetail = useEpisodeDetail();

  if (!episodeDetail) return;

  function renderActorsList() {
    if (!characters.length)
      return (
        <div className="text-slate-900 dark:text-slate-300">
          There Are No Actors 😊
        </div>
      );

    return characters.map((actor, index) => {
      return <Actor index={index} key={actor.id} actor={actor} />;
    });
  }

  return (
    <div
      className={`rounded-xl bg-slate-200 dark:bg-slate-800 md:bg-slate-200 dark:md:bg-slate-800 ${
        pathname === `/episodes/${episodeDetail.id}` ? "p-4" : ""
      }`}
    >
      <div className="mb-6 flex md:mb-9">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
            List of Actors :
          </h2>
        </div>
      </div>
      <div>{renderActorsList()}</div>
    </div>
  );
}

export function Actor({ actor, index }) {
  return (
    <div className="mb-8 flex">
      <div>
        <span className="mb-3 block w-full font-normal text-slate-900 dark:text-slate-300">
          {String(index + 1).padStart(2, "0")}.
          <span className="ml-1 font-bold">{actor.name}</span>
        </span>
      </div>
    </div>
  );
}
