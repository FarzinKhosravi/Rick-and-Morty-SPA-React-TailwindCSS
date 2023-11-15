import Introduction from "./../common/Introduction";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";
import CharacterList from "../components/CharacterPage/CharacterList";
import FilterCharacters from "../components/CharacterPage/FilterCharacters";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function CharacterPage() {
  const introduction = useFetchIntroductionData();

  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col">
        <Introduction introduction={introduction} />
        <FilterCharacters />
        <CharacterList />
        <div>
          <div className="rounded-3xl bg-slate-800/50 p-3">
            <div className="flex items-center justify-between rounded-full bg-slate-900 p-4">
              <div className="flex h-8 w-9 items-center justify-center rounded-full bg-slate-900/50">
                <button className="block">
                  <ChevronLeftIcon className="h-5 w-5 text-red-600" />
                </button>
              </div>
              <div className="flex w-full items-center justify-evenly">
                <span className="block h-7 w-7 rounded-full bg-slate-900/50 text-center font-semibold text-slate-300">
                  1
                </span>
                <span className="block h-7 w-7 rounded-full bg-slate-900/50 text-center font-semibold text-slate-300">
                  2
                </span>
                <span className="block h-7 w-7 rounded-full bg-slate-900/50 text-center font-semibold text-slate-300">
                  3
                </span>
              </div>
              <div className="flex h-8 w-9 items-center justify-center rounded-full bg-slate-900/50">
                <button className="block">
                  <ChevronRightIcon className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharacterPage;
