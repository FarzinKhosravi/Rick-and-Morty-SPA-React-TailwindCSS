import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { usePageId } from "../../context/PageIdContext";
import getEpisodesPagination from "./../../services/EpisodePage/getEpisodesPaginationService";
import { useEpisodesDispatch } from "./../../context/EpisodePage/EpisodesContext";

const initialValues = {
  userSearch: "",
  season: "",
};

const onSubmit = (values, { resetForm }) => {
  resetForm({ values: "" });
};

function FilterEpisodes() {
  const formik = useFormik({ initialValues, onSubmit });

  const setEpisodes = useEpisodesDispatch();

  const pageId = usePageId();

  function filterEpisodes(page) {
    const controller = new AbortController();
    const signal = controller.signal;

    getEpisodesPagination({ signal })
      .then(({ data }) => {
        const episodesData = data[page].episodes.filter((episode) =>
          episode.name
            .toLowerCase()
            .includes(formik.values.userSearch.toLowerCase())
        );

        if (episodesData.length === 0) {
          toast.error("Your Character Not Found 🧐");
        }

        setEpisodes(episodesData);
      })
      .catch((err) => console.log(err));

    if (formik.values.season !== "") {
      getEpisodesPagination()
        .then(({ data }) => {
          const episodesData = data[page].episodes.filter(
            (episode) =>
              episode.episode.slice(0, 3).toLowerCase() ===
              formik.values.season.toLowerCase()
          );

          setEpisodes(episodesData);
        })
        .catch((err) => console.log(err));
    }

    return () => {
      controller.abort();
    };
  }

  useEffect(() => {
    switch (pageId) {
      case 1:
        filterEpisodes("pageOne");
        break;

      case 2:
        filterEpisodes("pageTwo");
        break;

      case 3:
        filterEpisodes("pageThree");
        break;

      default:
        return;
    }
  }, [formik.values, pageId]);

  const { season, userSearch } = formik.values;

  return (
    <div className="mb-8">
      <div>
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-slate-300">
            Filter of Episodes :
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="rounded-xl bg-slate-700 p-5"
        >
          <div className="mb-5">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-300">Search:</h3>
            </div>
            <div className="w-full">
              <input
                className="block w-full rounded-xl bg-slate-500 text-base text-slate-200  placeholder:text-slate-400"
                type="text"
                name="userSearch"
                value={formik.values.userSearch}
                onChange={formik.handleChange}
                placeholder="Search Episodes..."
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-300">Season:</h3>
            </div>
            <div className="w-full">
              <select
                name="season"
                value={formik.values.season}
                onChange={formik.handleChange}
                className="w-full cursor-pointer rounded-xl bg-slate-600 text-base text-slate-200"
              >
                <option value="">Select Season:</option>
                <option value="s01">Season 01</option>
                <option value="s02">Season 02</option>
                <option value="s03">Season 03</option>
              </select>
            </div>
          </div>
          <div>
            <button
              className="block w-full cursor-pointer appearance-none rounded-xl border-none bg-red-600 px-4 py-3 text-center text-slate-200 outline-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:bg-gray-600"
              type="submit"
              disabled={season || userSearch ? false : true}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterEpisodes;
