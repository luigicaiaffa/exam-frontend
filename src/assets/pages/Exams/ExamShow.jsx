import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";
import NotFound from "../NotFound";

export default function ExamShow() {
  const { guest } = useDataContext();
  
  const [exam, setExam] = useState();

  const { id: examId } = useParams();

  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_EXAM_INDEX + "/" + examId;

  function fetchExamData() {
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setExam(data));
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
    fetchExamData();
  }, []);

  function getCourseFromExam(examId) {
    if (!guest.courses) return null;

    for (const course of guest.courses) {
      if (course.exams && course.exams.some((exam) => exam.id === examId)) {
        return course;
      }
    }

    return null;
  }

  if (!exam) return <NotFound />;

  return (
    <>
      <div className="card examsCard">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center pageTitle mb-4">
            <h1 className="fw-bold">APPELLO</h1>
            <div className="d-flex gap-2">
              <Link className="btn btn-sm btn-outline-success px-3 disabled">
                <i className="fa-solid fa-pen"></i>
              </Link>
              <button className="btn btn-sm btn-danger px-3 disabled">
                <i className="fa-solid fa-trash"></i>
              </button>
              <Link onClick={() => navigate(-1)}>
                <button className="btn btn-sm btn-success px-3">
                  <i className="fa-solid fa-backward"></i>
                </button>
              </Link>
            </div>
          </div>

          <div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item list-group-item-action my-2">
                <Link
                  to={"/courses/" + getCourseFromExam(exam && exam.id)?.id}
                  className="d-flex align-items-center justify-content-between"
                >
                  <h5 className="fw-bold">Corso</h5>
                  <div className="fs-5">
                    {getCourseFromExam(exam && exam.id)?.name}
                  </div>
                </Link>
              </li>
              <li className="list-group-item d-flex align-items-center justify-content-between my-2">
                <h5 className="fw-bold">Data</h5>
                <div className="fs-5">{exam && formatDate(exam.date)}</div>
              </li>
              <li className="list-group-item d-flex align-items-center justify-content-between my-2">
                <h5 className="fw-bold">Luogo</h5>
                <div className="fs-5">{exam && exam.location}</div>
              </li>
              <li className="list-group-item d-flex align-items-center justify-content-between my-2">
                <h5 className="fw-bold">Esito</h5>
                <div className="fs-5">
                  {exam && exam.grade && (
                    <div className="badge bg-success px-3">
                      {exam.grade.value}
                    </div>
                  )}
                  {exam && !exam.grade && !exam.isCancelled && (
                    <div>
                      <span className="disabled btn btn-warning btn-sm">
                        <i className="fa-solid fa-plus me-2"></i>
                        Voto
                      </span>
                    </div>
                  )}
                  {exam && exam.isCancelled && (
                    <div className="badge bg-danger">Annullato</div>
                  )}
                </div>
              </li>
              {exam && exam.notes ? (
                <li className="list-group-item my-2">
                  <h5 className="fw-bold">Note</h5>
                  <div className="ms-4">{exam && exam.notes}</div>
                </li>
              ) : (
                <li className="list-group-item d-flex align-items-center justify-content-between my-2">
                  <div>
                    <a>
                      <i className="fa-solid fa-plus"></i> Aggiungi una nota al
                      tuo appello
                    </a>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
