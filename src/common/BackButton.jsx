import { ArrowSmallRightIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";

function BackButton({ pathname, path, itemDetail }) {
  return (
    <div
      className={`mr-1 h-7 w-7 items-center justify-center rounded-full bg-slate-300 dark:bg-slate-200 ${
        pathname === `/${path}/${itemDetail.id}` ? "flex" : "hidden"
      }`}
    >
      <Link to={`/${path}/?type=${path}`}>
        <ArrowSmallRightIcon className="h-5 w-5 text-red-600" />
      </Link>
    </div>
  );
}

export default BackButton;
