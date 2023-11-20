import Introduction from "../common/Introduction";
import FilterLocations from "../components/LocationPage/FilterLocations";
import LocationList from "../components/LocationPage/LocationList";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";
import Pagination from "./../common/Pagination";

function LocationPage() {
  const introduction = useFetchIntroductionData();

  return (
    <section className="min-h-screen px-4">
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
