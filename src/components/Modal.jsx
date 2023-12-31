import { TrashIcon, XCircleIcon, FireIcon } from "@heroicons/react/24/outline";
import { Character } from "./CharacterPage/CharacterList";
import { useFavorites } from "../context/CharacterPage/FavoritesContext";
import { useFavoritesDispatch } from "./../context/CharacterPage/FavoritesContext";

function Modal({ isShowModal, onHideModal }) {
  return (
    <div
      className={`fixed inset-0 z-10 h-screen items-center justify-center bg-slate-300/50 py-12 dark:bg-slate-900/50 ${
        isShowModal ? "flex" : "hidden"
      }`}
    >
      <Backdrop onHideModal={onHideModal} isShowModal={isShowModal} />

      <div className="no-scrollbar h-full w-11/12 overflow-y-auto rounded-lg">
        <div className="flex flex-col rounded-lg bg-slate-300 shadow-xl shadow-slate-900/30 dark:bg-slate-900 dark:shadow-slate-300/30">
          <ModalHeader onHideModal={onHideModal} />
          <FavoriteCharacters />
        </div>
      </div>
    </div>
  );
}

export default Modal;

function Backdrop({ onHideModal, isShowModal }) {
  return (
    <div
      onClick={onHideModal}
      className={`fixed inset-0 h-screen cursor-pointer bg-slate-300/50 dark:bg-slate-900/50 ${
        isShowModal ? "block" : "hidden"
      }`}
    ></div>
  );
}

function ModalHeader({ onHideModal }) {
  const { removeAllFavoritesHandler } = useFavoritesDispatch();

  return (
    <div className="sticky left-0 right-0 top-0 z-20 bg-slate-300 p-3 dark:bg-slate-900">
      <div className="mb-1 flex items-center justify-between pb-1">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-300">
          List of Favorites
        </h2>
        <div className="flex items-center justify-end">
          <div className="mr-2">
            <FireIcon
              onClick={removeAllFavoritesHandler}
              className="h-6 w-6 cursor-pointer text-yellow-500"
            />
          </div>
          <div>
            <XCircleIcon
              onClick={onHideModal}
              className="h-6 w-6 cursor-pointer text-red-600"
            />
          </div>
        </div>
      </div>
      <hr className="mb-6 h-px border-0 bg-slate-600" />
    </div>
  );
}

function FavoriteCharacters() {
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
    <div className="z-10 flex flex-col gap-y-4 px-3 pb-3">
      {renderFavoriteCharacters()}
    </div>
  );
}
