import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:9090/api/tasks", {
        title,
        description,
      });
      setMessage("Task created successfully!");
      setError("");
      setTitle("");
      setDescription("");
      navigate("/");
    } catch (error) {
      setError(`Task Creation Failed: ${error.message}`);
      setMessage("");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h2 className="text-3xl text-center font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
        Create Task
      </h2>

      {message && (
        <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 border-l-4 border-green-500 text-green-100 p-4 mb-6 rounded shadow-lg backdrop-blur-sm bg-opacity-80">
          <p>{message}</p>
        </div>
      )}

      {error && (
        <div className="bg-gradient-to-r from-red-900 via-red-800 to-red-900 border-l-4 border-pink-500 text-red-100 p-4 mb-6 rounded shadow-lg backdrop-blur-sm bg-opacity-80">
          <p>{error}</p>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-slate-800/80 via-slate-900/80 to-slate-800/80 rounded-lg shadow-2xl p-8 backdrop-blur-sm border border-purple-900/30"
      >
        <div className="mb-6">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="w-full bg-slate-800/70 border border-purple-900/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition duration-200"
          />
        </div>

        <div className="mb-6">
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="w-full bg-slate-800/70 border border-purple-900/50 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition duration-200 h-40 resize-none"
          ></textarea>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
