import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <i className="fa-solid fa-book-open fs-1"></i>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/courses">
                  Corsi
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/exams">
                  Appelli
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/grades">
                  Voti
                </NavLink>
              </li>
            </ul>

            <ul className="navbar-nav gap-2 flex-row justify-content-end">
              <li className="nav-item">
                <a
                  className="btn btn-sm btn-dark"
                  href="http://localhost:8080/login"
                >
                  <i className="fa-solid fa-user me-2"></i>login
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="btn btn-sm btn-dark"
                  href="http://localhost:8080/user/create"
                >
                  <i className="fa-solid fa-plus me-2"></i>Registrati
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
