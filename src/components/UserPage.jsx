import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { BiPencil, BiTrash } from "react-icons/bi";

const UserPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, fetchUser, deleteUser } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
      setUser(user);
    } else {
      fetchUser();
    }
  }, [id, users, fetchUser]);

  const handleDelete = async () => {
    try {
      await deleteUser(id);
      navigate("/");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full items-start justify-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-6 mt-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">User Details</h1>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Name</h2>
          <p className="text-gray-600">{user.name}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Email</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-700">Phone</h2>
          <p className="text-gray-600">{user.phone}</p>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={() => navigate(`/updateUser/${user.id}`)}
            className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            <BiPencil className="inline-block mr-2" />
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300"
          >
            <BiTrash className="inline-block mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
