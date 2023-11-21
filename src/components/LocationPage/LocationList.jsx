import { Link, useLocation } from "react-router-dom";
import { useLocations } from "../../context/LocationPage/LocationsContext";
import {
  useLocationDetail,
  useLocationDetailDispatch,
} from "./../../context/LocationPage/LocationDetailContext";
import { useState } from "react";
import useFetchLocationsPagination from "./../../hooks/LocationPage/useFetchLocationsPagination";
import {
  ArrowSmallRightIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import getAllCharacters from "./../../services/CharacterPage/getAllCharactersService";
import {
  useCharacters,
  useCharactersDispatch,
} from "./../../context/CharacterPage/CharactersContext";

function LocationList() {
  const [locationId, setLocationId] = useState(null);
  const setLocationDetail = useLocationDetailDispatch();
  const charactersDispatch = useCharactersDispatch();
  const locations = useLocations();

  const { pathname } = useLocation();

  useFetchLocationsPagination();

  const showLocationDataHandler = (id) => {
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

    const selectedLocation = locations.find((location) => location.id === id);

    fetchResidentsData(selectedLocation);

    setLocationDetail(selectedLocation);

    setLocationId(locationId === id ? null : id);
  };

  function renderLocationsInMobile() {
    return !locations.length ? (
      <div className="flex flex-col items-center justify-center">
        <div className="w-24 translate-x-16 translate-y-0 -rotate-45">
          <span className="block text-2xl font-black text-yellow-400">
            Haaa...
          </span>
        </div>
        <div className="max-w-72">
          <img
            className="block w-full"
            src="../../../public/00.png"
            alt="Not Found"
          />
        </div>
        <div className="w-20 -translate-x-16 -translate-y-8 -rotate-45">
          <span className="block text-2xl font-black text-yellow-400">
            Nooo
          </span>
        </div>
      </div>
    ) : (
      locations.map((location) => {
        return (
          <div className="mb-4 last:mb-0" key={location.id}>
            <Location
              location={location}
              locationId={locationId}
              onShowLocationData={showLocationDataHandler}
            />
            <div
              className={`rounded-b-xl bg-slate-800 px-3 md:hidden ${
                location.id === locationId
                  ? "min-h-screen py-4 opacity-100 transition-all"
                  : "max-h-0 overflow-hidden opacity-0 transition-all duration-300"
              }`}
            >
              <LocationDetail pathname={pathname} />
              <ResidentsList />
            </div>
          </div>
        );
      })
    );
  }

  function renderLocationsInWeb() {
    return !locations.length ? (
      <div className="flex flex-col items-center justify-center">
        <div className="w-28 translate-x-8 translate-y-0 -rotate-45">
          <span className="block text-3xl font-black text-yellow-400">
            Haaa...
          </span>
        </div>
        <div className="max-w-100">
          <img
            className="block w-full"
            src="../../../public/00.png"
            alt="Not Found"
          />
        </div>
        <div className="w-24 -translate-x-16 -translate-y-12 -rotate-45">
          <span className="block text-3xl font-black text-yellow-400">
            Nooo
          </span>
        </div>
      </div>
    ) : (
      locations.map((location) => {
        return (
          <Link
            to={`/locations/${location.id}`}
            key={location.id}
            className="mb-4"
          >
            <Location location={location} />
          </Link>
        );
      })
    );
  }

  return (
    <div className="mb-8">
      {/* Title of List : */}
      <div className="flex">
        <h2 className="mb-4 text-xl font-semibold text-slate-300 md:mb-6">
          List of Locations :
        </h2>
        <div className="-mt-3 ml-3 flex items-center justify-center sm:hidden">
          <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-xs text-white">
            {locations.length}
          </span>
        </div>
      </div>
      {/* Container of Accordions (Episodes/Mobile) */}
      <div className="block md:hidden">{renderLocationsInMobile()}</div>
      {/* Container of Grid Items (Episodes/Web) */}
      <div
        className={`container mx-auto hidden grid-cols-2 gap-x-8 gap-y-6 xl:grid-cols-3 2xl:grid-cols-4 ${
          !locations.length
            ? "md:flex md:items-center md:justify-center"
            : "md:grid"
        }`}
      >
        {renderLocationsInWeb()}
      </div>
    </div>
  );
}

export default LocationList;

function Location({ location, onShowLocationData, locationId = null }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-800 p-3 transition-all duration-200 hover:bg-slate-700 md:p-5 ${
        locationId === location.id ? "rounded-b-none" : ""
      }`}
    >
      <div className="flex gap-x-4 md:w-full md:flex-col">
        {/* *** Edit Section *** */}

        {/* <div className="md:mb-6">
            <img
              className="block h-14 w-14 rounded-2xl md:h-72 md:w-full lg:h-60"
              src={episode.image}
              alt={episode.name}
            />
          </div> */}

        <div className="flex flex-col justify-between md:flex-row md:pb-2">
          <div className="mb-1">
            <span className="text-base font-medium text-slate-300">
              {location.name}
            </span>
          </div>
          <div>
            <span className="text-base font-normal text-slate-300">
              {location.type}
            </span>
          </div>
        </div>
      </div>
      <div className="block">
        <ChevronDownIcon
          onClick={() => onShowLocationData(location.id)}
          className={`h-5 w-5 text-red-600 transition-all duration-300 md:hidden ${
            locationId === location.id ? "rotate-180" : ""
          }`}
        />
      </div>
    </div>
  );
}

export function LocationDetail({ pathname }) {
  const locationDetail = useLocationDetail();

  if (!locationDetail) return;

  return (
    <div className="mb-8 ">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-300">
          Location Detail :
        </h2>
        <div
          className={`mr-1 h-7 w-7 items-center justify-center rounded-full bg-slate-200 ${
            pathname === `/locations/${locationDetail.id}` ? "flex" : "hidden"
          }`}
        >
          <Link to="/locations/?type=locations">
            <ArrowSmallRightIcon className="h-5 w-5 text-red-600" />
          </Link>
        </div>
      </div>

      <div className="md:flex md:overflow-hidden md:rounded-xl md:bg-slate-800">
        <div className="flex flex-col md:ml-4 md:w-full md:py-4">
          <div
            className={`mb-4 flex flex-col md:ml-0 ${
              pathname === "/locations" ||
              pathname === `/locations/${locationDetail.id}`
                ? ""
                : "ml-3"
            }`}
          >
            <div className="mb-1">
              <span className="block text-sm text-slate-500">
                Location Name:
              </span>
            </div>
            <div className="mb-1">
              <span className="text-sm font-medium text-slate-300 md:text-lg md:font-semibold">
                {locationDetail.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="block text-sm text-slate-500 md:text-base">
                Location Type:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-300 md:text-base md:font-semibold">
                {locationDetail.type}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="block text-sm text-slate-500 md:text-base">
                Location Dimension:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-300 md:text-base md:font-semibold">
                {locationDetail.dimension}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResidentsList() {
  const { characters } = useCharacters();

  function renderResidentsList() {
    return characters.map((resident, index) => {
      return <Resident index={index} key={resident.id} resident={resident} />;
    });
  }

  return (
    <div className="md:rounded-xl md:bg-slate-800 md:p-4">
      <div className="mb-6 flex md:mb-9">
        <div>
          <h2 className="text-xl font-semibold text-slate-300">
            List of Residents :
          </h2>
        </div>
      </div>
      <div>{renderResidentsList()}</div>
    </div>
  );
}

export function Resident({ resident, index }) {
  return (
    <div className="mb-8 flex">
      <div className="">
        <span className="mb-3 block w-full font-normal text-slate-300">
          {String(index + 1).padStart(2, "0")}.
          <span className="ml-1 font-bold">{resident.name}</span>
        </span>
      </div>
    </div>
  );
}
