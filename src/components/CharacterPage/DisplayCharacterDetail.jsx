import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useCharacters } from "../../context/CharactersContext";
import {
  useCharacterDetail,
  useCharacterDetailDispatch,
} from "../../context/CharacterDetailContext";
import {
  useEpisodes,
  useEpisodesDispatch,
} from "../../context/EpisodesContext";
import getAllEpisodes from "../../services/getAllEpisodesService";
import useFetchAllCharacters from "../../hooks/useFetchAllCharacters";
import { CharacterDetail, EpisodesList } from "./CharacterList";

function DisplayCharacterDetail() {
  const { characterId } = useParams();
  const { characters } = useCharacters();
  const characterDetail = useCharacterDetail();
  const episodes = useEpisodes();
  const setCharacterDetail = useCharacterDetailDispatch();
  const setEpisodes = useEpisodesDispatch();

  const { pathname } = useLocation();

  console.log(pathname);

  useFetchAllCharacters();

  useEffect(() => {
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
      (character) => character.id === Number(characterId)
    );

    fetchEpisodesData(selectedCharacter);

    setCharacterDetail(selectedCharacter);
  }, [characterId, characters]);

  if (!characterDetail) return;

  console.log(episodes);
  console.log(characterDetail);

  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col items-start">
        <div className="mb-8 w-full text-center text-slate-300">
          <h2 className="text-2xl font-semibold">
            {characterDetail.name} Character
          </h2>
        </div>
        <div className="flex w-full flex-col">
          <CharacterDetail pathname={pathname} />
          <EpisodesList />
        </div>
      </div>
    </section>
  );
}

export default DisplayCharacterDetail;
