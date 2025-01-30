import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Dashboard() {
  return (
    <div>
      <Sidebar></Sidebar>

      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 shadow ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
