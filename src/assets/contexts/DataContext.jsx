import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = ({ children }) => {
  const INDEX = import.meta.env.VITE_API_INDEX;
  const AVERAGES = import.meta.env.VITE_API_AVERAGES;

  function fetchGuestData() {
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

  function fetchGuestAverages() {
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
    guest: {
      courses: [],
    },
    averages: [],
  });

  useEffect(() => {
    fetchGuestAverages();
    fetchGuestData();
  }, []);

  return (
    <DataContext.Provider value={guestData}>{children}</DataContext.Provider>
  );
};
