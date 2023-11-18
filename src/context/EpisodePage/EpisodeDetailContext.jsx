import { createContext, useContext, useState } from "react";

const EpisodeDetailContext = createContext();
const EpisodeDetailDispatcherContext = createContext();

function EpisodeDetailProvider({ children }) {
  const [episodeDetail, setEpisodeDetail] = useState(null);

  return (
    <EpisodeDetailContext.Provider value={episodeDetail}>
      <EpisodeDetailDispatcherContext.Provider value={setEpisodeDetail}>
        {children}
      </EpisodeDetailDispatcherContext.Provider>
    </EpisodeDetailContext.Provider>
  );
}

export default EpisodeDetailProvider;

export const useEpisodeDetail = () => useContext(EpisodeDetailContext);
export const useEpisodeDetailDispatch = () =>
  useContext(EpisodeDetailDispatcherContext);
