import { Link } from "react-router-dom";
import Introduction from "../common/Introduction";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";

function HomePage() {
  const introduction = useFetchIntroductionData("home");

  return (
    <section className="mx-auto mb-12 min-h-screen px-4 md:mb-0 2xl:max-w-screen-2xl">
      <div className="flex flex-col items-start">
        <Introduction introduction={introduction} />
        <StartButton />
      </div>
    </section>
  );
}

export default HomePage;

function StartButton() {
  return (
    <div>
      <Link to="/characters?type=characters">
        <button
          className="block w-full cursor-pointer appearance-none rounded-lg border-none bg-slate-900 px-4 py-3 text-center text-slate-300 outline-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:shadow-none dark:bg-slate-300 dark:text-black lg:text-lg"
          type="button"
        >
          Let&apos;s Get to Know 😎
        </button>
      </Link>
    </div>
  );
}
