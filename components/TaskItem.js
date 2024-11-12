import React from 'react';
import { FiEdit, FiCheckCircle, FiCircle } from 'react-icons/fi';

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const { id, title, description, dueDate, priority, isCompleted } = task;

  // Softer gradient backgrounds based on priority level
  const priorityBackgrounds = {
    High: 'bg-gradient-to-r from-red-200 to-red-100 border-l-4 border-red-400',
    Medium: 'bg-gradient-to-r from-yellow-200 to-yellow-100 border-l-4 border-yellow-400',
    Low: 'bg-gradient-to-r from-green-200 to-green-100 border-l-4 border-green-400',
  };

  // Softer badge styles based on priority level
  const priorityBadgeStyles = {
    High: 'bg-red-400 text-white shadow-2xl rounded-full',
    Medium: 'bg-yellow-400 text-white shadow-2xl rounded-full',
    Low: 'bg-green-400 text-white shadow-2xl rounded-full',
  };

  return (
    <div
      className={`relative px-4 py-4 rounded-lg transition-transform transform hover:scale-102 duration-300 mb-6 shadow-md ${priorityBackgrounds[priority]}`}
    >
      {/* Priority Badge */}
      <span
        className={`absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded ${priorityBadgeStyles[priority]}`}
        style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.15)' }}
        aria-label={`Priority: ${priority}`} // Adding ARIA label
      >
        {priority}
      </span>

      {/* Task Title */}
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>

      {/* Task Description */}
      <p className="text-gray-700 text-sm mb-3">{description}</p>

      {/* Due Date */}
      <p className="text-gray-500 text-xs mb-4">Due: {new Date(dueDate).toLocaleDateString()}</p>

      {/* Buttons */}
      <div className="flex justify-end space-x-2">
        {/* Mark Complete Button */}
        <button
          onClick={() => onToggleComplete(id)}
          className={`px-4 py-1 text-sm rounded font-medium transition-colors duration-200 ${
            isCompleted
              ? 'bg-green-300 text-green-800 hover:bg-green-400'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'} // Adding ARIA label for accessibility
        >
          {isCompleted ? 'Mark incomplete' : 'Mark Complete'}
        </button>

        {/* Edit Button */}
        <button
          onClick={() => onEdit(task)}
          className="px-3 py-1 text-sm bg-blue-300 text-blue-800 rounded hover:bg-blue-400 transition-colors duration-200"
          aria-label="Edit task"
        >
          Edit
        </button>

        {/* Delete Button */}
        <button
          onClick={() => onDelete(id)}
          className="px-3 py-1 text-sm bg-red-300 text-red-800 rounded hover:bg-red-400 transition-colors duration-200"
          aria-label="Delete task"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
