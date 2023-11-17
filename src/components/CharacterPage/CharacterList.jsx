import { useState } from "react";
import useFetchAllCharacters from "../../hooks/useFetchAllCharacters";
import {
  ChevronDownIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { useCharacters } from "../../context/CharactersContext";
import Loader from "../Loader";
import getAllEpisodes from "../../services/getAllEpisodesService";
import { Link, useLocation } from "react-router-dom";
import {
  useEpisodes,
  useEpisodesDispatch,
} from "../../context/EpisodesContext";
import {
  useCharacterDetail,
  useCharacterDetailDispatch,
} from "../../context/CharacterDetailContext";
import useSortEpisodes from "../../hooks/useSortEpisodes";
import {
  useFavorites,
  useFavoritesDispatch,
} from "../../context/FavoritesContext";

function CharacterList() {
  const [characterId, setCharacterId] = useState(null);
  const setCharacterDetail = useCharacterDetailDispatch();
  const setEpisodes = useEpisodesDispatch();
  const { loading, characters } = useCharacters();
  const { pathname } = useLocation();

  useFetchAllCharacters();

  const showCharacterDataHandler = (id) => {
    async function fetchEpisodesData(selectedCharacter) {
      const { data } = await getAllEpisodes();

      const episodesIdList = selectedCharacter.episode.map((episode) => {
        return episode.split("/").at(-1);
      });

      let episodesData = [];

      episodesIdList.forEach((id) => {
        const selectedEpisode = data.find(
          (episode) => String(episode.id) === id
        );

        episodesData.push(selectedEpisode);
      });

      setEpisodes(episodesData);
    }

    const selectedCharacter = characters.find(
      (character) => character.id === id
    );

    fetchEpisodesData(selectedCharacter);

    setCharacterDetail(selectedCharacter);

    setCharacterId(characterId === id ? null : id);
  };

  function renderCharactersInMobile() {
    return loading ? (
      <Loader />
    ) : !characters.length ? (
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
      characters.map((character) => {
        return (
          <div className="mb-4 last:mb-0" key={character.id}>
            <Character character={character} characterId={characterId}>
              <ChevronDownIcon
                onClick={() => showCharacterDataHandler(character.id)}
                className={`h-5 w-5 text-red-600 transition-all duration-300 ${
                  characterId === character.id ? "rotate-180" : ""
                }`}
              />
            </Character>
            <div
              className={`rounded-b-xl bg-slate-800 px-3 md:hidden ${
                character.id === characterId
                  ? "min-h-screen py-4 opacity-100 transition-all"
                  : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
              }`}
            >
              <CharacterDetail pathname={pathname} characterId={characterId} />
              <EpisodesList />
            </div>
          </div>
        );
      })
    );
  }

  function renderCharactersInWeb() {
    return loading ? (
      <Loader />
    ) : !characters.length ? (
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
      characters.map((character) => {
        return (
          <Link
            to={`/characters/${character.id}`}
            key={character.id}
            className="mb-4"
          >
            <Character character={character}>
              <ChevronDownIcon
                onClick={() => showCharacterDataHandler(character.id)}
                className={`h-5 w-5 text-red-600 transition-all duration-300 md:hidden ${
                  characterId === character.id ? "rotate-180" : ""
                }`}
              />
            </Character>
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
          List of Characters :
        </h2>
        <div className="-mt-3 ml-3 flex items-center justify-center sm:hidden">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-xs text-white">
            {characters.length}
          </span>
        </div>
      </div>
      {/* Container of Accordions (Characters/Mobile) */}
      <div className="block md:hidden">{renderCharactersInMobile()}</div>
      {/* Container of Grid Items (Characters/Web) */}
      <div
        className={`container mx-auto hidden grid-cols-2 gap-x-8 gap-y-6 xl:grid-cols-3 2xl:grid-cols-4 ${
          !characters.length
            ? "md:flex md:items-center md:justify-center"
            : "md:grid"
        }`}
      >
        {renderCharactersInWeb()}
      </div>
    </div>
  );
}

export default CharacterList;

export function Character({ character, children, characterId = null }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-800 p-3 transition-all duration-200 hover:bg-slate-700 md:p-5 ${
        characterId === character.id ? "rounded-b-none" : ""
      } ${character.favorite ? "md:p-3" : ""}`}
    >
      <div
        className={`flex gap-x-4 md:w-full ${
          character.favorite ? "md:flex-row" : "md:flex-col"
        }`}
      >
        <div className={`${character.favorite ? "md:mb-0" : "md:mb-6"}`}>
          <img
            className={`block h-14 w-14 rounded-2xl md:h-72 md:w-full ${
              character.favorite ? "md:h-14 md:w-14" : "lg:h-60"
            }`}
            src={character.image}
            alt={character.name}
          />
        </div>
        <div
          className={`flex flex-col justify-between md:flex-row md:pb-2 ${
            character.favorite ? "md:flex-col md:pb-0" : ""
          }`}
        >
          <div>
            <span>{character.gender === "Male" ? "👨🏼" : "👱🏼‍♀️"}</span>
            <span className="ml-1 text-base font-medium text-slate-300">
              {character.name}
            </span>
          </div>
          <div>
            <span
              className={`inline-block h-3 w-3 rounded-full ${
                character.status === "Alive"
                  ? "bg-green-600"
                  : character.status === "Dead"
                  ? "bg-red-600"
                  : "bg-yellow-400"
              }`}
            ></span>
            <span className="ml-2 text-base font-normal text-slate-300">
              {`${character.status} - ${character.species}`}
            </span>
          </div>
        </div>
      </div>
      <div className="block">{children}</div>
    </div>
  );
}

export function CharacterDetail({ pathname, characterId }) {
  const characterDetail = useCharacterDetail();
  const { characters } = useCharacters();
  const favorites = useFavorites();
  const { addFavoriteCharacter } = useFavoritesDispatch();

  if (!characterDetail) return;

  function favoriteLogic() {
    return favorites.find((favorite) => favorite.id === characterDetail.id) ? (
      <div className="text-sm font-semibold text-slate-300">
        Already Added To Favorites 😎
      </div>
    ) : (
      <button
        onClick={() => addFavoriteCharacter(characters, Number(characterId))}
        className="inline-flex cursor-pointer items-center justify-center rounded-3xl bg-slate-500 px-3 py-2 text-sm font-medium text-slate-100 transition-all duration-200 hover:bg-slate-700 md:px-4 md:text-base md:font-semibold"
      >
        Add to Favorite
      </button>
    );
  }

  return (
    <div className="mb-8 ">
      <h2 className="mb-4 text-xl font-semibold text-slate-300">
        Character Detail :
      </h2>
      <div className="md:flex md:overflow-hidden md:rounded-xl md:bg-slate-800">
        <div className="md:max-w-52 hidden w-full md:block">
          <img
            className="block h-14 w-14 rounded-2xl md:h-full md:w-full md:rounded-none"
            src={characterDetail.image}
            alt={characterDetail.name}
          />
        </div>
        <div className="flex flex-col md:ml-4 md:w-full md:py-4">
          <div
            className={`flex md:mb-0 ${
              pathname === "/characters" ? "" : "mb-3"
            }`}
          >
            <div
              className={`md:hidden ${
                pathname === "/characters" ? "hidden" : "block"
              }`}
            >
              <img
                className="block h-14 w-14 rounded-2xl"
                src={characterDetail.image}
                alt={characterDetail.name}
              />
            </div>
            <div
              className={`mb-4 flex flex-col md:ml-0 ${
                pathname === "/characters" ? "" : "ml-3"
              }`}
            >
              <div className="mb-1">
                <span className="md:text-lg">
                  {characterDetail.gender === "Male" ? "👨🏼" : "👱🏼‍♀️"}
                </span>
                <span className="ml-1 text-sm font-medium text-slate-300 md:text-lg md:font-semibold">
                  {characterDetail.name}
                </span>
              </div>
              <div>
                <span
                  className={`inline-block h-3 w-3 rounded-full ${
                    characterDetail.status === "Alive"
                      ? "bg-green-600"
                      : characterDetail.status === "Dead"
                      ? "bg-red-600"
                      : "bg-yellow-400"
                  }`}
                ></span>
                <span className="ml-2 text-sm font-normal text-slate-300 md:text-base">
                  {`${characterDetail.status} - ${characterDetail.species}`}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="block text-sm text-slate-500 md:text-base">
                Origin:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-300 md:text-base md:font-semibold">
                {characterDetail.origin.name}
              </span>
            </div>
            <div className="mb-1">
              <span className="block text-sm text-slate-500 md:text-base">
                Last known location:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-300 md:text-base md:font-semibold">
                {characterDetail.location.name}
              </span>
            </div>
            <div>{favoriteLogic()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EpisodesList() {
  const episodes = useEpisodes();

  const { sortType, sortDateHandler } = useSortEpisodes();

  function renderEpisodesList() {
    return episodes.map((episode, index) => {
      return <Episode index={index} key={episode.id} episode={episode} />;
    });
  }

  return (
    <div className="md:rounded-xl md:bg-slate-800 md:p-4">
      <div className="mb-6 flex items-center justify-between md:mb-9">
        <div>
          <h2 className="text-xl font-semibold text-slate-300">
            List of Episodes :
          </h2>
        </div>
        <div>
          <ArrowUpCircleIcon
            onClick={sortDateHandler}
            className={`h-6 w-6 cursor-pointer text-red-600 transition-all duration-200 ${
              sortType === "latest" ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <div>{renderEpisodesList()}</div>
    </div>
  );
}

export function Episode({ episode, index }) {
  return (
    <div className="mb-8 flex justify-between">
      <div className="">
        <span className="mb-3 block w-full font-normal text-slate-300">
          {String(index + 1).padStart(2, "0")} - {episode.episode} :
          <span className="font-bold">{episode.name}</span>
        </span>
        <span className="rounded-3xl bg-slate-600 px-3 py-1 text-sm font-semibold text-slate-300 xs:hidden">
          {episode.air_date}
        </span>
      </div>
      <div className="hidden text-center xs:block">
        <span className="block w-full rounded-3xl bg-slate-600 p-1 px-3 text-sm font-semibold text-slate-300">
          {episode.air_date}
        </span>
      </div>
    </div>
  );
}
