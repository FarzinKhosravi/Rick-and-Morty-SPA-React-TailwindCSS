import { TrashIcon, XCircleIcon } from "@heroicons/react/24/outline";
import {
  useFavorites,
  useFavoritesDispatch,
} from "../context/FavoritesContext";
import { Character } from "./CharacterPage/CharacterList";

function Modal({ isShowModal, onHideModal }) {
  const favorites = useFavorites();
  const { removeFavoriteCharacter } = useFavoritesDispatch();

  function renderFavoriteCharacters() {
    return favorites.map((character) => {
      return (
        <Character character={character} key={character.id}>
          <TrashIcon
            onClick={() => removeFavoriteCharacter(character.id)}
            className="h-5 w-5 text-red-600"
          />
        </Character>
      );
    });
  }

  return (
    <div
      className={`fixed inset-0 z-10 h-screen items-center justify-center bg-slate-900/50 py-12 ${
        isShowModal ? "flex" : "hidden"
      }`}
    >
      <div
        onClick={onHideModal}
        className={`fixed inset-0 h-screen cursor-pointer bg-slate-900/50 ${
          isShowModal ? "block" : "hidden"
        }`}
      ></div>

      <div className="no-scrollbar h-full w-11/12 overflow-y-auto rounded-lg">
        <div className="flex flex-col rounded-lg bg-slate-900 shadow-xl shadow-slate-300/30">
          <div className="sticky left-0 right-0 top-0 z-20 bg-slate-900 p-3">
            <div className="mb-1 flex items-center justify-between pb-1">
              <h2 className="text-lg font-semibold text-slate-300">
                List of Favorites
              </h2>
              <div>
                <XCircleIcon
                  onClick={onHideModal}
                  className="h-6 w-6 cursor-pointer text-red-600"
                />
              </div>
            </div>
            <hr className="mb-6 h-px border-0 bg-slate-600" />
          </div>
          <div className="z-10 flex flex-col gap-y-4 px-3 pb-3">
            {renderFavoriteCharacters()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
