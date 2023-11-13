import Introduction from "./../common/Introduction";
import useFetchIntroductionData from "../hooks/useFetchIntroductionData";
import CharacterList from "../components/CharacterPage/CharacterList";

function CharacterPage() {
  const introduction = useFetchIntroductionData();

  return (
    <section className="min-h-screen px-4">
      <div className="flex flex-col">
        <Introduction introduction={introduction} />
        <div className="mb-8">
          <div>
            <div className="mb-2">
              <h2 className="text-lg font-semibold text-slate-300">
                Filter of Characters :
              </h2>
            </div>
            <form className="rounded-xl bg-slate-700 p-5">
              <div className="mb-5 w-full">
                <input
                  className="block w-full rounded-xl bg-slate-500 text-base text-slate-200  placeholder:text-slate-400"
                  type="text"
                  placeholder="Search Characters..."
                />
              </div>
              <div className="mb-4 flex flex-col">
                <div className="mb-3 flex items-center">
                  <input type="checkbox" name="alive" id="Alive" />
                  <label className="ml-1 text-slate-300" htmlFor="Alive">
                    Alive
                  </label>
                </div>
                <div className="mb-3 flex items-center">
                  <input type="checkbox" name="dead" id="Dead" />
                  <label className="ml-1 text-slate-300" htmlFor="Dead">
                    Dead
                  </label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="unknown" id="Unknown" />
                  <label className="ml-1 text-slate-300" htmlFor="Unknown">
                    Unknown
                  </label>
                </div>
              </div>
              <div className="mb-4 flex w-full">
                <div>
                  <input type="radio" name="species" id="Human" />
                  <label className="ml-1 text-slate-300" htmlFor="Human">
                    Human
                  </label>
                </div>
                <div className="ml-3">
                  <input type="radio" name="species" id="Alien" />
                  <label className="ml-1 text-slate-300" htmlFor="Alien">
                    Alien
                  </label>
                </div>
              </div>
              <div className="w-full">
                <select className="w-full rounded-xl bg-slate-600 text-base text-slate-200">
                  <option value="">Select Gender:</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </form>
          </div>
        </div>
        <CharacterList />
      </div>
    </section>
  );
}

export default CharacterPage;
