import axios from "axios";
import { useEffect, useState } from "react";
import useFetchAllCharacters from "./../hooks/useFetchAllCharacters";
import {
  ChevronDownIcon,
  ArrowUpCircleIcon,
} from "@heroicons/react/24/outline";
import { useCharacters } from "../context/CharactersContext";

function CharacterList() {
  const [characterDetail, setCharacterDetail] = useState(null);

  const [characterId, setCharacterId] = useState(null);

  const [episodes, setEpisodes] = useState([]);

  const [sortType, setSortType] = useState("earliest");

  useFetchAllCharacters();

  const { characters } = useCharacters();

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

  const showCharacterDataHandler = (id) => {
    async function fetchEpisodesData(selectedCharacter) {
      const { data } = await axios.get("http://localhost:3000/episodes");

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

  return (
    <div>
      {/* Title of List : */}
      <div className="flex">
        <h2 className="mb-4 text-xl font-semibold text-slate-300">
          List of Characters :
        </h2>
        <div className="-mt-3 ml-3 flex items-center justify-center sm:hidden">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-xs text-white">
            6
          </span>
        </div>
      </div>
      {/* Container of Accordions */}
      <div>
        {characters.map((character) => {
          return (
            <div className="mb-4 last:mb-0" key={character.id}>
              <Character
                character={character}
                onShowCharacterData={showCharacterDataHandler}
                characterId={characterId}
              />
              <div
                className={`rounded-b-xl bg-slate-800 px-3 md:hidden ${
                  character.id === characterId
                    ? "min-h-screen py-4 opacity-100 transition-all"
                    : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
                }`}
              >
                <CharacterDetail characterDetail={characterDetail} />
                <EpisodesList
                  episodes={episodes}
                  onSortDate={sortDateHandler}
                  sortType={sortType}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CharacterList;

function Character({ character, onShowCharacterData, characterId }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-800 p-3 transition-all duration-200 hover:bg-slate-700 md:rounded-xl ${
        characterId === character.id ? "rounded-b-none" : ""
      }`}
    >
      <div className="flex gap-x-4">
        <div>
          <img
            className="block h-14 w-14 rounded-2xl"
            src={character.image}
            alt={character.name}
          />
        </div>
        <div className="flex flex-col justify-between">
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
      <div>
        <ChevronDownIcon
          onClick={() => onShowCharacterData(character.id)}
          className={`h-5 w-5 text-red-600 transition-all duration-300 ${
            characterId === character.id ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
}

function CharacterDetail({ characterDetail }) {
  if (!characterDetail)
    return (
      <div>
        <span className="text-lg font-black italic">
          Please Select a Character
        </span>
        &nbsp;
        <span className="text-xl">😊</span>
      </div>
    );

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
          <div className="mb-4 flex flex-col">
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
            <div>
              <button className="inline-flex cursor-pointer items-center justify-center rounded-3xl bg-slate-500 px-3 py-2 text-sm font-medium text-slate-100 transition-all duration-200 hover:bg-slate-700 md:px-4 md:text-base md:font-semibold">
                Add to Favorite
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EpisodesList({ episodes, onSortDate, sortType }) {
  function renderEpisodesList() {
    return episodes.map((episode, index) => {
      return <Episode index={index} key={episode.id} episode={episode} />;
    });
  }

  return (
    <div className="md:rounded-xl md:bg-slate-800 md:p-4">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-300">
            List of Episodes :
          </h2>
        </div>
        <div>
          <ArrowUpCircleIcon
            onClick={onSortDate}
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

function Episode({ episode, index }) {
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
