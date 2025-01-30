import React from "react";
import {
  HiAcademicCap,
  HiDocumentReport,
  HiHome,
  HiLogout,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import logo from '../../assets/logo.svg'

function Sidebar() {

    const { logout } = useAuth();
  
  return (
    <div>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800 flex flex-col justify-between">
          <ul className="space-y-2 font-medium">
            <HeaderItem title={"CampusLink"}></HeaderItem>
            <Item title="Home" icon="Home"></Item>
            <Item title="Students" icon="Students"></Item>
            <Item title="Reports" icon="Reports" trail="1" highlight></Item>
          </ul>
          <div>
            <Logout onClick={logout}></Logout>
          </div>
        </div>
      </aside>
    </div>
  );
}

type ItemProps = {
  title: string;
  trail?: string;
  color?: string | "black";
  icon?: "Home" | "Students" | "Reports";
  highlight?: boolean;
};

function Item({ title, trail, icon, highlight = false }: ItemProps) {
  const iconElement =
    icon == "Home" ? (
      <HiHome size={28} className="text-gray-500 group-hover:text-gray-800" />
    ) : icon == "Students" ? (
      <HiAcademicCap
        size={28}
        className="text-gray-500 group-hover:text-gray-800"
      />
    ) : icon == "Reports" ? (
      <HiDocumentReport
        size={28}
        className="text-gray-500 group-hover:text-gray-800"
      />
    ) : null;

  const trailingElements = highlight ? (
    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
      {trail}
    </span>
  ) : (
    <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700 dark:text-gray-300">
      {trail}
    </span>
  );

  return (
    <li>
      <Link
        to={title}
        className="group flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        {iconElement}

        <span className="flex-1 ms-3 font-Nexa whitespace-nowrap">{title}</span>
        {trail && trailingElements}
      </Link>
    </li>
  );
}

function HeaderItem({ title }: ItemProps) {

  return (
<div className="flex items-center justify-center p-2">
  <img src={logo} className="w-1/5" alt="" />
  <span className="flex items-center text-2xl font-NexaHeavy font-semibold text-primary-700 px-2 h-full">
    {title}
  </span>
</div>
  );
}

function Logout({ onClick }: { onClick: () => void }) {
  return (
    <>
      <a
        onClick={onClick}
        className="border-t-2 group flex items-center p-2 text-gray-600  font-medium  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
      >
        <HiLogout></HiLogout>
        <span className="font-Nexa flex-1 ms-3 whitespace-nowrap">Logout</span>
      </a>
    </>
  );
}


export default Sidebar;
