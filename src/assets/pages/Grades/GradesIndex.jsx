import { useEffect, useState } from "react";
import { useDataContext } from "../../contexts/DataContext";
import { Link } from "react-router-dom";

export default function GradesIndex() {
  const { guest, averages } = useDataContext();
  const [exams, setExams] = useState([]);

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
      <div className="mt-5 d-flex justify-content-between align-items-center">
        <h1 className="fw-bold">VOTI</h1>

        <div>
          <h5>
            <span className="me-1">CFU</span>
            {averages && averages.totalCfu ? (
              <span>
                {averages && averages.totalCfu} / {guest && guest.totalCfu}
              </span>
            ) : (
              <span>0 / {guest && guest.totalCfu}</span>
            )}
          </h5>
        </div>
      </div>

      <hr />

      <div className="text-center row row-cols-1 row-cols-md-2 g-2">
        <div className="col py-2 border">
          <div>Media Aritmetica</div>
          <div className="fw-semibold">{averages && averages.arithmetic}</div>
        </div>

        <div className="col py-2 border">
          <div>Media Ponderata</div>
          <div className="fw-semibold">{averages && averages.weighted}</div>
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
                      <i className="fa-solid">{exam.grade.value}</i>
                    </div>
                  </Link>
                );
              })
            ) : (
              <span className="list-group-item d-flex align-items-center justify-content-between py-3">
                Nessun voto registrato
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
