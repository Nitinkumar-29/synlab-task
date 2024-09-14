import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  return (
    <div className="flex items-center space-x-6 md:space-x-0 justify-between px-4 md:px-10 h-20 md:w-[70%] mx-auto bg-zinc-100 shadow-lg shadow-zinc-200 md:rounded-full md:my-10">
      <div className="text-2xl font-medium">
        <span>SynLabs</span>
      </div>
      <div className="flex space-x-6 md:space-x-12 items-center">
        <Link
          className={`hover:underline underline-offset-4 hover:text-red-600 duration-200 hover:scale-110 ${
            location.pathname === "/"
              ? "text-red-600 font-medium underline"
              : ""
          }`}
          to="/"
        >
          Home
        </Link>
        <Link
          className={`text-white shadow-md shadow-black bg-gradient-to-tr from-blue-800 to-violet-500 rounded-full px-4 py-2 `}
          to="/createUser"
        >
          CreateUser
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
