export default function NotFound() {
  return (
    <div className="card courseCards h-100">
      <div className="card-body d-flex flex-column justify-content-center align-items-center text-success">
        <h1 className="fw-bold">404</h1>
        <h2 className="fw-bold">Page Not Found</h2>
        <p className="text-secondary">
          The page you are looking for does not exist.
        </p>
      </div>
    </div>
  );
}
