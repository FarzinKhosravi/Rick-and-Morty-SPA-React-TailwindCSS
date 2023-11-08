import { Link, useSearchParams } from "react-router-dom";
import Introduction from "../common/Introduction";
import { useEffect, useState } from "react";
import axios from "axios";

function HomePage() {
  const [searchParams] = useSearchParams();

  const [introduction, setIntroduction] = useState(null);

  const query = searchParams.get("type");

  useEffect(() => {
    axios
      .get("http://localhost:3000/app-introduction")
      .then(({ data }) => {
        const introData = Object.values(data).find(
          (intro) => intro.id === query || "home"
        );

        setIntroduction(introData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col items-start">
        <Introduction introduction={introduction} />
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
