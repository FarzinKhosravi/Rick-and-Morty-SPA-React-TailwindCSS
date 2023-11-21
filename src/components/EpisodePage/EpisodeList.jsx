import {
  ArrowSmallRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import useFetchEpisodesPagination from "../../hooks/EpisodePage/useFetchEpisodesPagination";
import { useState } from "react";
import {
  useEpisodeDetail,
  useEpisodeDetailDispatch,
} from "./../../context/EpisodePage/EpisodeDetailContext";
import { Link, useLocation } from "react-router-dom";
import getAllCharacters from "./../../services/CharacterPage/getAllCharactersService";
import { useEpisodes } from "../../context/EpisodePage/EpisodesContext";
import {
  useCharacters,
  useCharactersDispatch,
} from "./../../context/CharacterPage/CharactersContext";

function EpisodeList() {
  const [episodeId, setEpisodeId] = useState(null);
  const setEpisodeDetail = useEpisodeDetailDispatch();
  const charactersDispatch = useCharactersDispatch();
  const episodes = useEpisodes();

  const { pathname } = useLocation();

  useFetchEpisodesPagination();

  const showEpisodeDataHandler = (id) => {
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

    const selectedEpisode = episodes.find((episode) => episode.id === id);

    fetchActorsData(selectedEpisode);

    setEpisodeDetail(selectedEpisode);

    setEpisodeId(episodeId === id ? null : id);
  };

  function renderEpisodesInMobile() {
    return !episodes.length ? (
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 translate-x-16 translate-y-0 -rotate-45">
          <span className="block text-2xl font-black text-yellow-400">
            Haaa...
          </span>
        </div>
        <div className="max-w-72">
          <img
            className="block w-full"
            src="../../../public/00.png"
            alt="Not Found"
          />
        </div>
        <div className="w-20 -translate-x-16 -translate-y-8 -rotate-45">
          <span className="block text-2xl font-black text-yellow-400">
            Nooo
          </span>
        </div>
      </div>
    ) : (
      episodes.map((episode) => {
        return (
          <div className="mb-4 last:mb-0" key={episode.id}>
            <Episode
              episode={episode}
              episodeId={episodeId}
              onShowEpisodeData={showEpisodeDataHandler}
            />
            <div
              className={`rounded-b-xl bg-slate-800 px-3 md:hidden ${
                episode.id === episodeId
                  ? "min-h-screen py-4 opacity-100 transition-all"
                  : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
              }`}
            >
              <EpisodeDetail pathname={pathname} />
              <ActorsList />
            </div>
          </div>
        );
      })
    );
  }

  function renderEpisodesInWeb() {
    return !episodes.length ? (
      <div className="flex flex-col items-center justify-center">
        <div className="w-28 translate-x-8 translate-y-0 -rotate-45">
          <span className="block text-3xl font-black text-yellow-400">
            Haaa...
          </span>
        </div>
        <div className="max-w-100">
          <img
            className="block w-full"
            src="../../../public/00.png"
            alt="Not Found"
          />
        </div>
        <div className="w-24 -translate-x-16 -translate-y-12 -rotate-45">
          <span className="block text-3xl font-black text-yellow-400">
            Nooo
          </span>
        </div>
      </div>
    ) : (
      episodes.map((episode) => {
        return (
          <Link
            to={`/episodes/${episode.id}`}
            key={episode.id}
            className="mb-4"
          >
            <Episode episode={episode} />
          </Link>
        );
      })
    );
  }

  return (
    <div className="mb-8">
      {/* Title of List : */}
      <div className="flex">
        <h2 className="mb-4 text-xl font-semibold text-slate-300 md:mb-6">
          List of Episodes :
        </h2>
        <div className="-mt-3 ml-3 flex items-center justify-center sm:hidden">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-xs text-white">
            {episodes.length}
          </span>
        </div>
      </div>
      {/* Container of Accordions (Episodes/Mobile) */}
      <div className="block md:hidden">{renderEpisodesInMobile()}</div>
      {/* Container of Grid Items (Episodes/Web) */}
      <div
        className={`container mx-auto hidden grid-cols-2 gap-x-8 gap-y-6 xl:grid-cols-3 2xl:grid-cols-4 ${
          !episodes.length
            ? "md:flex md:items-center md:justify-center"
            : "md:grid"
        }`}
      >
        {renderEpisodesInWeb()}
      </div>
    </div>
  );
}

export default EpisodeList;

function Episode({ episode, onShowEpisodeData, episodeId = null }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-800 p-3 transition-all duration-200 hover:bg-slate-700 md:p-5 ${
        episodeId === episode.id ? "rounded-b-none" : ""
      }`}
    >
      <div className="flex gap-x-4 md:w-full md:flex-col">
        {/* *** Edit Section *** */}

        {/* <div className="md:mb-6">
          <img
            className="block h-14 w-14 rounded-2xl md:h-72 md:w-full lg:h-60"
            src={episode.image}
            alt={episode.name}
          />
        </div> */}

        <div className="flex flex-col justify-between md:flex-row md:pb-2">
          <div className="mb-1">
            <span className="text-base font-medium text-slate-300">
              {episode.name}
            </span>
          </div>
          <div>
            <span className="text-base font-normal text-slate-300">
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
        <h2 className="text-xl font-semibold text-slate-300">
          Episode Detail :
        </h2>
        <div
          className={`mr-1 h-7 w-7 items-center justify-center rounded-full bg-slate-200 ${
            pathname === `/episodes/${episodeDetail.id}` ? "flex" : "hidden"
          }`}
        >
          <Link to="/episodes/?type=episodes">
            <ArrowSmallRightIcon className="h-5 w-5 text-red-600" />
          </Link>
        </div>
      </div>

      <div className="md:flex md:overflow-hidden md:rounded-xl md:bg-slate-800">
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
              <span className="block text-sm text-slate-500">
                Episode Name:
              </span>
            </div>
            <div className="mb-1">
              <span className="text-sm font-medium text-slate-300 md:text-lg md:font-semibold">
                {episodeDetail.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="block text-sm text-slate-500 md:text-base">
                Episode Air-Date:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-300 md:text-base md:font-semibold">
                {episodeDetail.air_date}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ActorsList() {
  const { characters } = useCharacters();

  function renderActorsList() {
    return characters.map((actor, index) => {
      return <Actor index={index} key={actor.id} actor={actor} />;
    });
  }

  return (
    <div className="md:rounded-xl md:bg-slate-800 md:p-4">
      <div className="mb-6 flex md:mb-9">
        <div>
          <h2 className="text-xl font-semibold text-slate-300">
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
      <div className="">
        <span className="mb-3 block w-full font-normal text-slate-300">
          {String(index + 1).padStart(2, "0")}.
          <span className="ml-1 font-bold">{actor.name}</span>
        </span>
      </div>
    </div>
  );
}
