import { Link, useNavigate } from "react-router-dom";
import ExamsIndexList from "../../components/pages/ExamsIndexList";
import { useDataContext } from "../../contexts/DataContext";

export default function ExamsIndex() {
  const { guest } = useDataContext();
  
  const navigate = useNavigate();

  const examsToDo = [];
  const examsPassed = [];
  const examsCancelled = [];

  guest.courses &&
    guest.courses.forEach((course) => {
      course.exams &&
        course.exams.forEach((exam) => {
          if (!exam.isCancelled && !exam.grade) examsToDo.push(exam);
          if (!exam.isCancelled && exam.grade) examsPassed.push(exam);
          if (exam.isCancelled) examsCancelled.push(exam);
        });
    });

  return (
    <>
      <div className="card examsCard">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center pageTitle mb-5">
            <div>
              <h1 className="fw-bold">APPELLI</h1>
            </div>
            <div>
              <Link onClick={() => navigate(-1)}>
                <button className="btn btn-sm btn-success">
                  <i className="fa-solid fa-backward mx-2"></i>
                </button>
              </Link>
            </div>
          </div>

          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <h5 className="fw-bold">Prossimi appelli</h5>
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ExamsIndexList list={examsToDo} guest={guest} />
                </div>
              </div>
            </div>

            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  <h5 className="fw-bold">Appelli con voto</h5>
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ExamsIndexList list={examsPassed} guest={guest} />
                </div>
              </div>
            </div>

            <div></div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  <h5 className="fw-bold">Appelli annullati</h5>
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <ExamsIndexList list={examsCancelled} guest={guest} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
