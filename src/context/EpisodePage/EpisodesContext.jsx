import { createContext, useContext, useState } from "react";

const EpisodesContext = createContext();
const EpisodesDispatcherContext = createContext();

function EpisodesProvider({ children }) {
  const [episodes, setEpisodes] = useState([]);

  return (
    <EpisodesContext.Provider value={episodes}>
      <EpisodesDispatcherContext.Provider value={setEpisodes}>
        {children}
      </EpisodesDispatcherContext.Provider>
    </EpisodesContext.Provider>
  );
}

export default EpisodesProvider;

export const useEpisodes = () => useContext(EpisodesContext);
export const useEpisodesDispatch = () => useContext(EpisodesDispatcherContext);
