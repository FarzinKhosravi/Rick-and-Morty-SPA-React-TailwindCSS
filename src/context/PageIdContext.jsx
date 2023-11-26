import { createContext, useContext, useState } from "react";
import getLocalStorage from "./../localStorage/getLocalStorage";

const PageIdContext = createContext();
const PageIdDispatcherContext = createContext();

function PageIdProvider({ children }) {
  const [pageId, setPageId] = useState(getLocalStorage("PAGE_ID") || 1);

  return (
    <PageIdContext.Provider value={pageId}>
      <PageIdDispatcherContext.Provider value={setPageId}>
        {children}
      </PageIdDispatcherContext.Provider>
    </PageIdContext.Provider>
  );
}

export default PageIdProvider;

export const usePageId = () => useContext(PageIdContext);
export const usePageIdDispatch = () => {
  const pageId = useContext(PageIdContext);
  const setPageId = useContext(PageIdDispatcherContext);

  const nextPageHandler = () => {
    if (pageId === 3) return;

    setPageId((prevPageId) => prevPageId + 1);
  };

  const previousPageHandler = () => {
    if (pageId === 1) return;

    setPageId((prevPageId) => prevPageId - 1);
  };

  return { nextPageHandler, previousPageHandler, setPageId };
};
