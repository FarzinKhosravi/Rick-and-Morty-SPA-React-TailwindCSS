import { useEffect } from "react";
import toast from "react-hot-toast";
import { usePageId, usePageIdDispatch } from "../../context/PageIdContext";
import getCharactersPagination from "../../services/CharacterPage/getCharactersPaginationService";
import { useCharactersDispatch } from "./../../context/CharacterPage/CharactersContext";
import pagesDataSwitcher from "./../../utils/pagesDataSwitcher";

function useFetchCharactersPagination() {
  const charactersDispatch = useCharactersDispatch();
  const { setPageId } = usePageIdDispatch();
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

    pagesDataSwitcher(pageId, fetchCharactersPagination);
  }, [pageId]);
}

export default useFetchCharactersPagination;
