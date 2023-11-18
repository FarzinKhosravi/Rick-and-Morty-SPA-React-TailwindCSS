import { useEffect } from "react";
import { useCharactersDispatch } from "../context/CharactersContext";
import toast from "react-hot-toast";
import { usePageId, usePageIdDispatch } from "../context/PageIdContext";
import getCharactersPagination from "../services/getCharactersPaginationService";

function useFetchCharactersPagination() {
  const charactersDispatch = useCharactersDispatch();
  const setPageId = usePageIdDispatch();
  const pageId = usePageId();

  useEffect(() => {
    const fetchCharactersPagination = async (page) => {
      try {
        charactersDispatch({ type: "CHARACTERS_PENDING" });

        const { data } = await getCharactersPagination();

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
        fetchCharactersPagination("pageOne");
        break;

      case 2:
        fetchCharactersPagination("pageTwo");
        break;

      case 3:
        fetchCharactersPagination("pageThree");
        break;

      default:
        return;
    }
  }, [pageId]);
}

export default useFetchCharactersPagination;
