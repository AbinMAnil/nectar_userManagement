import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import IntroPage from "./pages/intro";
import UserList from "./pages/list";
import Users from "./pages/users/Users";
import "./App.css";

const App = () => {
  const [selectdUser, setSelectedUser] = useState([{ userName: "", _id: "" }]);

  return (
    <>
      <div className="blob"></div>

      <Router>
        <Routes>
          {/* intro page router  */}
          <Route path="/" element={<IntroPage />} />
          {/* list page router */}
          <Route
            path="/list"
            element={<UserList selectdUsers={setSelectedUser} />}
          />
          {/* list of the users  */}
          <Route
            path="/users"
            element={
              <Users users={selectdUser} selectdUsers={setSelectedUser} />
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
