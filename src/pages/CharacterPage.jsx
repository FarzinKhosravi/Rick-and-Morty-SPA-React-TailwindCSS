import Introduction from "./../common/Introduction";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";
import CharacterList from "../components/CharacterPage/CharacterList";
import FilterCharacters from "../components/CharacterPage/FilterCharacters";
// import CharactersPagination from "../components/CharacterPage/CharactersPagination";
import Pagination from "../common/Pagination";

function CharacterPage() {
  const introduction = useFetchIntroductionData();

  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col">
        <Introduction introduction={introduction} />
        <FilterCharacters />
        <CharacterList />
        {/* <CharactersPagination /> */}
        <Pagination />
      </div>
    </section>
  );
}

export default CharacterPage;
