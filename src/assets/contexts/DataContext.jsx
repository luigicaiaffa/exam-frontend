import { createContext, useContext, useEffect, useState } from "react";

const DataContext = createContext();
export const useDataContext = () => useContext(DataContext);

export const DataContextProvider = ({ children }) => {
  const INDEX = import.meta.env.VITE_API_INDEX;

  function fetchData() {
    fetch(INDEX, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGuestData({ ...guestData, guest: data });
      });
  }

  const [guestData, setGuestData] = useState({
    guest: [],
    fetchData,
  });

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={guestData}>{children}</DataContext.Provider>
  );
};
