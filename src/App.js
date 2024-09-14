import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import UserPage from "./components/UserPage";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Router>
        <UserProvider>
          <Toaster duration={500} />

          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/user/:id" element={<UserPage />} />
            <Route exact path="/createUser" element={<CreateUser />} />
            <Route exact path="/updateUser/:id" element={<UpdateUser />} />
          </Routes>
        </UserProvider>
      </Router>
    </>
  );
}

export default App;
