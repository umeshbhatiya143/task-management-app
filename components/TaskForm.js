import { useState, useEffect } from 'react';

function TaskForm({ tasks, setTasks, taskToEdit, onClose }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Low');

  useEffect(() => {
    if (taskToEdit) {
      setTitle(taskToEdit.title);
      setDescription(taskToEdit.description);
      setDueDate(taskToEdit.dueDate);
      setPriority(taskToEdit.priority);
    }
  }, [taskToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: taskToEdit ? taskToEdit.id : Date.now(),
      title,
      description,
      dueDate,
      priority,
      isCompleted: taskToEdit ? taskToEdit.isCompleted : false,
    };

    if (taskToEdit) {
      setTasks(tasks.map((task) => (task.id === taskToEdit.id ? newTask : task)));
    } else {
      setTasks([...tasks, newTask]);
    }

    onClose();
  };

  return (
    <div className="relative bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto transform transition-all duration-500 ease-in-out hover:scale-105">
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute flex items-center justify-center w-8 h-8 top-2 right-2 rounded-full bg-red-100 text-red-600 hover:bg-red-600 hover:text-white transition duration-300 transform hover:scale-110"
      >
        &times;
      </button>

      <h2 className="text-3xl font-bold mb-6 text-black text-center">{taskToEdit ? 'Edit Task' : 'Add New Task'}</h2>
      
      <form onSubmit={handleSubmit}>

        {/* Task Title with Floating Label Animation */}
        <div className="relative mb-6">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full focus:border-[#73BC44] focus:outline-none text-black transition duration-300 transform focus:scale-105 focus:shadow-lg"
            required
          />
          <label 
            className={`absolute left-3 top-3 text-gray-500 transition-all duration-200 transform ${
              title ? '-translate-y-5 text-sm text-[#73BC44] bg-white px-1' : ''
            }`}
          >
            Task Title
          </label>
        </div>

        {/* Task Description with Character Count */}
        <div className="relative mb-6">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full resize-none focus:border-[#73BC44] focus:outline-none text-black transition duration-300 transform focus:scale-105 focus:shadow-lg"
            rows="4"
            maxLength="200"
            required
          ></textarea>
          <label 
            className={`absolute left-3 top-3 text-gray-500 transition-all duration-200 transform ${
              description ? '-translate-y-5 text-sm text-[#73BC44] bg-white px-1' : ''
            }`}
          >
            Task Description
          </label>
          <p className="text-gray-400 text-sm absolute right-3 bottom-1">
            {description.length} / 200
          </p>
        </div>

        {/* Due Date Input */}
        <div className="relative mb-6">
          <label className="block text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full focus:border-[#73BC44] focus:outline-none text-black transition duration-300 transform focus:scale-105 focus:shadow-lg"
            required
          />
        </div>

        {/* Priority Selection */}
        <div className="relative mb-6">
          <label className="block text-gray-700 mb-1">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border border-gray-300 p-3 rounded w-full focus:border-[#73BC44] focus:outline-none text-black transition duration-300 transform focus:scale-105 focus:shadow-lg"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        {/* Animated Submit Button */}
        <div className="w-full">
          <button
            type="submit"
            className="bg-gradient-to-r from-green-400 to-[#73BC44] w-full text-white py-2 px-6 rounded hover:from-green-500 hover:to-green-600 shadow-lg hover:shadow-xl transform transition duration-300 hover:scale-105"
          >
            {taskToEdit ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TaskForm;
