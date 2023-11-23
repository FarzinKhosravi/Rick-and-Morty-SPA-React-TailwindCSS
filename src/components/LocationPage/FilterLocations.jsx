import { useFormik } from "formik";
import { useLocationsDispatch } from "./../../context/LocationPage/LocationsContext";
import { usePageId } from "../../context/PageIdContext";
import { useEffect } from "react";
import getLocationsPagination from "./../../services/LocationPage/getLocationsPaginationService";
import toast from "react-hot-toast";

const initialValues = {
  userSearch: "",
  type: "",
  dimension: "",
};

const onSubmit = (values, { resetForm }) => {
  resetForm({ values: "" });
};

function FilterLocations() {
  const formik = useFormik({ initialValues, onSubmit });

  const setLocations = useLocationsDispatch();

  const pageId = usePageId();

  function filterLocations(page) {
    const controller = new AbortController();
    const signal = controller.signal;

    getLocationsPagination({ signal })
      .then(({ data }) => {
        const locationsData = data[page].locations.filter((location) =>
          location.name
            .toLowerCase()
            .includes(formik.values.userSearch.toLowerCase())
        );

        if (locationsData.length === 0) {
          toast.error("Your Character Not Found 🧐");
        }

        setLocations(locationsData);
      })
      .catch((err) => console.log(err));

    if (formik.values.type !== "") {
      getLocationsPagination()
        .then(({ data }) => {
          const locationsData = data[page].locations.filter(
            (location) =>
              location.type.replace(/ +/g, "").toLowerCase() ===
              formik.values.type.toLowerCase()
          );

          setLocations(locationsData);
        })
        .catch((err) => console.log(err));
    }

    if (formik.values.dimension !== "") {
      getLocationsPagination()
        .then(({ data }) => {
          const locationsData = data[page].locations.filter(
            (location) =>
              location.dimension.replace(/ +/g, "").toLowerCase() ===
              formik.values.dimension.toLowerCase()
          );

          setLocations(locationsData);
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
        filterLocations("pageOne");
        break;

      case 2:
        filterLocations("pageTwo");
        break;

      case 3:
        filterLocations("pageThree");
        break;

      default:
        return;
    }
  }, [formik.values, pageId]);

  const { dimension, type, userSearch } = formik.values;

  return (
    <div className="mb-8">
      <div>
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-300">
            Filter of Locations :
          </h2>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="rounded-xl bg-slate-200 p-5 dark:bg-slate-700"
        >
          <div className="mb-5">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300">
                Search:
              </h3>
            </div>
            <div className="w-full">
              <input
                className="block w-full rounded-xl bg-slate-300 text-base text-slate-800 placeholder:text-slate-800 dark:bg-slate-500 dark:text-slate-200  dark:placeholder:text-slate-400"
                type="text"
                name="userSearch"
                value={formik.values.userSearch}
                onChange={formik.handleChange}
                placeholder="Search Locations..."
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300">
                Type:
              </h3>
            </div>
            <div className="w-full">
              <select
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                className="w-full cursor-pointer rounded-xl bg-slate-300 text-base text-slate-800 dark:bg-slate-600 dark:text-slate-200"
              >
                <option value="">Select Type:</option>
                <option value="planet">Planet</option>
                <option value="cluster">Cluster</option>
                <option value="spacestation">Space Station</option>
                <option value="microverse">Microverse</option>
                <option value="tv">TV</option>
                <option value="resort">Resort</option>
                <option value="fantasytown">Fantasy Town</option>
                <option value="dream">Dream</option>
              </select>
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300">
                Dimension:
              </h3>
            </div>
            <div className="w-full">
              <select
                name="dimension"
                value={formik.values.dimension}
                onChange={formik.handleChange}
                className="w-full cursor-pointer rounded-xl bg-slate-300 text-base text-slate-800 dark:bg-slate-600 dark:text-slate-200"
              >
                <option value="">Select Dimension:</option>
                <option value="dimensionc-137">Dimension C-137</option>
                <option value="unknown">Unknown</option>
                <option value="postapocalypticdimension">
                  Post-Apocalyptic Dimension
                </option>
                <option value="replacementdimension">
                  Replacement Dimension
                </option>
                <option value="cronenbergdimension">
                  Cronenberg Dimension
                </option>
                <option value="fantasydimension">Fantasy Dimension</option>
                <option value="dimension5-126">Dimension 5-126</option>
              </select>
            </div>
          </div>
          <div>
            <button
              className="block w-full cursor-pointer appearance-none rounded-xl border-none bg-red-600 px-4 py-3 text-center text-slate-800 outline-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:bg-gray-400 dark:text-slate-200 dark:disabled:bg-gray-600"
              type="submit"
              disabled={type || dimension || userSearch ? false : true}
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterLocations;
