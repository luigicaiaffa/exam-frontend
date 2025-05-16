import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataContextProvider } from "./assets/contexts/DataContext";
import DefaultLayout from "./assets/layout/DefaultLayout";
import CoursesIndex from "./assets/pages/Courses/CoursesIndex";
import CourseShow from "./assets/pages/Courses/CourseShow";
import ExamsIndex from "./assets/pages/Exams/ExamsIndex";
import ExamShow from "./assets/pages/Exams/ExamShow";
import GradesIndex from "./assets/pages/Grades/GradesIndex";
import NotFound from "./assets/pages/NotFound";
import HomePage from "./assets/pages/HomePage";

function App() {
  return (
    <DataContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path="courses" element={<CoursesIndex />} />
              <Route path="courses/:id" element={<CourseShow />} />
              <Route path="courses/*" element={<NotFound />} />
              <Route path="exams" element={<ExamsIndex />} />
              <Route path="exams/:id" element={<ExamShow />} />
              <Route path="exams/*" element={<NotFound />} />
              <Route path="grades" element={<GradesIndex />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataContextProvider>
  );
}

export default App;
