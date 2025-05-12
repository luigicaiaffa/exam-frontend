import { Link } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";

export default function DashBoard() {
  const { guest, averages } = useDataContext();

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

  return (
    <div className="row g-4 my-4">
      <div className="col-12 col-lg-7">
        <div className="card homeUpperCards">
          <div className="card-body">
            <div>
              <h3 className="card-title fw-bold">
                {guest.name} {guest.surname}
              </h3>

              <hr />

              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <span className="card-subtitle text-body-secondary">
                    Numero di matricola
                  </span>
                  <div className="ms-2">- {guest.username}</div>
                </li>
                <li className="list-group-item">
                  <span className="card-subtitle text-body-secondary">
                    Corso di Laurea
                  </span>
                  <div className="ms-2">- {guest.degreeCourse}</div>
                </li>
                <li className="list-group-item">
                  <span className="card-subtitle text-body-secondary">
                    Totale CFU
                  </span>
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
      </div>

      <div className="col-12 col-lg-5">
        <div className="card homeUpperCards">
          <div className="card-body">
            <div className="d-flex justify-content-between card-title">
              <h4 className="fw-semibold mb-0">Prossimi esami</h4>
              <div className="fs-6 badge bg-warning">
                <i className="fa-solid fa-book-open"></i>
              </div>
            </div>

            <hr />

            <div className="upperCardsExam">
              <ul className="list-group list-group-flush">
                {examsToDo.length !== 0 ? (
                  examsToDo
                    .sort((a, b) => new Date(a.date) - new Date(b.date))
                    .map((exam) => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <Link
                              to={"/courses/" + getCourseFromExam(exam.id)?.id}
                            >
                              <i className="fa-solid fa-angle-right me-2"></i>
                              {getCourseFromExam(exam.id)?.name || "Nome Corso"}
                            </Link>
                            <div className="text-body-secondary ms-3">
                              {exam.date}
                            </div>

                            <div className="text-body-secondary ms-3">
                              {exam.location}
                            </div>
                          </div>

                          <a className="disabled btn btn-warning btn-sm badge">
                            <i className="fa-solid fa-plus"></i> Voto
                          </a>
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
            <div className="d-flex justify-content-between card-title">
              <h4 className="fw-semibold mb-0">Cerca corso</h4>
              <div className="fs-6 badge bg-dark">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>

            <hr />

            {/* <form th:action="@{/courses}" method="GET">
                  <div className="input-group my-5">
                    <label></label>
                    <input
                      type="text"
                      th:value="${name}"
                      name="name"
                      placeholder="Cerca per nome"
                      className="form-control"
                    />
                  </div>

                  <div className="input-group my-5">
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      th:value="${year}"
                      name="year"
                    >
                      <option selected th:value="0">
                        Anno accademico
                      </option>
                      <option
                        th:each="year : ${coursesYears}"
                        th:value="${year}"
                      >
                        [[${year}]]
                      </option>
                    </select>
                  </div>

                  <div className="my-5">
                    <button
                      type="submit"
                      className="btn btn-sm btn-outline-secondary w-100"
                    >
                      Cerca corso
                    </button>
                  </div>
                </form> */}
          </div>
        </div>
      </div>

      <div className="col-12 col-lg-7 ">
        <div className="card homeLowerCards">
          <div className="card-body">
            <div className="d-flex justify-content-between card-title">
              <h4 className="fw-semibold mb-0">Percorso studente</h4>
              <div className="fs-6 badge bg-success">
                <i className="fa-solid fa-book"></i>
              </div>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center pb-1 mb-2 border-bottom">
              <h6>Media ponderata</h6>
              <span className="h5">{averages ? averages.weighted : 0}</span>
            </div>

            <div className="d-flex justify-content-between align-items-center pb-1 mb-2 border-bottom">
              <h6>Esami svolti</h6>
              <span className="h5">{examsPassed.length}</span>
            </div>

            <div className="lowerCardsExam py-2">
              <ul className="list-group list-group-flush">
                {examsPassed.length !== 0 ? (
                  examsPassed
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((exam) => {
                      return (
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                          <div>
                            <Link
                              to={"/courses/" + getCourseFromExam(exam.id)?.id}
                            >
                              <i className="fa-solid fa-angle-right me-2"></i>
                              {getCourseFromExam(exam.id)?.name || "Nome Corso"}
                            </Link>
                            <div className="text-body-secondary ms-3">
                              {exam.date}
                            </div>

                            <div className="text-body-secondary ms-3">
                              {getCourseFromExam(exam.id)?.cfu || "CFU"} CFU
                            </div>
                          </div>

                          <div className="text-bg-success border-success px-2 py-1 rounded">
                            {exam.grade.value === 30
                              ? exam.grade.value + "L"
                              : exam.grade.value}
                          </div>
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
