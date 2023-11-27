import getAllCharacters from "./../../services/CharacterPage/getAllCharactersService";
import { useCharactersDispatch } from "./../../context/CharacterPage/CharactersContext";

function useFetchResidentsList() {
  const charactersDispatch = useCharactersDispatch();

  async function fetchResidentsData(selectedLocation) {
    const { data } = await getAllCharacters();

    const residentsIdList = selectedLocation.residents.map((resident) => {
      return resident.split("/").at(-1);
    });

    let residentsData = [];

    residentsIdList.forEach((id) => {
      const selectedResident = data.find(
        (resident) => String(resident.id) === id
      );

      residentsData.push(selectedResident);
    });

    charactersDispatch({
      type: "CHARACTERS_SUCCESS",
      payload: residentsData,
    });
  }

  return fetchResidentsData;
}

export default useFetchResidentsList;
