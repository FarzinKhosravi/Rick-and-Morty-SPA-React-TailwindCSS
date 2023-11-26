import { useEffect } from "react";
import { usePageId, usePageIdDispatch } from "../../context/PageIdContext";
import toast from "react-hot-toast";
import getEpisodesPagination from "../../services/EpisodePage/getEpisodesPaginationService";
import { useEpisodesDispatch } from "./../../context/EpisodePage/EpisodesContext";
import pagesDataSwitcher from "../../utils/pagesDataSwitcher";

function useFetchEpisodesPagination() {
  const setEpisodes = useEpisodesDispatch();
  const { setPageId } = usePageIdDispatch();
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

    pagesDataSwitcher(pageId, fetchEpisodesPagination);
  }, [pageId]);
}

export default useFetchEpisodesPagination;
