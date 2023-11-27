import Introduction from "../common/Introduction";
import FilterLocations from "../components/LocationPage/FilterLocations";
import LocationList from "../components/LocationPage/LocationList";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";
import Pagination from "./../common/Pagination";

function LocationPage() {
  const introduction = useFetchIntroductionData();

  return (
    <section className="mx-auto mb-8 min-h-screen px-4 md:mb-16 2xl:max-w-screen-2xl">
      <div className="flex flex-col">
        <Introduction introduction={introduction} />
        <FilterLocations />
        <LocationList />
        <Pagination />
      </div>
    </section>
  );
}

export default LocationPage;
