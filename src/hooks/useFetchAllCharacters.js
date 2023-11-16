import { useEffect } from "react";
import { useCharactersDispatch } from "./../context/CharactersContext";
import getAllCharacters from "./../services/getAllCharactersService";
import toast from "react-hot-toast";
import { usePageId, usePageIdDispatch } from "./../context/PageIdContext";

function useFetchAllCharacters() {
  const charactersDispatch = useCharactersDispatch();
  const setPageId = usePageIdDispatch();
  const pageId = usePageId();

  useEffect(() => {
    const fetchAllCharacters = async (page) => {
      try {
        charactersDispatch({ type: "CHARACTERS_PENDING" });

        const { data } = await getAllCharacters();

        const { id, characters } = data[page];

        setPageId(id);

        charactersDispatch({
          type: "CHARACTERS_SUCCESS",
          payload: characters,
        });
      } catch (error) {
        charactersDispatch({ type: "CHARACTERS_REJECTED" });

        console.log(error);

        toast.error(error.response.statusText);
      }
    };

    switch (pageId) {
      case 1:
        fetchAllCharacters("pageOne");
        break;

      case 2:
        fetchAllCharacters("pageTwo");
        break;

      case 3:
        fetchAllCharacters("pageThree");
        break;

      default:
        return;
    }
  }, [pageId]);
}

export default useFetchAllCharacters;
