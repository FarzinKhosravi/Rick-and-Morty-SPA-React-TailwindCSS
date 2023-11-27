import { useState } from "react";
import {
  ChevronDownIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { useEpisodes } from "./../../context/EpisodePage/EpisodesContext";
import {
  useCharacterDetail,
  useCharacterDetailDispatch,
} from "./../../context/CharacterPage/CharacterDetailContext";
import Loader from "../Loader";
import { Link, useLocation } from "react-router-dom";
import useSortEpisodes from "./../../hooks/EpisodePage/useSortEpisodes";
import useFetchCharactersPagination from "./../../hooks/CharacterPage/useFetchCharactersPagination";
import { useFavorites } from "../../context/CharacterPage/FavoritesContext";
import { useFavoritesDispatch } from "./../../context/CharacterPage/FavoritesContext";
import { useCharacters } from "../../context/CharacterPage/CharactersContext";
import ListTitle from "../../common/ListTitle";
import Nothing from "./../../common/Nothing";
import AccordionItems from "../../common/AccordionItems";
import GridItems from "../../common/GridItems";
import BackButton from "../../common/BackButton";
import useFetchEpisodesList from "./../../hooks/EpisodePage/useFetchEpisodesList";

function CharacterList() {
  const [characterId, setCharacterId] = useState(null);
  const setCharacterDetail = useCharacterDetailDispatch();
  const { loading, characters } = useCharacters();
  const { pathname } = useLocation();

  useFetchCharactersPagination();

  const fetchEpisodesData = useFetchEpisodesList();

  const showCharacterDataHandler = (id) => {
    const selectedCharacter = characters.find(
      (character) => character.id === id
    );

    fetchEpisodesData(selectedCharacter);

    setCharacterDetail(selectedCharacter);

    setCharacterId(characterId === id ? null : id);
  };

  function renderAccordionCharacters() {
    if (loading) return <Loader />;
    if (!characters.length) return <Nothing />;

    return characters.map((character) => {
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
            className={`rounded-b-xl bg-slate-200 px-3 dark:bg-slate-800 md:hidden ${
              character.id === characterId
                ? "min-h-screen py-4 opacity-100 transition-all"
                : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
            }`}
          >
            <CharacterDetail pathname={pathname} characterId={characterId} />
            <EpisodesList pathname={pathname} />
          </div>
        </div>
      );
    });
  }

  function renderGridCharacters() {
    if (loading) return <Loader />;
    if (!characters.length) return <Nothing />;

    return characters.map((character) => {
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
    });
  }

  return (
    <div className="mb-8">
      <ListTitle title="Characters" items={characters} />
      <AccordionItems renderMobileItems={renderAccordionCharacters} />
      <GridItems items={characters} renderWebItems={renderGridCharacters} />
    </div>
  );
}

export default CharacterList;

export function Character({ character, children, characterId = null }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-200 p-3 transition-all duration-200 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 ${
        characterId === character.id ? "rounded-b-none" : ""
      } ${character.favorite ? "md:p-3" : "md:p-5"}`}
    >
      <div
        className={`flex gap-x-4 md:w-full ${
          character.favorite ? "md:flex-row" : "md:flex-col"
        }`}
      >
        <div className={`${character.favorite ? "md:mb-0" : "md:mb-6"}`}>
          <img
            className={`block h-14 w-14 rounded-2xl ${
              character.favorite
                ? "md:h-14 md:w-14"
                : "md:h-72 md:w-full lg:h-60"
            }`}
            src={character.image}
            alt={character.name}
          />
        </div>
        <div
          className={`flex flex-col justify-between md:flex-row ${
            character.favorite ? "md:flex-col md:pb-0" : "md:pb-2"
          }`}
        >
          <div>
            <span className="lg:text-xl">
              {character.gender === "Male" ? "👨🏼" : "👱🏼‍♀️"}
            </span>
            <span className="ml-1 text-base font-medium text-slate-900 dark:text-slate-300 lg:text-lg">
              {character.name}
            </span>
          </div>
          <div className="flex items-center">
            <span
              className={`inline-block h-3 w-3 rounded-full lg:h-[0.9rem] lg:w-[0.9rem] ${
                character.status === "Alive"
                  ? "bg-green-600"
                  : character.status === "Dead"
                  ? "bg-red-600"
                  : "bg-yellow-400"
              }`}
            ></span>
            <span className="ml-2 text-base font-normal text-slate-900 dark:text-slate-300 lg:text-lg">
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
    const foundFavoriteCharacter = favorites.find(
      (favorite) => favorite.id === characterDetail.id
    );

    if (foundFavoriteCharacter)
      return (
        <div className="text-sm font-semibold text-slate-900 dark:text-slate-300">
          Already Added To Favorites 😎
        </div>
      );

    return (
      <button
        onClick={() => addFavoriteCharacter(characters, Number(characterId))}
        className="inline-flex cursor-pointer items-center justify-center rounded-3xl bg-white px-3 py-2 text-sm font-medium text-slate-900 transition-all duration-200 hover:bg-slate-700 dark:bg-slate-500 dark:text-slate-100 md:px-4 md:text-base md:font-semibold"
      >
        Add to Favorite
      </button>
    );
  }

  return (
    <div className="mb-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
          Character Detail :
        </h2>
        <BackButton
          pathname={pathname}
          path="characters"
          itemDetail={characterDetail}
        />
      </div>

      <div
        className={`rounded-xl bg-slate-200 dark:bg-slate-800 md:flex md:overflow-hidden md:rounded-xl md:bg-slate-200 dark:md:bg-slate-800 ${
          pathname === `/characters/${characterDetail.id}` ? "p-4 md:p-0" : ""
        }`}
      >
        <div className="hidden w-full md:block">
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
                <span className="ml-1 text-sm font-medium text-slate-900 dark:text-slate-300 md:text-lg md:font-semibold">
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
                <span className="ml-2 text-sm font-normal text-slate-900 dark:text-slate-300 md:text-base">
                  {`${characterDetail.status} - ${characterDetail.species}`}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="block text-sm text-slate-700 dark:text-slate-500 md:text-base">
                Origin:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-300 md:text-base md:font-semibold">
                {characterDetail.origin.name}
              </span>
            </div>
            <div className="mb-1">
              <span className="block text-sm text-slate-700 dark:text-slate-500 md:text-base">
                Last known location:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-300 md:text-base md:font-semibold">
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

export function EpisodesList({ pathname }) {
  const episodes = useEpisodes();
  const characterDetail = useCharacterDetail();
  const { sortType, sortDateHandler } = useSortEpisodes();

  if (!characterDetail) return;

  function renderEpisodesList() {
    if (!episodes.length)
      return (
        <div className="text-slate-900 dark:text-slate-300">
          There Are No Episodes 📍
        </div>
      );

    return episodes.map((episode, index) => {
      return <Episode index={index} key={episode.id} episode={episode} />;
    });
  }

  return (
    <div
      className={`rounded-xl bg-slate-200 dark:bg-slate-800 md:bg-slate-200 dark:md:bg-slate-800 ${
        pathname === `/characters/${characterDetail.id}` ? "p-4" : ""
      }`}
    >
      <div className="mb-6 flex items-center justify-between md:mb-9">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
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
      <div>
        <span className="mb-3 block w-full font-normal text-slate-900 dark:text-slate-300">
          {String(index + 1).padStart(2, "0")} - {episode.episode} :
          <span className="font-bold">{episode.name}</span>
        </span>
        <span className="rounded-3xl bg-slate-300 px-3 py-1 text-sm font-semibold text-slate-900 dark:bg-slate-600 dark:text-slate-300 xs:hidden">
          {episode.air_date}
        </span>
      </div>
      <div className="hidden text-center xs:block">
        <span className="block w-full rounded-3xl bg-slate-300 p-1 px-3 text-sm font-semibold text-slate-900 dark:bg-slate-600 dark:text-slate-300">
          {episode.air_date}
        </span>
      </div>
    </div>
  );
}
