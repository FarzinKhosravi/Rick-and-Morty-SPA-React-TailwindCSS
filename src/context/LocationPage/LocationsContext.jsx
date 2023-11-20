import { createContext, useContext, useState } from "react";

const LocationsContext = createContext();
const LocationsDispatcherContext = createContext();

function LocationsProvider({ children }) {
  const [locations, setLocations] = useState([]);

  return (
    <LocationsContext.Provider value={locations}>
      <LocationsDispatcherContext.Provider value={setLocations}>
        {children}
      </LocationsDispatcherContext.Provider>
    </LocationsContext.Provider>
  );
}

export default LocationsProvider;

export const useLocations = () => useContext(LocationsContext);
export const useLocationsDispatch = () =>
  useContext(LocationsDispatcherContext);
