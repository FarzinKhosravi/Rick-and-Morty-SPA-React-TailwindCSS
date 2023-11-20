import { useEffect } from "react";
import { usePageId, usePageIdDispatch } from "../../context/PageIdContext";
import { useLocationsDispatch } from "./../../context/LocationPage/LocationsContext";
import getLocationsPagination from "./../../services/LocationPage/getLocationsPaginationService";
import toast from "react-hot-toast";

function useFetchLocationsPagination() {
  const setLocations = useLocationsDispatch();
  const setPageId = usePageIdDispatch();
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

    switch (pageId) {
      case 1:
        fetchLocationsPagination("pageOne");
        break;

      case 2:
        fetchLocationsPagination("pageTwo");
        break;

      case 3:
        fetchLocationsPagination("pageThree");
        break;

      default:
        return;
    }
  }, [pageId]);
}

export default useFetchLocationsPagination;
