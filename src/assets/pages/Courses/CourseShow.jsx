import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CourseShow() {
  const [course, setCourse] = useState();
  const { id: courseId } = useParams();
  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_COURSE_INDEX + "/" + courseId;

  function fetchCourseData() {
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setCourse(data));
  }

  useEffect(() => {
    fetchCourseData();
  }, []);

  return (
    <>
      <div className="mt-5 d-flex justify-content-between align-items-center">
        <h1 className="fw-bold">{course && course.name}</h1>
        <div className="d-flex gap-2">
          <Link className="btn btn-sm btn-dark disabled">
            <i className="fa-solid fa-pen"></i>
          </Link>
          <button className="btn btn-sm btn-danger disabled">
            <i className="fa-solid fa-trash"></i>
          </button>
          <Link onClick={() => navigate(-1)}>
            <button className="btn btn-sm btn-dark">
              <i className="fa-solid fa-backward mx-2"></i>
            </button>
          </Link>
        </div>
      </div>

      <hr />

      <div>
        <ul className="list-group list-group-flush">
          {/* Course State */}
          <li className="list-group-item d-flex align-items-center justify-content-between my-2">
            <h5 className="fw-bold">Stato esame</h5>
            <div>
              {course && course.isOptional && (
                <span className="fs-6 badge bg-secondary me-2">
                  <i className="fa-solid fa-tag"></i>
                </span>
              )}
              <span
                className={
                  course && course.isPassed
                    ? "fs-6 badge bg-success"
                    : "fs-6 badge bg-warning"
                }
              >
                <i
                  className={
                    course && course.isPassed
                      ? "fa-solid fa-check"
                      : "fa-solid fa-book-open"
                  }
                ></i>
              </span>
            </div>
          </li>

          {/* Grade */}
          {course && course.isPassed && (
            <li className="list-group-item d-flex align-items-center justify-content-between my-2">
              <h5 className="fw-bold">Voto</h5>
              <div>
                {course.exams.lenght !== 0 &&
                  course.exams.map((exam) => {
                    exam.grade && (
                      <i key={exam.id} className="fa-solid">
                        {exam.grade.value}
                      </i>
                    );
                  })}
              </div>
            </li>
          )}

          {/* CFU */}
          <li className="list-group-item d-flex align-items-center justify-content-between my-2">
            <h5 className="fw-bold">CFU</h5>
            <i className="fa-solid">{course && course.cfu}</i>
          </li>

          {/* CourseYear */}
          <li className="list-group-item d-flex align-items-center justify-content-between my-2">
            <h5 className="fw-bold">Anno del corso</h5>
            <i className="fa-solid">{course && course.courseYear}</i>
          </li>

          {/* Exams List */}
          <li className="list-group-item my-2">
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold">Appelli</h5>
              {course && course.isPassed && (
                <div>
                  <Link className="btn btn-sm btn-outline-secondary disabled">
                    <i className="fa-solid fa-plus"></i> Appello
                  </Link>
                </div>
              )}
            </div>
            {course && course.exams.lenght !== 0 ? (
              <div th:if="${course.exams.size() != 0}">
                <ul className="list-group list-group-flush">
                  {course.exams.lenght !== 0 &&
                    course.exams.map((exam) => {
                      return (
                        <li
                          key={exam.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <Link
                              to={"/exams/" + exam.id}
                              className="showExamLink"
                            >
                              <span>{exam.date}</span>
                              <br />
                              <span>{exam.location}</span>
                              <br />
                            </Link>
                            {exam.grade && (
                              <span className="badge bg-success">
                                {exam.grade.value}
                              </span>
                            )}
                            {!exam.grade && !exam.isCancelled && (
                              <div>
                                <span className="disabled btn btn-warning btn-sm badge">
                                  <i className="fa-solid fa-plus me-2"></i>
                                  Voto
                                </span>
                              </div>
                            )}
                            {exam.isCancelled && (
                              <span className="badge bg-danger">Annullato</span>
                            )}
                          </div>

                          <div className="d-flex flex-column gap-1">
                            <Link className="btn btn-sm btn-outline-secondary disabled">
                              <i className="fa-solid fa-pen"></i>
                            </Link>
                            <button className="btn btn-sm btn-danger disabled">
                              <i className="fa-solid fa-trash"></i>
                            </button>
                          </div>
                        </li>
                      );
                    })}
                </ul>
              </div>
            ) : (
              <div>
                <p>Aggiungi un appello</p>
              </div>
            )}
          </li>
        </ul>
      </div>
    </>
  );
}
