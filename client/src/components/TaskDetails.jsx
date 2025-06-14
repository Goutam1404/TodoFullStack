import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setTimeout(() => {
      axios
        .get(`http://localhost:9090/api/tasks/${id}`)
        .then((response) => {
          setTask(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError(`Error fetching task: ${error.message}`);
          setLoading(false);
        });
    }, 1000);
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:9090/api/tasks/${id}`);
      navigate("/");
    } catch (error) {
      setError(`Error deleting task: ${error.message}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-3xl text-center font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
        Task Details
      </h2>

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

      {!loading && !error && task && (
        <div className="bg-gradient-to-r from-slate-800/80 via-slate-900/80 to-slate-800/80 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-purple-900/30">
          <h3 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-400 animate-fade-in">
            {task.title}
          </h3>

          <p className="text-gray-300 mb-8 animate-fade-in-slow">
            {task.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start animate-fade-in-slower">
            <Link
              to={`/edit-task/${id}`}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1 text-center"
            >
              Update Task
            </Link>

            <button
              onClick={handleDelete}
              className="bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-2 px-6 rounded-lg shadow-lg transition duration-300 transform hover:-translate-y-1"
            >
              Delete Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskDetails;
