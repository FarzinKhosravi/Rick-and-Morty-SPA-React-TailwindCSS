import { Link } from "react-router-dom";
import Introduction from "../common/Introduction";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";

function HomePage() {
  const introduction = useFetchIntroductionData("home");

  return (
    <section className="mb-12 min-h-screen px-4 md:mb-0">
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
          className="block w-full cursor-pointer appearance-none rounded-lg border-none bg-slate-300 px-4 py-3 text-center text-black outline-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
          type="button"
        >
          Let&apos;s Get to Know 😎
        </button>
      </Link>
    </div>
  );
}
