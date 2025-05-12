import { Link } from "react-router-dom";

export default function ExamsIndexList({ list, guest }) {
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
    <div className="examLists">
      <ul className="list-group list-group-flush">
        {list.lenght !== 0 ? (
          list
            .sort((a, b) => {
              if (!a.isCancelled && !a.grade && !b.isCancelled && !b.grade)
                return new Date(a.date) - new Date(b.date);
              return new Date(b.date) - new Date(a.date);
            })
            .map((el) => {
              return (
                <li
                  key={el.id}
                  className="list-group-item list-group-item-action"
                >
                  <Link to={"/exams/" + el.id}>
                    <div className="row">
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="fw-semibold">Corso</div>
                        <div>{getCourseFromExam(el.id)?.name}</div>
                      </div>
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="fw-semibold">Data</div>
                        <div>{el.date}</div>
                      </div>
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="fw-semibold">Luogo</div>
                        <div>{el.location}</div>
                      </div>
                      <div className="col-12 d-flex align-items-center justify-content-between">
                        <div className="fw-semibold">Esito</div>
                        <div>
                          {el.grade && (
                            <div className="badge bg-success">
                              {el.grade.value}
                            </div>
                          )}
                          {!el.grade && !el.isCancelled && (
                            <div>
                              <span className="disabled btn btn-warning btn-sm badge">
                                <i className="fa-solid fa-plus me-2"></i>
                                Voto
                              </span>
                            </div>
                          )}
                          {el.isCancelled && (
                            <div className="badge bg-danger">Annullato</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })
        ) : (
          <li className="list-group-item">Nessun appello registrato</li>
        )}
      </ul>
    </div>
  );
}
