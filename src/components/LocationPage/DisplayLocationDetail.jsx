import { useLocation, useParams } from "react-router-dom";
import {
  useLocationDetail,
  useLocationDetailDispatch,
} from "./../../context/LocationPage/LocationDetailContext";
import { useCharactersDispatch } from "./../../context/CharactersContext";
import useFetchLocationsPagination from "./../../hooks/LocationPage/useFetchLocationsPagination";
import { useEffect } from "react";
import { LocationDetail, ResidentsList } from "./LocationList";
import getAllCharacters from "../../services/getAllCharactersService";
import { useLocations } from "../../context/LocationPage/LocationsContext";

function DisplayLocationDetail() {
  const { locationId } = useParams();
  const { pathname } = useLocation();

  // console.log("path:", pathname);

  const setLocationDetail = useLocationDetailDispatch();
  const charactersDispatch = useCharactersDispatch();
  const locations = useLocations();
  const locationDetail = useLocationDetail();

  useFetchLocationsPagination();

  useEffect(() => {
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

    const selectedLocation = locations.find(
      (location) => location.id === Number(locationId)
    );

    fetchResidentsData(selectedLocation);

    setLocationDetail(selectedLocation);
  }, [locationId, locations]);

  if (!locationDetail) return;

  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col items-start">
        <div className="mb-8 flex w-full items-center justify-center text-slate-300">
          <h2 className="border-b-2 border-red-600 pb-0.25 text-2xl font-semibold">
            {locationDetail.name} Location
          </h2>
        </div>
        <div className="flex w-full flex-col">
          <LocationDetail pathname={pathname} />
          <ResidentsList />
        </div>
      </div>
    </section>
  );
}

export default DisplayLocationDetail;
