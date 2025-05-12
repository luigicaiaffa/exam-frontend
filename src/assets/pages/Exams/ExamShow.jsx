import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDataContext } from "../../contexts/DataContext";

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

  return (
    <>
      <div className="mt-5 d-flex justify-content-between align-items-center">
        <h1 className="fw-bold">APPELLO</h1>
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
          <li className="list-group-item list-group-item-action my-2">
            <a
              th:href="@{/courses/{id}(id = *{course.id})}"
              className="d-flex align-items-center justify-content-between"
            >
              <h5 className="fw-bold">Corso</h5>
              <div>{getCourseFromExam(exam && exam.id)?.name}</div>
            </a>
          </li>
          <li className="list-group-item d-flex align-items-center justify-content-between my-2">
            <h5 className="fw-bold">Data</h5>
            <div>{exam && exam.date}</div>
          </li>
          <li className="list-group-item d-flex align-items-center justify-content-between my-2">
            <h5 className="fw-bold">Luogo</h5>
            <div>{exam && exam.location}</div>
          </li>
          <li className="list-group-item d-flex align-items-center justify-content-between my-2">
            <h5 className="fw-bold">Esito</h5>
            <div>
              {exam && exam.grade && (
                <div className="badge bg-success">{el.grade.value}</div>
              )}
              {exam && !exam.grade && !exam.isCancelled && (
                <div>
                  <span className="disabled btn btn-warning btn-sm badge">
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
                  <i className="fa-solid fa-plus"></i> Aggiungi una nota al tuo
                  appello
                </a>
              </div>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
