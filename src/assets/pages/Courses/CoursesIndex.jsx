import { Link } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";

export default function CoursesIndex() {
  const { guest } = useDataContext();

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
        <div>
          <h1 className="fw-bold">CORSI</h1>
        </div>
        <div className="d-flex gap-2">
          <Link className="btn btn-sm btn-dark disabled">
            <i className="fa-solid fa-plus"></i> Registra Corso
          </Link>
          <Link onClick={() => navigate(-1)}>
            <button className="btn btn-sm btn-dark">
              <i className="fa-solid fa-backward mx-2"></i>
            </button>
          </Link>
        </div>
      </div>

      <div>
        {/* <form th:action="@{/courses}" method="GET">
          <div className="input-group input-group-sm">
            <input
              type="text"
              th:value="${name}"
              name="name"
              placeholder="Cerca per nome"
              className="w-50 form-control"
            />

            <select
              className="form-select"
              aria-label="Default select example"
              th:value="${year}"
              name="year"
            >
              <option selected th:value="0">
                Anno accademico
              </option>
              <option th:each="year : ${coursesYears}" th:value="${year}">
                [[${year}]]
              </option>
            </select>

            <button type="submit" className="btn btn-sm btn-dark">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <a className="btn btn-sm btn-dark" th:href="@{/courses}">
              <i className="fa-solid fa-rotate-left"></i>
            </a>
          </div>
          <div className="input-group input-group-sm"></div>
        </form> */}
      </div>

      <hr className="mb-4" />

      <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 g-4 mb-5">
        {guest.courses && guest.courses.lenght !== 0 ? (
          guest.courses
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
                        <h5 className="fw-bold m-0">
                          <i className="fa-solid fa-angle-right me-2"></i>
                          {course.name}
                        </h5>
                        <div>
                          {course.isOptional && (
                            <span className="fs-6 badge bg-secondary me-2">
                              <i className="fa-solid fa-tag"></i>
                            </span>
                          )}
                          <span
                            className={
                              course.isPassed
                                ? "fs-6 badge bg-success"
                                : "fs-6 badge bg-warning"
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
                          <div className="d-flex justify-content-between align-items-center my-1">
                            <div className="fw-bold">Appelli</div>
                            <div>
                              {!course.isPassed && (
                                <Link className="btn btn-sm btn-outline-secondary disabled">
                                  <i className="fa-solid fa-plus"></i> Appello
                                </Link>
                              )}
                            </div>
                          </div>

                          <div className="courseCardsExam">
                            <ul className="list-group list-group-flush">
                              {course.exams && course.exams.lenght !== 0 ? (
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
                                          <span>{exam.date}</span>
                                          <br />
                                          <span>{exam.location}</span>
                                          <br />
                                          {exam.grade && (
                                            <span className="badge bg-success">
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
                                            className="btn btn-sm btn-outline-secondary"
                                            to={"/exams/" + exam.id}
                                          >
                                            <i className="fa-solid fa-eye"></i>
                                          </Link>
                                        </div>
                                      </li>
                                    );
                                  })
                              ) : (
                                <div>
                                  <p>Aggiungi un appello</p>
                                </div>
                              )}
                            </ul>
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="card-footer d-flex justify-content-end gap-2">
                      <Link className="btn btn-sm btn-dark disabled">
                        <i className="fa-solid fa-pen"></i>
                      </Link>
                      <button className="btn btn-sm btn-danger disabled">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
        ) : (
          <div className="m-3">
            <p>Nessun corso registrato</p>
          </div>
        )}
      </div>
    </>
  );
}
