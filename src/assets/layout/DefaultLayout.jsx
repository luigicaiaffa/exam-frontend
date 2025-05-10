import { Outlet } from "react-router-dom";
import Header from "../components/layout/Header";

export default function DefaultLayout() {
  return (
    <>
      <Header></Header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
}
