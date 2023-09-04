//import { useEffect, useState } from "react";
import CreateEmployee from "./pages/CreateEmployee.jsx";
import EmployeeList from "./pages/EmployeeList.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreateEmployee />} />
        <Route path="/currentEmployee" element={<EmployeeList />} />
      </Routes>
    </div>
  );
}

export default App;
