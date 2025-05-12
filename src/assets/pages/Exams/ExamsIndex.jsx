import { useDataContext } from "../../contexts/DataContext";

export default function ExamsIndex() {
  const { guest } = useDataContext();

  return (
    <>
      <div class="d-flex justify-content-between align-items-center mt-5 mb-3">
        <div>
          <h1 class="fw-bold">APPELLI</h1>
        </div>
      </div>
      <hr />
      <div class="mb-5">
        <div>
          <h5 class="fw-bold">Prossimi appelli</h5>
        </div>

        {/* <div th:replace="~{fragments/fragments :: examsList(${examsToDo})}"></div> */}
      </div>
      <hr />
      <div class="mb-5">
        <div>
          <h5 class="fw-bold">Appelli con voto</h5>
        </div>

        {/* <div th:replace="~{fragments/fragments :: examsList(${examsGraded})}"></div> */}
      </div>
      <hr />
      <div class="mb-5">
        <div>
          <h5 class="fw-bold">Appelli annullati</h5>
        </div>

        {/* <div th:replace="~{fragments/fragments :: examsList(${examsCancelled})}"></div> */}
      </div>
    </>
  );
}
