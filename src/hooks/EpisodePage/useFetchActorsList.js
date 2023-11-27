import getAllCharacters from "./../../services/CharacterPage/getAllCharactersService";
import { useCharactersDispatch } from "./../../context/CharacterPage/CharactersContext";

function useFetchActorsList() {
  const charactersDispatch = useCharactersDispatch();

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

  return fetchActorsData;
}

export default useFetchActorsList;
