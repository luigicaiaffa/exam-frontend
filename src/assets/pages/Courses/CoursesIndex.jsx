import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";
import { useState } from "react";

export default function CoursesIndex() {
  const { guest } = useDataContext();

  const navigate = useNavigate();

  const location = useLocation();

  const { courseName, courseYear } = location.state || "";

  const [filter, setFilter] = useState({
    courseName: courseName || "",
    courseYear: courseYear || "0",
  });

  const handleInputChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const filteredCourses =
    guest.courses &&
    guest.courses.filter((course) => {
      const nameMatch = filter.courseName
        ? course.name.toLowerCase().includes(filter.courseName.toLowerCase())
        : true;

      const yearMatch =
        filter.courseYear && filter.courseYear !== "0"
          ? course.courseYear === Number(filter.courseYear)
          : true;

      return nameMatch && yearMatch;
    });

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("it-IT") +
      " " +
      date.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })
    );
  }

  const coursesYears =
    guest.courses &&
    Array.from(new Set(guest.courses.map((course) => course.courseYear)));

  return (
    <>
      <div className="card my-5 coursesSection">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center my-3 pageTitle">
            <div>
              <h1 className="fw-bold">CORSI</h1>
            </div>
            <div className="d-flex gap-2">
              <Link className="btn btn-sm btn-success disabled">
                <i className="fa-solid fa-plus"></i> Registra Corso
              </Link>
              <Link onClick={() => navigate(-1)}>
                <button className="btn btn-sm btn-success">
                  <i className="fa-solid fa-backward mx-2"></i>
                </button>
              </Link>
            </div>
          </div>

          <div className="mb-3">
            <form onSubmit={handleSubmit}>
              <div className="input-group input-group-sm">
                <input
                  placeholder="Cerca per nome"
                  type="text"
                  className="w-50 form-control"
                  name="courseName"
                  onChange={handleInputChange}
                  value={filter.courseName}
                />

                <select
                  className="form-select"
                  name="courseYear"
                  value={filter.courseYear}
                  onChange={handleInputChange}
                >
                  <option value="0">Anno accademico</option>
                  {coursesYears &&
                    coursesYears.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                </select>

                <button
                  className="btn btn-sm btn-outline-success"
                  onClick={() => setFilter({ courseName: "", courseYear: "0" })}
                >
                  <i className="fa-solid fa-rotate-left"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-5 mb-5">
        {filteredCourses && filteredCourses.length !== 0 ? (
          filteredCourses
            .sort((a, b) => b.courseYear - a.courseYear)
            .sort((a, b) => a.isPassed - b.isPassed)
            .map((course) => {
              return (
                <div className="col" key={course.id}>
                  <div className="card courseCards">
                    <div className="card-header cardsTitle">
                      <Link
                        to={"/courses/" + course.id}
                        className="d-flex justify-content-between align-items-center"
                      >
                        <h5 className="fw-bold m-0 text-success">
                          <i className="fa-solid fa-angle-right me-2"></i>
                          {course.name}
                        </h5>
                        <div>
                          {course.isOptional && (
                            <span className="fs-6 badge text-secondary me-2">
                              <i className="fa-solid fa-tag"></i>
                            </span>
                          )}
                          <span
                            className={
                              course.isPassed
                                ? "fs-6 badge px-3 bg-success"
                                : "fs-6 badge px-3 bg-warning"
                            }
                          >
                            <i
                              className={
                                course.isPassed
                                  ? "fa-solid fa-check"
                                  : "fa-solid fa-book-open"
                              }
                            ></i>
                          </span>
                        </div>
                      </Link>
                    </div>
                    <div className="card-body">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item d-flex justify-content-between">
                          <span className="fw-bold">CFU</span>
                          <span>{course.cfu}</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                          <span className="fw-bold">Anno</span>
                          <span>{course.courseYear}</span>
                        </li>
                        <li className="list-group-item">
                          <div className="d-flex justify-content-between align-items-center mb-2">
                            <div className="fw-bold">Appelli</div>
                            <div>
                              {!course.isPassed && (
                                <Link className="btn btn-sm btn-outline-success disabled">
                                  <i className="fa-solid fa-plus"></i> Appello
                                </Link>
                              )}
                            </div>
                          </div>

                          <div className="courseCardsExam">
                            <ul className="list-group list-group-flush">
                              {course.exams && course.exams.length !== 0 ? (
                                course.exams
                                  .sort(
                                    (a, b) =>
                                      new Date(b.date) - new Date(a.date)
                                  )
                                  .map((exam) => {
                                    return (
                                      <li
                                        className="list-group-item d-flex justify-content-between align-items-center"
                                        key={exam.id}
                                      >
                                        <div>
                                          <span>{formatDate(exam.date)}</span>
                                          <br />
                                          <span>{exam.location}</span>
                                          <br />
                                          {exam.grade && (
                                            <span className="badge text-bg-success px-3">
                                              {exam.grade.value}
                                            </span>
                                          )}
                                          {!exam.grade && !exam.isCancelled && (
                                            <div>
                                              <Link className="disabled btn btn-warning btn-sm badge">
                                                <i className="fa-solid fa-plus me-2"></i>
                                                Voto
                                              </Link>
                                            </div>
                                          )}
                                          {exam.isCancelled && (
                                            <span className="badge bg-danger">
                                              Annullato
                                            </span>
                                          )}
                                        </div>
                                        <div>
                                          <Link
                                            className="btn btn-sm btn-outline-success"
                                            to={"/exams/" + exam.id}
                                          >
                                            <i className="fa-solid fa-eye"></i>
                                          </Link>
                                        </div>
                                      </li>
                                    );
                                  })
                              ) : (
                                <li class="list-group-item">
                                  Aggiungi un appello
                                </li>
                              )}
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="card-footer cardsFooter d-flex justify-content-end gap-2">
                      <Link className="btn btn-sm btn-outline-success disabled px-3">
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                      <button className="btn btn-sm btn-danger disabled px-3">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="card coursesSection">
            <div className="card-body">
              <p>Nessun corso registrato</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
