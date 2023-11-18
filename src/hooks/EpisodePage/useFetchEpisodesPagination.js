import { useEffect } from "react";
import { useEpisodesDispatch } from "../../context/EpisodesContext";
import { usePageId, usePageIdDispatch } from "../../context/PageIdContext";
import toast from "react-hot-toast";
import getEpisodesPagination from "../../services/EpisodePage/getEpisodesPaginationService";

function useFetchEpisodesPagination() {
  const setEpisodes = useEpisodesDispatch();
  const setPageId = usePageIdDispatch();
  const pageId = usePageId();

  useEffect(() => {
    const fetchEpisodesPagination = async (page) => {
      try {
        const { data } = await getEpisodesPagination();

        const { id, episodes } = data[page];

        setPageId(id);

        setEpisodes(episodes);
      } catch (error) {
        console.log(error);

        toast.error(error.response.statusText);
      }
    };

    switch (pageId) {
      case 1:
        fetchEpisodesPagination("pageOne");
        break;

      case 2:
        fetchEpisodesPagination("pageTwo");
        break;

      case 3:
        fetchEpisodesPagination("pageThree");
        break;

      default:
        return;
    }
  }, [pageId]);
}

export default useFetchEpisodesPagination;
