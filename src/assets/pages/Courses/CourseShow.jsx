import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import NotFound from "../NotFound";

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

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return (
      date.toLocaleDateString("it-IT") +
      " " +
      date.toLocaleTimeString("it-IT", { hour: "2-digit", minute: "2-digit" })
    );
  }

  useEffect(() => {
    fetchCourseData();
  }, []);

  if (!course) return <NotFound />;

  return (
    <>
      <div className="card courseCards h-100">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center pageTitle mb-4">
            <h1 className="fw-bold">{course && course.name}</h1>
            <div className="d-flex gap-2">
              <Link className="btn btn-sm btn-outline-success disabled px-3">
                <i className="fa-solid fa-pen"></i>
              </Link>
              <button className="btn btn-sm btn-danger disabled px-3">
                <i className="fa-solid fa-trash"></i>
              </button>
              <Link onClick={() => navigate(-1)}>
                <button className="btn btn-sm btn-success">
                  <i className="fa-solid fa-backward mx-2"></i>
                </button>
              </Link>
            </div>
          </div>

          <div>
            <ul className="list-group list-group-flush">
              {/* Course State */}
              <li className="list-group-item d-flex align-items-center justify-content-between my-2">
                <h5 className="fw-bold">Stato esame</h5>
                <div>
                  {course && course.isOptional && (
                    <span className="fs-6 badge text-secondary me-2">
                      <i className="fa-solid fa-tag"></i>
                    </span>
                  )}
                  <span
                    className={
                      course && course.isPassed
                        ? "fs-6 badge bg-success px-3"
                        : "fs-6 badge bg-warning px-3"
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
                    {course.exams &&
                      course.exams
                        .filter((exam) => exam.grade && exam.grade.value)
                        .map((exam) => (
                          <span key={exam.id} className="fs-5">
                            {exam.grade.value}
                          </span>
                        ))}
                  </div>
                </li>
              )}

              {/* CFU */}
              <li className="list-group-item d-flex align-items-center justify-content-between my-2">
                <h5 className="fw-bold">CFU</h5>
                <span className="fs-5">{course && course.cfu}</span>
              </li>

              {/* CourseYear */}
              <li className="list-group-item d-flex align-items-center justify-content-between my-2">
                <h5 className="fw-bold">Anno del corso</h5>
                <span className="fs-5">{course && course.courseYear}</span>
              </li>

              {/* Exams List */}
              <li className="list-group-item my-2">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="fw-bold">Appelli</h5>
                  {course && !course.isPassed && (
                    <div>
                      <Link className="btn btn-sm btn-outline-success disabled">
                        <i className="fa-solid fa-plus"></i> Appello
                      </Link>
                    </div>
                  )}
                </div>
                {course && course.exams.length !== 0 ? (
                  <div>
                    <ul className="list-group list-group-flush">
                      {course.exams.length !== 0 &&
                        course.exams.map((exam) => {
                          return (
                            <li
                              key={exam.id}
                              className="list-group-item d-flex justify-content-between align-items-center examList"
                            >
                              <div>
                                <div className="h5">
                                  <span>{formatDate(exam.date)}</span>
                                  <br />
                                  <span>{exam.location}</span>
                                  <br />
                                </div>
                                {exam.grade && (
                                  <span className="badge bg-success px-3">
                                    {exam.grade.value}
                                  </span>
                                )}
                                {!exam.grade && !exam.isCancelled && (
                                  <div>
                                    <span className="disabled btn btn-warning btn-sm badge">
                                      <i className="fa-solid fa-plus"></i> Voto
                                    </span>
                                  </div>
                                )}
                                {exam.isCancelled && (
                                  <span className="badge bg-danger">
                                    Annullato
                                  </span>
                                )}
                              </div>

                              <div className="d-flex flex-column gap-1">
                                <Link
                                  className="btn btn-sm btn-outline-success px-2"
                                  to={"/exams/" + exam.id}
                                >
                                  <i className="fa-solid fa-eye"></i>
                                </Link>
                                <Link className="btn btn-sm btn-outline-success disabled px-2">
                                  <i className="fa-solid fa-pen"></i>
                                </Link>
                                <button className="btn btn-sm btn-outline-danger disabled px-2">
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
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">Aggiungi un appello</li>
                    </ul>
                  </div>
                )}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
