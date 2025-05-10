import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = ({ children }) => {
  const INDEX = import.meta.env.VITE_API_INDEX;
  const AVERAGES = import.meta.env.VITE_API_AVERAGES;

  function fetchData() {
    fetch(INDEX, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGuestData((guestData) => ({ ...guestData, guest: data }));
      });
  }

  function fetchAverages() {
    fetch(AVERAGES, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGuestData((guestData) => ({ ...guestData, averages: data }));
      });
  }

  const [guestData, setGuestData] = useState({
    guest: [],
    averages: [],
  });

  useEffect(() => {
    fetchData();
    fetchAverages();
  }, []);

  return (
    <DataContext.Provider value={guestData}>{children}</DataContext.Provider>
  );
};
