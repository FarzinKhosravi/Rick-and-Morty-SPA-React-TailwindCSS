import { useEffect } from "react";
import { usePageId, usePageIdDispatch } from "../context/PageIdContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import saveLocalStorage from "../localStorage/saveLocalStorage";

function Pagination() {
  const pageId = usePageId();
  const setPageId = usePageIdDispatch();

  useEffect(() => {
    saveLocalStorage("PAGE_ID", pageId);
  }, [pageId]);

  const nextPageHandler = () => {
    if (pageId === 3) return;

    setPageId((prevPageId) => prevPageId + 1);
  };

  const previousPageHandler = () => {
    if (pageId === 1) return;

    setPageId((prevPageId) => prevPageId - 1);
  };

  return (
    <div>
      <div className="rounded-3xl bg-slate-400/50 p-3 dark:bg-slate-800/50">
        <div className="flex items-center justify-between rounded-full bg-slate-100 p-4 dark:bg-slate-900">
          <div className="flex h-7 w-9 items-center justify-center rounded-full">
            <button
              disabled={pageId === 1 ? true : false}
              className="block"
              onClick={previousPageHandler}
            >
              <ChevronLeftIcon
                className={`h-5 w-5 text-red-600 ${
                  pageId === 1 ? "text-slate-800 dark:text-slate-300" : ""
                }`}
              />
            </button>
          </div>
          <div className="flex w-full items-center justify-evenly">
            <span
              onClick={() => setPageId(1)}
              className={`block h-7 w-7 cursor-pointer text-center font-semibold text-slate-900 dark:bg-slate-900/50 dark:text-slate-300 ${
                pageId === 1 ? "text-yellow-500 dark:text-yellow-400" : ""
              }`}
            >
              1
            </span>
            <span
              onClick={() => setPageId(2)}
              className={`block h-7 w-7 cursor-pointer text-center font-semibold text-slate-900 dark:bg-slate-900/50 dark:text-slate-300 ${
                pageId === 2 ? "text-yellow-500 dark:text-yellow-400" : ""
              }`}
            >
              2
            </span>
            <span
              onClick={() => setPageId(3)}
              className={`block h-7 w-7 cursor-pointer text-center font-semibold text-slate-900 dark:bg-slate-900/50 dark:text-slate-300 ${
                pageId === 3 ? "text-yellow-500 dark:text-yellow-400" : ""
              }`}
            >
              3
            </span>
          </div>
          <div className="flex h-7 w-9 items-center justify-center rounded-full dark:bg-slate-900/50">
            <button
              disabled={pageId === 3 ? true : false}
              className="block"
              onClick={nextPageHandler}
            >
              <ChevronRightIcon
                className={`h-5 w-5 text-red-600 ${
                  pageId === 3 ? "text-slate-800 dark:text-slate-300" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
