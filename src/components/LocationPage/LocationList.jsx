import { Link, useLocation } from "react-router-dom";
import { useLocations } from "../../context/LocationPage/LocationsContext";
import {
  useLocationDetail,
  useLocationDetailDispatch,
} from "./../../context/LocationPage/LocationDetailContext";
import { useState } from "react";
import useFetchLocationsPagination from "./../../hooks/LocationPage/useFetchLocationsPagination";
import { useCharacters } from "./../../context/CharacterPage/CharactersContext";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import ListTitle from "../../common/ListTitle";
import Nothing from "../../common/Nothing";
import AccordionItems from "../../common/AccordionItems";
import GridItems from "../../common/GridItems";
import BackButton from "../../common/BackButton";
import useFetchResidentsList from "./../../hooks/LocationPage/useFetchResidentsList";

function LocationList() {
  const [locationId, setLocationId] = useState(null);
  const setLocationDetail = useLocationDetailDispatch();
  const locations = useLocations();
  const { pathname } = useLocation();

  useFetchLocationsPagination();

  const fetchResidentsData = useFetchResidentsList();

  const showLocationDataHandler = (id) => {
    const selectedLocation = locations.find((location) => location.id === id);

    fetchResidentsData(selectedLocation);

    setLocationDetail(selectedLocation);

    setLocationId(locationId === id ? null : id);
  };

  function renderAccordionLocations() {
    if (!locations.length) return <Nothing />;

    return locations.map((location) => {
      return (
        <div className="mb-4 last:mb-0" key={location.id}>
          <Location
            location={location}
            locationId={locationId}
            onShowLocationData={showLocationDataHandler}
          />
          <div
            className={`rounded-b-xl bg-slate-200 px-3 dark:bg-slate-800 md:hidden ${
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
    });
  }

  function renderGridLocations() {
    if (!locations.length) return <Nothing />;

    return locations.map((location) => {
      return (
        <Link
          to={`/locations/${location.id}`}
          key={location.id}
          className="mb-4"
        >
          <Location location={location} />
        </Link>
      );
    });
  }

  return (
    <div className="mb-8">
      <ListTitle title="Locations" items={locations} />
      <AccordionItems renderMobileItems={renderAccordionLocations} />
      <GridItems items={locations} renderWebItems={renderGridLocations} />
    </div>
  );
}

export default LocationList;

function Location({ location, onShowLocationData, locationId = null }) {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between rounded-xl bg-slate-200 p-3 transition-all duration-200 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 md:p-5 ${
        locationId === location.id ? "rounded-b-none" : ""
      }`}
    >
      <div className="flex gap-x-4 md:w-full md:flex-col">
        <div className="flex flex-col justify-between md:flex-row md:pb-2">
          <div className="mb-1">
            <span className="text-base font-medium text-slate-900 dark:text-slate-300">
              {location.name}
            </span>
          </div>
          <div>
            <span className="text-base font-normal text-slate-900 dark:text-slate-300">
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
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-300">
          Location Detail :
        </h2>
        <BackButton
          pathname={pathname}
          path="locations"
          itemDetail={locationDetail}
        />
      </div>

      <div
        className={`rounded-xl bg-slate-200 dark:bg-slate-800 md:flex md:overflow-hidden md:rounded-xl md:bg-slate-200 dark:md:bg-slate-800 ${
          pathname === `/locations/${locationDetail.id}` ? "p-4 md:p-0" : ""
        }`}
      >
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
              <span className="block text-sm text-slate-700 dark:text-slate-500">
                Location Name:
              </span>
            </div>
            <div className="mb-1">
              <span className="text-sm font-medium text-slate-900 dark:text-slate-300 md:text-lg md:font-semibold">
                {locationDetail.name}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="block text-sm text-slate-700 dark:text-slate-500 md:text-base">
                Location Type:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-300 md:text-base md:font-semibold">
                {locationDetail.type}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="mb-1">
              <span className="block text-sm text-slate-700 dark:text-slate-500 md:text-base">
                Location Dimension:
              </span>
            </div>
            <div className="mb-5">
              <span className="block text-sm font-medium text-slate-900 dark:text-slate-300 md:text-base md:font-semibold">
                {locationDetail.dimension}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ResidentsList({ pathname }) {
  const { characters } = useCharacters();
  const locationDetail = useLocationDetail();

  if (!locationDetail) return;

  function renderResidentsList() {
    return characters.map((resident, index) => {
      return <Resident index={index} key={resident.id} resident={resident} />;
    });
  }

  return (
    <div
      className={`rounded-xl bg-slate-200 dark:bg-slate-800 md:bg-slate-200 dark:md:bg-slate-800 ${
        pathname === `/locations/${locationDetail.id}` ? "p-4" : ""
      }`}
    >
      <div className="mb-6 flex md:mb-9">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-300">
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
      <div>
        <span className="mb-3 block w-full font-normal text-slate-900 dark:text-slate-300">
          {String(index + 1).padStart(2, "0")}.
          <span className="ml-1 font-bold">{resident.name}</span>
        </span>
      </div>
    </div>
  );
}
