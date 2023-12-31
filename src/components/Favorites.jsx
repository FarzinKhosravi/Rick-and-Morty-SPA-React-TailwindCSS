import { HeartIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import Modal from "./Modal";
import { useFavorites } from "../context/CharacterPage/FavoritesContext";

function Favorites() {
  const [isShowModal, setIsShowModal] = useState(false);

  const showModal = () => {
    setIsShowModal(true);
  };

  const hideModal = () => {
    setIsShowModal(false);
  };

  return (
    <>
      <Modal onHideModal={hideModal} isShowModal={isShowModal} />
      <FavoritesTotal onShowModal={showModal} />
    </>
  );
}

export default Favorites;

function FavoritesTotal({ onShowModal }) {
  const favorites = useFavorites();

  return (
    <div
      onClick={onShowModal}
      className="relative mr-3 cursor-pointer font-sans font-semibold md:mr-0"
    >
      <HeartIcon className="h-8 w-8 text-red-600" />
      <span className="absolute -right-1 top-0 inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-xs text-white">
        <span>{favorites.length}</span>
      </span>
    </div>
  );
}
