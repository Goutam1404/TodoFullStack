import React from "react";
import { Routes, Route } from "react-router-dom";
import {
  AllTasks,
  CreateTask,
  UpdateTask,
  TaskDetails,
  Navbar,
  ErrorPage,
  Footer,
} from "./components/index.js";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<AllTasks />} />
          <Route path="/create-task" element={<CreateTask />} />
          <Route path="/edit-task/:id" element={<UpdateTask />} />
          <Route path="/task-details/:id" element={<TaskDetails />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
