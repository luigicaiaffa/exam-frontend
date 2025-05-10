import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataContextProvider } from "./assets/contexts/DataContext";
import DefaultLayout from "./assets/layout/DefaultLayout";
import HomePage from "./assets/pages/HomePage";

function App() {
  return (
    <DataContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="courses" />
              <Route path="courses/:id" />
              <Route path="exams" />
              <Route path="exams/:id" />
              <Route path="grades" />
              <Route path="user" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </DataContextProvider>
  );
}

export default App;
