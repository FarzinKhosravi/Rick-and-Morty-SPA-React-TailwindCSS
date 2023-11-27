import { useFormik } from "formik";
import { useEffect } from "react";
import { usePageId } from "../../context/PageIdContext";
import getCharactersPagination from "./../../services/CharacterPage/getCharactersPaginationService";
import { useCharactersDispatch } from "./../../context/CharacterPage/CharactersContext";
import pagesDataSwitcher from "./../../utils/pagesDataSwitcher";
import SearchBox from "./../../common/SearchBox";
import CheckBox from "./../../common/CheckBox";
import RadioButton from "../../common/RadioButton";
import SelectOption from "./../../common/SelectOption";
import ResetButton from "../../common/ResetButton";
import FilterTitle from "../../common/FilterTitle";
import itemsSearch from "./../../utils/itemsSearch";

const statusOptions = [
  { id: 1, label: "Alive", value: "alive" },
  { id: 2, label: "Dead", value: "dead" },
  { id: 3, label: "Unknown", value: "unknown" },
];

const speciesOptions = [
  { id: 1, label: "Human", value: "human" },
  { id: 2, label: "Alien", value: "alien" },
];

const genderOptions = [
  { id: 1, label: "Select Gender:", value: "" },
  { id: 2, label: "Male", value: "male" },
  { id: 3, label: "Female", value: "female" },
  { id: 4, label: "Unknown", value: "unknown" },
];

const initialValues = {
  userSearch: "",
  status: [],
  species: "",
  gender: "",
};

const onSubmit = (values, { resetForm }) => {
  resetForm({ values: "" });
};

function FilterCharacters() {
  const formik = useFormik({ initialValues, onSubmit });

  const filterCharactersOptions = Object.values(formik.values);

  const charactersDispatch = useCharactersDispatch();

  const pageId = usePageId();

  const { status, species, gender } = formik.values;

  function charactersStatusFilter(data, page, items, formik) {
    let charactersData = [];

    formik.values.status.forEach((status) => {
      const matchedCharactersList = data[page][items].filter((character) => {
        return character.status.toLowerCase() === status.toLowerCase();
      });

      charactersData.push(matchedCharactersList);
    });

    charactersData = charactersData.flat();

    return charactersData;
  }

  function charactersSpeciesFilter(data, page, items, formik) {
    const charactersData = data[page][items].filter(
      (character) =>
        character.species.toLowerCase() === formik.values.species.toLowerCase()
    );

    return charactersData;
  }

  function charactersGenderFilter(data, page, items, formik) {
    const charactersData = data[page][items].filter(
      (character) =>
        character.gender.toLowerCase() === formik.values.gender.toLowerCase()
    );

    return charactersData;
  }

  function getCharactersPaginationLogic(page, signal, callback) {
    getCharactersPagination({ signal })
      .then(({ data }) => {
        const charactersData = callback(data, page, "characters", formik);

        charactersDispatch({
          type: "CHARACTERS_SUCCESS",
          payload: charactersData,
        });
      })
      .catch((err) => console.log(err));
  }

  function filterCharacters(page, signal) {
    getCharactersPaginationLogic(page, signal, itemsSearch);

    if (status.length)
      getCharactersPaginationLogic(page, signal, charactersStatusFilter);

    if (species !== "")
      getCharactersPaginationLogic(page, signal, charactersSpeciesFilter);

    if (gender !== "")
      getCharactersPaginationLogic(page, signal, charactersGenderFilter);
  }

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    pagesDataSwitcher(pageId, filterCharacters, signal);

    return () => {
      controller.abort();
    };
  }, [formik.values, pageId]);

  return (
    <div className="mb-8">
      <div className="mx-auto md:max-w-screen-md">
        <FilterTitle title="Characters" />
        <form
          onSubmit={formik.handleSubmit}
          className="rounded-xl bg-slate-200 p-5 dark:bg-slate-700"
        >
          <SearchBox formik={formik} placeholder="Search Characters..." />
          <div className="mb-5">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
                Status:
              </h3>
            </div>
            <div className="flex flex-col">
              {statusOptions.map(({ id, value, label }) => {
                return (
                  <CheckBox
                    key={id}
                    formik={formik}
                    name="status"
                    value={value}
                    label={label}
                  />
                );
              })}
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-xl">
                Species:
              </h3>
            </div>
            <div className="flex w-full">
              {speciesOptions.map(({ id, value, label }) => {
                return (
                  <RadioButton
                    key={id}
                    value={value}
                    label={label}
                    name="species"
                    formik={formik}
                  />
                );
              })}
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-300 lg:text-lg">
                Gender:
              </h3>
            </div>
            <SelectOption
              optionsList={genderOptions}
              formik={formik}
              name="gender"
            />
          </div>
          <ResetButton filterOptions={filterCharactersOptions} />
        </form>
      </div>
    </div>
  );
}

export default FilterCharacters;
