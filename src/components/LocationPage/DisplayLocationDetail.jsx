import { useLocation, useParams } from "react-router-dom";
import {
  useLocationDetail,
  useLocationDetailDispatch,
} from "./../../context/LocationPage/LocationDetailContext";
import useFetchLocationsPagination from "./../../hooks/LocationPage/useFetchLocationsPagination";
import { useEffect } from "react";
import { LocationDetail, ResidentsList } from "./LocationList";
import { useLocations } from "../../context/LocationPage/LocationsContext";
import useFetchResidentsList from "./../../hooks/LocationPage/useFetchResidentsList";

function DisplayLocationDetail() {
  const { locationId } = useParams();
  const { pathname } = useLocation();
  const setLocationDetail = useLocationDetailDispatch();
  const locations = useLocations();
  const locationDetail = useLocationDetail();

  useFetchLocationsPagination();

  const fetchResidentsData = useFetchResidentsList();

  useEffect(() => {
    const selectedLocation = locations.find(
      (location) => location.id === Number(locationId)
    );

    fetchResidentsData(selectedLocation);

    setLocationDetail(selectedLocation);
  }, [locationId, locations]);

  if (!locationDetail) return;

  return (
    <section className="mb-8 px-4 md:mb-16">
      <div className="mx-auto md:max-w-screen-md">
        <div className="flex flex-col items-start">
          <div className="mb-8 flex w-full items-center justify-center text-slate-900 dark:text-slate-300">
            <h2 className="border-b-2 border-red-600 pb-0.25 text-2xl font-semibold">
              {locationDetail.name} Location
            </h2>
          </div>
          <div className="flex w-full flex-col">
            <LocationDetail pathname={pathname} />
            <ResidentsList pathname={pathname} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default DisplayLocationDetail;
