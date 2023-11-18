import Introduction from "../common/Introduction";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";

function EpisodePage() {
  const introduction = useFetchIntroductionData();

  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col">
        <Introduction introduction={introduction} />
      </div>
    </section>
  );
}

export default EpisodePage;
