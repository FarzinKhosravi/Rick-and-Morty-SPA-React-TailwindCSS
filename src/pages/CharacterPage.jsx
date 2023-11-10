import Introduction from "./../common/Introduction";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";
import CharacterList from "../components/CharacterList";

function CharacterPage() {
  const introduction = useFetchIntroductionData();

  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col">
        <Introduction introduction={introduction} />
        <CharacterList />
      </div>
    </section>
  );
}

export default CharacterPage;
