import { Link } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import { useState } from "react";

export default function HomePage() {
  const { guest, averages } = useDataContext();

  const [filter, setFilter] = useState({
    courseName: "",
    courseYear: "0",
  });

  const handleInputChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const examsToDo = [];
  const examsPassed = [];

  guest.courses &&
    guest.courses.forEach((course) => {
      course.exams &&
        course.exams.forEach((exam) => {
          if (!exam.isCancelled && !exam.grade) examsToDo.push(exam);
          if (!exam.isCancelled && exam.grade) examsPassed.push(exam);
        });
    });

  function getCourseFromExam(examId) {
    if (!guest.courses) return null;

    for (const course of guest.courses) {
      if (course.exams && course.exams.some((exam) => exam.id === examId)) {
        return course;
      }
    }

    return null;
  }

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
    <div className="row g-5">
      <div className="col-12 col-lg-7">
        <div className="card homeUpperCards">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3 homeTitle">
              <h3 className="card-title fw-bold">
                {guest.name} {guest.surname}
              </h3>
              <div>
                {/* <span className="badge fs-5 bg-success">
                  <i className="fa-solid fa-user"> </i>
                </span> */}
              </div>
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="card-subtitle text-secondary">
                  Numero di matricola
                </span>
                <div className="ms-2">- {guest.username}</div>
              </li>
              <li className="list-group-item">
                <span className="card-subtitle text-secondary">
                  Corso di Laurea
                </span>
                <div className="ms-2">- {guest.degreeCourse}</div>
              </li>
              <li className="list-group-item">
                <span className="card-subtitle text-secondary">Totale CFU</span>
                {averages.totalCfu == 0 ? (
                  <div className="ms-2">- {guest.totalCfu}</div>
                ) : (
                  <div className="ms-2">
                    - {averages.totalCfu} / {guest.totalCfu}
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div className="card homeUpperCards">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-3 homeTitle">
              <h3 className="fw-semibold card-title">Prossimi esami</h3>
              <div>
                <Link to={"/exams"} className="btn-sm btn btn-outline-success">
                  <i className="fa-solid fa-angles-right"></i>
                </Link>
              </div>
            </div>

            <div className="upperCardsExam">
              <ul className="list-group list-group-flush">
                {examsToDo.length !== 0 ? (
                  examsToDo
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((exam) => {
                      return (
                        <li
                          key={exam.id}
                          className="list-group-item list-group-item-action"
                        >
                          <div className="d-flex justify-content-between align-items-center">
                            <Link
                              to={"/courses/" + getCourseFromExam(exam.id)?.id}
                              className=" w-100"
                            >
                              <div>
                                <div className="fw-semibold">
                                  <i className="fa-solid fa-angle-right me-2"></i>
                                  {getCourseFromExam(exam.id)?.name ||
                                    "Nome Corso"}
                                </div>
                                <div className="ms-3">
                                  {formatDate(exam.date)}
                                </div>

                                <div className=" ms-3">{exam.location}</div>
                              </div>
                            </Link>

                            <a className="disabled btn btn-warning badge">
                              <i className="fa-solid fa-plus"></i> Voto
                            </a>
                          </div>
                        </li>
                      );
                    })
                ) : (
                  <div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item card-subtitle text-body-secondary">
                        Nessun appello registrato
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-5">
        <div className="card homeLowerCards">
          <div className="card-body">
            <div className="d-flex justify-content-between homeTitle mb-3">
              <h3 className="fw-semibold card-title">Cerca corso</h3>
              <div>
                <Link
                  to={"/courses"}
                  className="btn-sm btn btn-outline-success"
                >
                  <i className="fa-solid fa-angles-right"></i>
                </Link>
              </div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="input-group my-5">
                <input
                  type="text"
                  name="courseName"
                  placeholder="Cerca per nome"
                  className="form-control"
                  onChange={handleInputChange}
                  value={filter.courseName}
                />
              </div>

              <div className="input-group my-5">
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
              </div>

              <div className="my-5">
                <Link
                  to={`/courses`}
                  state={filter}
                  className="btn btn-success w-100"
                >
                  Cerca corso
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-7">
        <div className="card homeLowerCards">
          <div className="card-body">
            <div className="d-flex justify-content-between homeTitle mb-3">
              <h3 className="fw-semibold card-title">Percorso studente</h3>
              <div>
                <Link to={"/grades"} className="btn-sm btn btn-outline-success">
                  <i className="fa-solid fa-angles-right"></i>
                </Link>
              </div>
            </div>

            <ul className="list-group list-group-flush">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h6 className="m-0 fw-semibold">Media ponderata</h6>
                <span className="fs-5 m-0">
                  {averages ? averages.weighted : 0}
                </span>
              </li>

              <li className="list-group-item d-flex justify-content-between align-items-center">
                <h6 className="m-0 fw-semibold">Esami svolti</h6>
                <span className="fs-5 m-0">{examsPassed.length}</span>
              </li>
            </ul>

            <div className="lowerCardsExam py-2">
              <ul className="list-group list-group-flush">
                {examsPassed.length !== 0 ? (
                  examsPassed
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((exam) => {
                      return (
                        <li
                          key={exam.id}
                          className="list-group-item list-group-item-action"
                        >
                          <Link
                            to={"/courses/" + getCourseFromExam(exam.id)?.id}
                            className=" d-flex justify-content-between align-items-center"
                          >
                            <div>
                              <div className="fw-semibold">
                                <i className="fa-solid fa-angle-right me-2"></i>
                                {getCourseFromExam(exam.id)?.name ||
                                  "Nome Corso"}
                              </div>

                              <div className=" ms-3">
                                {formatDate(exam.date)}
                              </div>

                              <div className=" ms-3">
                                {getCourseFromExam(exam.id)?.cfu || "CFU"} CFU
                              </div>
                            </div>

                            <div className="text-bg-success border-success px-3 py-1 rounded">
                              {exam.grade.value === 30
                                ? exam.grade.value + "L"
                                : exam.grade.value}
                            </div>
                          </Link>
                        </li>
                      );
                    })
                ) : (
                  <li className="list-group-item card-subtitle text-body-secondary">
                    Nessun appello registrato
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
