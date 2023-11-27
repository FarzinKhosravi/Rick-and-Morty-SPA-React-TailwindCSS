import { useFormik } from "formik";
import { useLocationsDispatch } from "./../../context/LocationPage/LocationsContext";
import { usePageId } from "../../context/PageIdContext";
import { useEffect } from "react";
import getLocationsPagination from "./../../services/LocationPage/getLocationsPaginationService";
import pagesDataSwitcher from "./../../utils/pagesDataSwitcher";
import SearchBox from "../../common/SearchBox";
import ResetButton from "../../common/ResetButton";
import SelectOption from "../../common/SelectOption";
import FilterTitle from "../../common/FilterTitle";
import itemsSearch from "./../../utils/itemsSearch";

const typeOptions = [
  { id: 1, label: "Select Type:", value: "" },
  { id: 2, label: "Planet", value: "planet" },
  { id: 3, label: "Cluster", value: "cluster" },
  { id: 4, label: "Space Station", value: "spacestation" },
  { id: 5, label: "Microverse", value: "microverse" },
  { id: 6, label: "TV", value: "tv" },
  { id: 7, label: "Resort", value: "resort" },
  { id: 8, label: "Fantasy Town", value: "fantasytown" },
  { id: 9, label: "Dream", value: "dream" },
];

const dimensionOptions = [
  { id: 1, label: "Select Dimension:", value: "" },
  { id: 2, label: "Dimension C-137", value: "dimensionc-137" },
  { id: 3, label: "Unknown", value: "unknown" },
  {
    id: 4,
    label: "Post-Apocalyptic Dimension",
    value: "postapocalypticdimension",
  },
  { id: 5, label: "Replacement Dimension", value: "replacementdimension" },
  { id: 6, label: "Cronenberg Dimension", value: "cronenbergdimension" },
  { id: 7, label: "Fantasy Dimension", value: "fantasydimension" },
  { id: 8, label: "Dimension 5-126", value: "dimension5-126" },
];

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

  const filterLocationsOptions = Object.values(formik.values);

  const setLocations = useLocationsDispatch();

  const pageId = usePageId();

  function locationsTypeFilter(data, page, items, formik) {
    const locationsData = data[page][items].filter(
      (location) =>
        location.type.replace(/ +/g, "").toLowerCase() ===
        formik.values.type.toLowerCase()
    );

    return locationsData;
  }

  function locationsDimensionFilter(data, page, items, formik) {
    const locationsData = data[page][items].filter(
      (location) =>
        location.dimension.replace(/ +/g, "").toLowerCase() ===
        formik.values.dimension.toLowerCase()
    );
    return locationsData;
  }

  function getLocationsPaginationLogic(page, signal, callback) {
    getLocationsPagination({ signal })
      .then(({ data }) => {
        const locationsData = callback(data, page, "locations", formik);

        setLocations(locationsData);
      })
      .catch((err) => console.log(err));
  }

  function filterLocations(page, signal) {
    getLocationsPaginationLogic(page, signal, itemsSearch);

    if (formik.values.type !== "")
      getLocationsPaginationLogic(page, signal, locationsTypeFilter);

    if (formik.values.dimension !== "")
      getLocationsPaginationLogic(page, signal, locationsDimensionFilter);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    pagesDataSwitcher(pageId, filterLocations, signal);

    return () => {
      controller.abort();
    };
  }, [formik.values, pageId]);

  return (
    <div className="mb-8">
      <div className="mx-auto md:max-w-screen-md">
        <FilterTitle title="Locations" />
        <form
          onSubmit={formik.handleSubmit}
          className="rounded-xl bg-slate-200 p-5 dark:bg-slate-700"
        >
          <SearchBox formik={formik} placeholder="Search Locations..." />
          <div className="mb-6">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
                Type:
              </h3>
            </div>
            <SelectOption
              optionsList={typeOptions}
              name="type"
              formik={formik}
            />
          </div>
          <div className="mb-6">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
                Dimension:
              </h3>
            </div>
            <SelectOption
              optionsList={dimensionOptions}
              name="dimension"
              formik={formik}
            />
          </div>
          <ResetButton filterOptions={filterLocationsOptions} />
        </form>
      </div>
    </div>
  );
}

export default FilterLocations;
