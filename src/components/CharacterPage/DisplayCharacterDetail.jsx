import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CharacterDetail, EpisodesList } from "./CharacterList";
import getAllEpisodes from "./../../services/EpisodePage/getAllEpisodesService";
import useFetchCharactersPagination from "./../../hooks/CharacterPage/useFetchCharactersPagination";
import { useCharacters } from "../../context/CharacterPage/CharactersContext";
import { useCharacterDetail } from "../../context/CharacterPage/CharacterDetailContext";
import { useCharacterDetailDispatch } from "./../../context/CharacterPage/CharacterDetailContext";
import { useEpisodesDispatch } from "./../../context/EpisodePage/EpisodesContext";

function DisplayCharacterDetail() {
  const { characterId } = useParams();
  const { characters } = useCharacters();
  const characterDetail = useCharacterDetail();
  const setCharacterDetail = useCharacterDetailDispatch();
  const setEpisodes = useEpisodesDispatch();

  const { pathname } = useLocation();

  useFetchCharactersPagination();

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

  return (
    <section className="mb-8 min-h-screen px-4 md:mb-16">
      <div className="flex flex-col items-start">
        <div className="mb-8 flex w-full items-center justify-center text-slate-300">
          <h2 className="border-b-2 border-red-600 pb-0.25 text-2xl font-semibold">
            {characterDetail.name} Character
          </h2>
        </div>
        <div className="flex w-full flex-col">
          <CharacterDetail pathname={pathname} characterId={characterId} />
          <EpisodesList />
        </div>
      </div>
    </section>
  );
}

export default DisplayCharacterDetail;
