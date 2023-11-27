import Introduction from "../common/Introduction";
import Pagination from "../common/Pagination";
import EpisodeList from "../components/EpisodePage/EpisodeList";
import FilterEpisodes from "../components/EpisodePage/FilterEpisodes";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";

function EpisodePage() {
  const introduction = useFetchIntroductionData();

  return (
    <section className="mx-auto mb-8 min-h-screen px-4 md:mb-16 2xl:max-w-screen-2xl">
      <div className="flex flex-col">
        <Introduction introduction={introduction} />
        <FilterEpisodes />
        <EpisodeList />
        <Pagination />
      </div>
    </section>
  );
}

export default EpisodePage;
