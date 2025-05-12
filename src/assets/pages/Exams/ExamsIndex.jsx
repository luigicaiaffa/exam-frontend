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
      <div className="d-flex justify-content-between align-items-center mt-5 mb-3">
        <div>
          <h1 className="fw-bold">APPELLI</h1>
        </div>
        <div>
          <Link onClick={() => navigate(-1)}>
            <button className="btn btn-sm btn-dark">
              <i className="fa-solid fa-backward mx-2"></i>
            </button>
          </Link>
        </div>
      </div>

      <hr />

      <div className="mb-5">
        <div>
          <h5 className="fw-bold">Prossimi appelli</h5>
        </div>

        <ExamsIndexList list={examsToDo} guest={guest} />
      </div>

      <hr />

      <div className="mb-5">
        <div>
          <h5 className="fw-bold">Appelli con voto</h5>
        </div>

        <ExamsIndexList list={examsPassed} guest={guest} />
      </div>

      <hr />

      <div className="mb-5">
        <div>
          <h5 className="fw-bold">Appelli annullati</h5>
        </div>

        <ExamsIndexList list={examsCancelled} guest={guest} />
      </div>
    </>
  );
}
