import { useEffect } from "react";
import { useCharactersDispatch } from "./../context/CharactersContext";
import getAllCharacters from "./../services/getAllCharactersService";
// import toast from "react-hot-toast";

function useFetchAllCharacters() {
  const charactersDispatch = useCharactersDispatch();

  useEffect(() => {
    const fetchAllCharacters = async () => {
      try {
        charactersDispatch({ type: "CHARACTERS_PENDING" });

        const { data } = await getAllCharacters();
        charactersDispatch({
          type: "CHARACTERS_SUCCESS",
          payload: data,
        });
      } catch (error) {
        charactersDispatch({ type: "CHARACTERS_REJECTED" });

        console.log(error);

        // toast.error(error.response.data.error);
      }
    };

    fetchAllCharacters();
  }, []);
}

export default useFetchAllCharacters;
