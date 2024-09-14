import React, { createContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [createUserData, setCreateUserData] = useState({
    email: "",
    name: "",
    phone: "",
  });
  const [updatedUserData, setUpdatedUserData] = useState({
    email: "",
    name: "",
    phone: "",
  });

  // Fetch users
  async function fetchUser() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.dismiss();
      toast.error("Server error");
    }
  }

  // Create a user
  async function createUser() {
    const { email, phone, name } = createUserData;
    if (email === "" || name === "" || phone === "")
      return console.error("Invalid data");

    try {
      toast.loading("processing...");
      const response = await fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ email, phone, name }),
      });
      if (!response.ok) throw new Error("Failed to create user");
      const data = await response.json();
      setUsers((prevUsers) => [...prevUsers, data]);
      toast.dismiss();
      toast.success("user created");
      setCreateUserData({ email: "", name: "", phone: "" });
      navigate("/");
    } catch (error) {
      console.error("Error creating user:", error);
      toast.dismiss();
      toast.error("Server error");
    }
  }

  // Update a user
  async function UpdateUserData(id, updatedUserData) {
    const { name, email, phone } = updatedUserData;
    if (name === "" || email === "" || phone === "")
      return console.error("Invalid data");

    try {
      toast.loading("processing...");
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, phone }),
        }
      );
      if (!response.ok) throw new Error("Failed to update user");
      const data = await response.json();
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user.id === id ? data : user))
      );
      navigate("/");
      toast.dismiss();
      toast.success("user updated");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.dismiss();
      toast.error("Server error");
    }
  }

  // Delete a user
  async function deleteUser(id) {
    if (!id) return console.error("Invalid ID");

    try {
      toast.loading("processing...");
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete user");
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      toast.dismiss();
      toast.success("user deleted");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.dismiss();
      toast.error("Server error");
    }
  }

  return (
    <UserContext.Provider
      value={{
        fetchUser,
        users,
        createUser,
        createUserData,
        setCreateUserData,
        UpdateUserData,
        updatedUserData,
        setUpdatedUserData,
        deleteUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
