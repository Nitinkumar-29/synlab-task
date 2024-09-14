import React, { useContext, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { BiPencil, BiTrash } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";

const Home = () => {
  const { users, fetchUser, deleteUser } = useContext(UserContext);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="flex w-full items-center justify-center p-4 bg-gray-100 min-h-screen">
      {users.length > 0 ? (
        <div className="flex flex-col items-center w-full lg:w-4/5 max-w-4xl">
          <h1 className="text-2xl font-semibold w-full mb-6 text-gray-800">
            Total Users: {users.length}
          </h1>

          <div className="w-full space-y-6">
            {users.map((user) => (
              <div
                key={user.id} // Use user.id as key if available
                className="border border-gray-300 rounded-lg bg-white shadow-md p-6 flex "
              >
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 w-full">
                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-gray-700">Name:</span>
                    <Link
                      to={`/user/${user.id}`}
                      className="text-gray-600 hover:underline hover:text-blue-500 cursor-pointer"
                    >
                      {user.name}
                    </Link>
                  </div>

                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-gray-700">Email:</span>
                    <span className="text-gray-600">{user.email}</span>
                  </div>

                  <div className="flex flex-col flex-1">
                    <span className="font-semibold text-gray-700">Phone:</span>
                    <span className="text-gray-600">{user.phone}</span>
                  </div>
                </div>
                <div className="flex space-x-4 items-start md:items-center">
                  <Link
                    to={`/updateUser/${user.id}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <BiPencil className="text-xl" />
                  </Link>
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <BiTrash className="text-xl" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <span>
          <CgSpinner size={40} className="animate-spin " />
        </span>
      )}
    </div>
  );
};

export default Home;
