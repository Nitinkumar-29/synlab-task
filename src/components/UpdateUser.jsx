import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/UserContext";
import { useParams, useNavigate } from "react-router-dom";
import { CgSpinner } from "react-icons/cg";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, UpdateUserData, fetchUser, updatedUserData, setUpdatedUserData } = useContext(UserContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchAndSetUser = async () => {
      await fetchUser(); // Ensure users are fetched
      const foundUser = users.find((user) => user.id === parseInt(id));
      if (foundUser) {
        setUser(foundUser);
        setUpdatedUserData({
          name: foundUser.name,
          email: foundUser.email,
          phone: foundUser.phone,
        });
      }
    };
    fetchAndSetUser();
  }, [id, users, fetchUser, setUpdatedUserData]);

  const handleInput = (e) => {
    const { name, innerText } = e.target;
    setUpdatedUserData((prevData) => ({
      ...prevData,
      [name]: innerText,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (updatedUserData) {
      await UpdateUserData(id, updatedUserData);
      navigate("/");
    }
  };

  if (!user)
    return (
      <div className="flex w-full items-center justify-center my-20">
        <span className="mx-auto"><CgSpinner size={40} className="animate-spin"/></span>
      </div>
    );

  return (
    <div className="flex w-full items-center justify-center py-8 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Update User</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Name</label>
            <div
              name="name"
              contentEditable
              suppressContentEditableWarning
              onInput={handleInput}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {updatedUserData.name || ""}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Email</label>
            <div
              name="email"
              contentEditable
              suppressContentEditableWarning
              onInput={handleInput}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {updatedUserData.email || ""}
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-sm font-medium mb-2">Phone</label>
            <div
              name="phone"
              contentEditable
              suppressContentEditableWarning
              onInput={handleInput}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {updatedUserData.phone || ""}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Update User
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
