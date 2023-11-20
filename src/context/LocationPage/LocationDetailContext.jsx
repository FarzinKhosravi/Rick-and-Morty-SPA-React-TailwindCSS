import { createContext, useContext, useState } from "react";

const LocationDetailContext = createContext();
const LocationDetailDispatcherContext = createContext();

function LocationDetailProvider({ children }) {
  const [locationDetail, setLocationDetail] = useState(null);

  return (
    <LocationDetailContext.Provider value={locationDetail}>
      <LocationDetailDispatcherContext.Provider value={setLocationDetail}>
        {children}
      </LocationDetailDispatcherContext.Provider>
    </LocationDetailContext.Provider>
  );
}

export default LocationDetailProvider;

export const useLocationDetail = () => useContext(LocationDetailContext);
export const useLocationDetailDispatch = () =>
  useContext(LocationDetailDispatcherContext);
