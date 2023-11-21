import Introduction from "./../common/Introduction";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";
import CharacterList from "../components/CharacterPage/CharacterList";
import FilterCharacters from "../components/CharacterPage/FilterCharacters";
import Pagination from "../common/Pagination";

function CharacterPage() {
  const introduction = useFetchIntroductionData();

  return (
    <section className="mb-8 min-h-screen px-4 md:mb-16">
      <div className="flex flex-col">
        <Introduction introduction={introduction} />
        <FilterCharacters />
        <CharacterList />
        <Pagination />
      </div>
    </section>
  );
}

export default CharacterPage;
