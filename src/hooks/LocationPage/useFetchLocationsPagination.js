import { useEffect } from "react";
import { usePageId, usePageIdDispatch } from "../../context/PageIdContext";
import { useLocationsDispatch } from "./../../context/LocationPage/LocationsContext";
import getLocationsPagination from "./../../services/LocationPage/getLocationsPaginationService";
import toast from "react-hot-toast";
import pagesDataSwitcher from "./../../utils/pagesDataSwitcher";

function useFetchLocationsPagination() {
  const setLocations = useLocationsDispatch();
  const { setPageId } = usePageIdDispatch();
  const pageId = usePageId();

  useEffect(() => {
    const fetchLocationsPagination = async (page) => {
      try {
        const { data } = await getLocationsPagination();

        const { id, locations } = data[page];

        setPageId(id);

        setLocations(locations);
      } catch (error) {
        console.log(error);

        toast.error(error.response.statusText);
      }
    };

    pagesDataSwitcher(pageId, fetchLocationsPagination);
  }, [pageId]);
}

export default useFetchLocationsPagination;
