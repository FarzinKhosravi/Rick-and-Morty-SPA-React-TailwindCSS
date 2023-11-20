import { createContext, useContext, useState } from "react";

const NotFoundContext = createContext();
const NotFoundDispatcherContext = createContext();

function NotFoundProvider({ children }) {
  const [notFound, setNotFound] = useState("");

  return (
    <NotFoundContext.Provider value={notFound}>
      <NotFoundDispatcherContext.Provider value={setNotFound}>
        {children}
      </NotFoundDispatcherContext.Provider>
    </NotFoundContext.Provider>
  );
}

export default NotFoundProvider;

export const useNotFound = () => useContext(NotFoundContext);
export const useNotFoundDispatch = () => useContext(NotFoundDispatcherContext);
