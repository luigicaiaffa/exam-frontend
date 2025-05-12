export default function ExamsIndexList({ list }) {
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
    <div class="examLists">
      <ul class="list-group list-group-flush">
        {list.lenght !== 0 ? (
          list.map((el) => {
            return (
              <li class="list-group-item list-group-item-action">
                <a th:href="@{/exams/{id}(id = *{id})}">
                  <div class="row">
                    <div class="col-12 d-flex align-items-center justify-content-between">
                      <div class="fw-semibold">Corso</div>
                      <div>{getCourseFromExam(el.id)?.name}</div>
                    </div>
                    <div class="col-12 d-flex align-items-center justify-content-between">
                      <div class="fw-semibold">Data</div>
                      <div>{el.date}</div>
                    </div>
                    <div class="col-12 d-flex align-items-center justify-content-between">
                      <div class="fw-semibold">Luogo</div>
                      <div>{el.location}</div>
                    </div>
                    <div class="col-12 d-flex align-items-center justify-content-between">
                      <div class="fw-semibold">Esito</div>

                      <div
                        th:if="${!exam.isCancelled} and ${exam.grade != null}"
                        class="badge bg-success"
                      >
                        {el.grade.value}
                      </div>
                      <div th:if="${exam.isCancelled}" class="badge bg-danger">
                        Annullato
                      </div>
                      <a
                        th:if="${!exam.isCancelled} and ${exam.grade == null}"
                        th:href="@{/exams/{id}/grade(id = *{id})}"
                        class="badge bg-warning addVote"
                      >
                        Registra voto
                      </a>
                    </div>
                  </div>
                </a>
              </li>
            );
          })
        ) : (
          <li class="list-group-item">Nessun appello registrato</li>
        )}
      </ul>
    </div>
  );
}
