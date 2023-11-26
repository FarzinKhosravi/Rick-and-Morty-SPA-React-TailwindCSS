import { useFormik } from "formik";
import { useEffect } from "react";
import { usePageId } from "../../context/PageIdContext";
import getEpisodesPagination from "./../../services/EpisodePage/getEpisodesPaginationService";
import { useEpisodesDispatch } from "./../../context/EpisodePage/EpisodesContext";
import pagesDataSwitcher from "./../../utils/pagesDataSwitcher";
import SearchBox from "../../common/SearchBox";
import SelectOption from "../../common/SelectOption";
import ResetButton from "../../common/ResetButton";
import FilterTitle from "./../../common/FilterTitle";
import itemsSearch from "../../utils/itemsSearch";

const seasonOptions = [
  { id: 1, label: "Select Season:", value: "" },
  { id: 2, label: "Season 01", value: "s01" },
  { id: 3, label: "Season 02", value: "s02" },
  { id: 4, label: "Season 03", value: "s03" },
];

const initialValues = {
  userSearch: "",
  season: "",
};

const onSubmit = (values, { resetForm }) => {
  resetForm({ values: "" });
};

function FilterEpisodes() {
  const formik = useFormik({ initialValues, onSubmit });

  const filterEpisodesOptions = Object.values(formik.values);

  const setEpisodes = useEpisodesDispatch();

  const pageId = usePageId();

  function episodesSeasonFilter(data, page, items, formik) {
    const episodesData = data[page][items].filter(
      (episode) =>
        episode.episode.slice(0, 3).toLowerCase() ===
        formik.values.season.toLowerCase()
    );

    return episodesData;
  }

  function getEpisodesPaginationLogic(page, signal, callback) {
    getEpisodesPagination({ signal })
      .then(({ data }) => {
        const episodesData = callback(data, page, "episodes", formik);

        setEpisodes(episodesData);
      })
      .catch((err) => console.log(err));
  }

  function filterEpisodes(page, signal) {
    getEpisodesPaginationLogic(page, signal, itemsSearch);

    if (formik.values.season !== "")
      getEpisodesPaginationLogic(page, signal, episodesSeasonFilter);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    pagesDataSwitcher(pageId, filterEpisodes, signal);

    return () => {
      controller.abort();
    };
  }, [formik.values, pageId]);

  return (
    <div className="mb-8">
      <div>
        <FilterTitle title="Episodes" />
        <form
          onSubmit={formik.handleSubmit}
          className="rounded-xl bg-slate-200 p-5 dark:bg-slate-700"
        >
          <SearchBox formik={formik} placeholder="Search Episodes..." />
          <div className="mb-6">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300">
                Season:
              </h3>
            </div>
            <SelectOption
              optionsList={seasonOptions}
              name="season"
              formik={formik}
            />
          </div>
          <ResetButton filterOptions={filterEpisodesOptions} />
        </form>
      </div>
    </div>
  );
}

export default FilterEpisodes;
