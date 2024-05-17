import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Root = () => {
  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <Sidebar />
        <main className="mt-3 col-auto col-md-9 col-xl-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Root;
