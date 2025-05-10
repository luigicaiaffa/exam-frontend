import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function DefaultLayout() {
  return (
    <>
      <Header></Header>

      <div className="container">
        <main>
          <Outlet></Outlet>
        </main>
      </div>

      <footer></footer>
    </>
  );
}
