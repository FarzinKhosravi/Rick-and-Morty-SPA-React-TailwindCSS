import { useEffect } from "react";
import { usePageId, usePageIdDispatch } from "../context/PageIdContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import saveLocalStorage from "../localStorage/saveLocalStorage";

function Pagination() {
  const pageId = usePageId();

  const { nextPageHandler, previousPageHandler, setPageId } =
    usePageIdDispatch();

  useEffect(() => {
    saveLocalStorage("PAGE_ID", pageId);
  }, [pageId]);

  return (
    <div>
      <div className="rounded-3xl bg-slate-400/50 p-3 dark:bg-slate-800/50">
        <div className="flex items-center justify-between rounded-full bg-slate-100 p-4 dark:bg-slate-900">
          <PagesButton pageNumber="1" onPage={previousPageHandler}>
            <ChevronLeftIcon />
          </PagesButton>
          <div className="flex w-full items-center justify-evenly">
            <PageNumber pageId={pageId} setPageId={setPageId} pageNumber="1" />
            <PageNumber pageId={pageId} setPageId={setPageId} pageNumber="2" />
            <PageNumber pageId={pageId} setPageId={setPageId} pageNumber="3" />
          </div>
          <PagesButton pageNumber="3" onPage={nextPageHandler}>
            <ChevronRightIcon />
          </PagesButton>
        </div>
      </div>
    </div>
  );
}

export default Pagination;

function PagesButton({ children, pageNumber, onPage }) {
  const pageId = usePageId();

  return (
    <div className="flex h-7 w-9 items-center justify-center rounded-full">
      <button
        disabled={pageId === Number(pageNumber) ? true : false}
        className="block"
        onClick={onPage}
      >
        <div
          className={`h-5 w-5 text-red-600 ${
            pageId === Number(pageNumber)
              ? "text-slate-800 dark:text-slate-300"
              : ""
          }`}
        >
          {children}
        </div>
      </button>
    </div>
  );
}

function PageNumber({ pageId, setPageId, pageNumber }) {
  return (
    <span
      onClick={() => setPageId(Number(pageNumber))}
      className={`block h-7 w-7 cursor-pointer text-center font-semibold text-slate-900 dark:bg-slate-900/50 dark:text-slate-300 ${
        pageId === Number(pageNumber)
          ? "text-yellow-500 dark:text-yellow-400"
          : ""
      }`}
    >
      {pageNumber}
    </span>
  );
}
