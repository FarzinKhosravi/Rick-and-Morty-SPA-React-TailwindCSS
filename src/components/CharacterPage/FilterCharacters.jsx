import { useFormik } from "formik";
import { useCharactersDispatch } from "../../context/CharactersContext";
import getAllCharacters from "../../services/getAllCharactersService";
import { useEffect } from "react";
import toast from "react-hot-toast";

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

  const charactersDispatch = useCharactersDispatch();

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    getAllCharacters({ signal })
      .then(({ data }) => {
        const charactersData = data.filter((character) =>
          character.name
            .toLowerCase()
            .includes(formik.values.userSearch.toLowerCase())
        );

        if (charactersData.length === 0) {
          toast.error("Your Character Not Found 🧐");
        }

        charactersDispatch({
          type: "CHARACTERS_SUCCESS",
          payload: charactersData,
        });
      })
      .catch((err) => console.log(err));

    if (formik.values.status.length) {
      getAllCharacters()
        .then(({ data }) => {
          let charactersData = [];

          formik.values.status.forEach((status) => {
            const matchedCharactersList = data.filter((character) => {
              return character.status.toLowerCase() === status.toLowerCase();
            });

            charactersData.push(matchedCharactersList);
          });

          // console.log(charactersData);

          charactersData = charactersData.flat();

          // console.log(x);

          charactersDispatch({
            type: "CHARACTERS_SUCCESS",
            payload: charactersData,
          });
        })
        .catch((err) => console.log(err));
    }

    if (formik.values.species !== "") {
      getAllCharacters()
        .then(({ data }) => {
          const charactersData = data.filter(
            (character) =>
              character.species.toLowerCase() ===
              formik.values.species.toLowerCase()
          );

          charactersDispatch({
            type: "CHARACTERS_SUCCESS",
            payload: charactersData,
          });
        })
        .catch((err) => console.log(err));
    }

    if (formik.values.gender !== "") {
      getAllCharacters()
        .then(({ data }) => {
          const charactersData = data.filter(
            (character) =>
              character.gender.toLowerCase() ===
              formik.values.gender.toLowerCase()
          );

          charactersDispatch({
            type: "CHARACTERS_SUCCESS",
            payload: charactersData,
          });
        })
        .catch((err) => console.log(err));
    }

    return () => {
      controller.abort();
    };
  }, [formik.values]);

  const { gender, species, status, userSearch } = formik.values;

  return (
    <div className="mb-8">
      <div>
        <div className="mb-2">
          <h2 className="text-lg font-semibold text-slate-300">
            Filter of Characters :
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
                placeholder="Search Characters..."
              />
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-300">Status:</h3>
            </div>
            <div className="flex flex-col">
              <div className="mb-3 flex items-center">
                <input
                  type="checkbox"
                  name="status"
                  value="alive"
                  onChange={formik.handleChange}
                  checked={formik.values["status"].includes("alive")}
                  id="Alive"
                  className="cursor-pointer rounded"
                />
                <label
                  className="ml-2 cursor-pointer text-slate-300"
                  htmlFor="Alive"
                >
                  Alive
                </label>
              </div>
              <div className="mb-3 flex items-center">
                <input
                  type="checkbox"
                  name="status"
                  value="dead"
                  onChange={formik.handleChange}
                  checked={formik.values["status"].includes("dead")}
                  id="Dead"
                  className="cursor-pointer rounded"
                />
                <label
                  className="ml-2 cursor-pointer text-slate-300"
                  htmlFor="Dead"
                >
                  Dead
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="status"
                  value="unknown"
                  onChange={formik.handleChange}
                  checked={formik.values["status"].includes("unknown")}
                  id="Unknown"
                  className="cursor-pointer rounded"
                />
                <label
                  className="ml-2 cursor-pointer text-slate-300"
                  htmlFor="Unknown"
                >
                  Unknown
                </label>
              </div>
            </div>
          </div>
          <div className="mb-5">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-300">Species:</h3>
            </div>
            <div className="flex w-full">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="species"
                  value="human"
                  onChange={formik.handleChange}
                  checked={formik.values["species"] === "human"}
                  id="Human"
                  className="cursor-pointer"
                />
                <label
                  className="ml-2 cursor-pointer text-slate-300"
                  htmlFor="Human"
                >
                  Human
                </label>
              </div>
              <div className="ml-3 flex items-center">
                <input
                  type="radio"
                  name="species"
                  value="alien"
                  onChange={formik.handleChange}
                  checked={formik.values["species"] === "alien"}
                  id="Alien"
                  className="cursor-pointer"
                />
                <label
                  className="ml-2 cursor-pointer text-slate-300"
                  htmlFor="Alien"
                >
                  Alien
                </label>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-slate-300">Gender:</h3>
            </div>
            <div className="w-full">
              <select
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
                className="w-full cursor-pointer rounded-xl bg-slate-600 text-base text-slate-200"
              >
                <option value="">Select Gender:</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unknown">Unknown</option>
              </select>
            </div>
          </div>
          <div>
            <button
              className="block w-full cursor-pointer appearance-none rounded-xl border-none bg-red-600 px-4 py-3 text-center text-slate-200 outline-none transition-all duration-300 ease-in-out hover:-translate-y-0.5 active:translate-y-0 active:shadow-none disabled:bg-gray-600"
              type="submit"
              disabled={
                gender || species || status.length || userSearch ? false : true
              }
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilterCharacters;
