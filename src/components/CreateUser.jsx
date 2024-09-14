import React, { useContext } from "react";
import UserContext from "../context/UserContext";

const CreateUser = () => {
  const { createUser, createUserData, setCreateUserData } =
    useContext(UserContext);

  function handleOnChange(e) {
    setCreateUserData({ ...createUserData, [e.target.name]: e.target.value });
  }

  function handleCreateUser(e) {
    e.preventDefault();
    createUser();
  }

  return (
    <div className="flex w-full items-center justify-center py-8 px-4">
      <div className="w-full max-w-lg bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Create User</h2>

        <form onSubmit={handleCreateUser} method="post" className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              required
              onChange={handleOnChange}
              value={createUserData.name}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              onChange={handleOnChange}
              value={createUserData.email}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="number" className="text-sm font-medium mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter your phone"
              required
              onChange={handleOnChange}
              value={createUserData.phone}
              className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
