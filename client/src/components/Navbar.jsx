import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-800/90 via-slate-900/90 to-slate-800/90 shadow-lg backdrop-blur-sm border-b border-purple-900/30 px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-2xl font-bold mb-4 sm:mb-0 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-500">
          To-Do List
        </h2>
        <div className="flex space-x-6 ">
          <Link 
            className="text-gray-300 p-2  text-1xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-colors duration-300 font-medium" 
            to='/'
          >
            All Tasks
          </Link>
          <Link 
            className="text-gray-300 p-2 text-1xl hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-500 transition-colors duration-300 font-medium" 
            to='/create-task'
          >
            Create Task
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;