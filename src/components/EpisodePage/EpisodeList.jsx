import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useEpisodes } from "../../context/EpisodesContext";
import useFetchEpisodesPagination from "../../hooks/EpisodePage/useFetchEpisodesPagination";
import { useState } from "react";
import {
  useEpisodeDetail,
  useEpisodeDetailDispatch,
} from "./../../context/EpisodePage/EpisodeDetailContext";
import getAllCharacters from "./../../services/getAllCharactersService";
import { useCharactersDispatch } from "../../context/CharactersContext";
import { useLocation } from "react-router-dom";

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
              {/* <EpisodesList /> */}
            </div>
          </div>
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
      {/* Container of Accordions (Characters/Mobile) */}
      <div className="block md:hidden">{renderEpisodesInMobile()}</div>
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
          className={`h-5 w-5 text-red-600 transition-all duration-300 ${
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
      <h2 className="mb-4 text-xl font-semibold text-slate-300">
        Episode Detail :
      </h2>
      <div className="md:flex md:overflow-hidden md:rounded-xl md:bg-slate-800">
        <div className="flex flex-col md:ml-4 md:w-full md:py-4">
          <div
            className={`mb-4 flex flex-col md:ml-0 ${
              pathname === "/episodes" ? "" : "ml-3"
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