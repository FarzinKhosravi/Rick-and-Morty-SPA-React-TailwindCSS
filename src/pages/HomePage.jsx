import { Link } from "react-router-dom";

function HomePage() {
  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col items-start">
        <div className="mb-8 w-full text-center text-slate-300">
          <h2 className="animate-light text-3xl font-light">Rick And Morty</h2>
        </div>
        <div className="mb-9">
          <p className="font-light italic text-slate-300">
            The Emmy Award-Winning Half-Hour Animated Rick and Morty is Adult
            Swim&apos;s Hit Comedy Series that Follows a Sociopathic Genius
            Scientist who takes his Naturally Timid Grandson on Crazy, Dangerous
            Adventures around the World;
            <br />
            <br />
            In this Application, You can Get Information about All the
            Characters of the Series. <span className="not-italic">😍</span>
          </p>
        </div>
        <div>
          <Link to="/characters">
            <button
              className="block w-full cursor-pointer appearance-none rounded-lg border-none bg-slate-300 px-4 py-3 text-center text-black outline-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:shadow-none"
              type="button"
            >
              Let&apos;s Get to Know 😎
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
