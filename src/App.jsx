import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DataContextProvider } from "./assets/contexts/DataContext";
import DefaultLayout from "./assets/layout/DefaultLayout";
import CoursesIndex from "./assets/pages/Courses/CoursesIndex";
import DashBoard from "./assets/pages/DashBoard";
import CourseShow from "./assets/pages/Courses/CourseShow";
import ExamsIndex from "./assets/pages/Exams/ExamsIndex";
import ExamShow from "./assets/pages/Exams/ExamShow";
import GradesIndex from "./assets/pages/Grades/GradesIndex";

function App() {
  return (
    <DataContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<DefaultLayout />}>
            <Route path="/">
              <Route index element={<DashBoard />} />
              <Route path="courses" element={<CoursesIndex />} />
              <Route path="courses/:id" element={<CourseShow />} />
              <Route path="exams" element={<ExamsIndex />} />
              <Route path="exams/:id" element={<ExamShow />} />
              <Route path="grades" element={<GradesIndex />} />
              <Route path="user" />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </DataContextProvider>
  );
}

export default App;
