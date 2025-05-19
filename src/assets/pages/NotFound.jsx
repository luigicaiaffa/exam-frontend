export default function NotFound() {
  return (
    <div className="card courseCards h-100">
      <div className="card-body d-flex flex-column justify-content-center align-items-center text-success">
        <h1 className="fw-bold">404</h1>
        <h2 className="fw-bold">Page Not Found</h2>
        <p className="text-secondary">
          La pagina che stai cercando non esiste.
        </p>
      </div>
    </div>
  );
}
