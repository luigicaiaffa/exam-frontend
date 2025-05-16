import { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import { Link, useNavigate } from "react-router-dom";

export default function GradesIndex() {
  const { guest, averages } = useDataContext();
  const [exams, setExams] = useState([]);

  const navigate = useNavigate();

  const url = import.meta.env.VITE_API_GRADE_INDEX;

  function fetchExamsData() {
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setExams(data));
  }

  useEffect(() => {
    fetchExamsData();
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

  console.log(exams && exams);

  return (
    <>
      <div className="card gradesCard">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center pageTitle mb-4">
            <div>
              <h1 className="fw-bold">VOTI</h1>
            </div>
            <div>
              <Link onClick={() => navigate(-1)}>
                <button className="btn btn-sm btn-success">
                  <i className="fa-solid fa-backward mx-2"></i>
                </button>
              </Link>
            </div>
          </div>

          <div className="text-center row mb-4 row-cols-1 row-cols-md-3 justify-content-around g-3">
            <div className="col py-1 averages">
              <div className="text-secondary">Media Aritmetica</div>
              <div className="fw-semibold fs-5">
                {averages && averages.arithmetic}
              </div>
            </div>

            <div className="col py-1 averages ">
              <div className="text-secondary">CFU</div>
              <div className="fw-semibold fs-5">
                {averages && averages.totalCfu ? (
                  <span>
                    {averages && averages.totalCfu} / {guest && guest.totalCfu}
                  </span>
                ) : (
                  <span>0 / {guest && guest.totalCfu}</span>
                )}
              </div>
            </div>

            <div className="col py-1 averages">
              <div className="text-secondary">Media Ponderata</div>
              <div className="fw-semibold fs-5">
                {averages && averages.weighted}
              </div>
            </div>
          </div>

          <div>
            <div className="my-3">
              <div className="list-group list-group-flush">
                {exams ? (
                  exams.map((exam) => {
                    return (
                      <Link
                        key={exam.id}
                        to={"/courses/" + getCourseFromExam(exam.id).id}
                        className="list-group-item d-flex align-items-center justify-content-between py-3 list-group-item-action"
                      >
                        <div>
                          <div className="fw-bold h5">
                            <i className="fa-solid fa-angle-right me-2"></i>
                            {getCourseFromExam(exam.id).name}
                          </div>
                          <span className="ms-3">
                            Anno {getCourseFromExam(exam.id).courseYear}
                          </span>
                          <span className="ms-3">
                            {getCourseFromExam(exam.id).cfu} CFU
                          </span>
                        </div>

                        <div>
                          <span className="text-bg-success badge fs-5 px-3 py-1">
                            {exam.grade.value}
                          </span>
                        </div>
                      </Link>
                    );
                  })
                ) : (
                  <div>Nessun voto registrato</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
