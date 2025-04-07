import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [checkedTasks, setCheckedTasks] = useState({});

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:9090/api/tasks")
        .then((response) => {
          setTasks(response.data);    
          // Initialize checked state for all tasks
          const initialCheckedState = {};
          response.data.forEach((task) => {
            initialCheckedState[task.id] = false;
          });
          setCheckedTasks(initialCheckedState);
          setLoading(false);
        })
        .catch((error) => {
          setError(`Error fetching tasks: ${error.message}`);
          setLoading(false);
        });
    }, 1000);
  }, []);

  const handleCheckboxChange = (taskId) => {
    setCheckedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
        All Tasks
      </h1>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <div className="h-12 w-12 rounded-full border-4 border-t-blue-500 border-r-purple-500 border-b-pink-500 border-l-blue-300 animate-spin"></div>
        </div>
      )}

      {error && (
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-l-4 border-pink-500 text-red-100 p-4 mb-4 rounded shadow-lg backdrop-blur-sm bg-opacity-80">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && (
        <>
          {tasks.length === 0 ? (
            <div className="bg-gradient-to-r from-slate-800 to-slate-900 bg-opacity-70 backdrop-blur-sm rounded-lg p-6 text-center border border-purple-900 shadow-lg">
              <p className="text-gray-300 text-lg">No tasks available</p>
            </div>
          ) : (
            <div className="rounded-lg shadow-2xl overflow-hidden backdrop-blur-sm border border-purple-900/30">
              <div className="bg-gradient-to-r from-slate-800/80 via-slate-900/80 to-slate-800/80">
                <ul className="divide-y divide-purple-900/30">
                  {tasks.map((task) => (
                    <li
                      key={task.id}
                      className={`transition-all duration-300 ${
                        checkedTasks[task.id]
                          ? "bg-gradient-to-r from-slate-800/70 to-purple-900/30"
                          : "hover:bg-gradient-to-r hover:from-slate-800/40 hover:to-purple-900/20"
                      }`}
                    >
                      <div className="px-6 py-4 flex items-center">
                        <div className="mr-4 flex-shrink-0">
                          <input
                            type="checkbox"
                            id={`task-${task.id}`}
                            checked={checkedTasks[task.id] || false}
                            onChange={() => handleCheckboxChange(task.id)}
                            className="h-5 w-5 rounded border-purple-500 text-blue-500 focus:ring-blue-500 focus:ring-offset-gray-800"
                          />
                        </div>
                        <label
                          htmlFor={`task-${task.id}`}
                          className={`flex-grow font-medium ${
                            checkedTasks[task.id]
                              ? "text-gray-400 line-through"
                              : "text-white"
                          }`}
                        >
                          {task.title}
                        </label>
                        <Link
                          to={`/task-details/${task.id}`}
                          className="ml-4 text-sm bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center group"
                        >
                          Details
                          <svg
                            className="w-4 h-4 ml-1 transition-transform duration-300 transform group-hover:translate-x-1 text-purple-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 5l7 7-7 7"
                            ></path>
                          </svg>
                        </Link>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllTasks;
