import { useState } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import { FiPlus, FiSearch } from 'react-icons/fi';

function Dashboard({ tasks, setTasks }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [completionFilter, setCompletionFilter] = useState('All'); // New state for completion filter

    const handleOpenModal = (task = null) => {
        setTaskToEdit(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setTaskToEdit(null);
        setIsModalOpen(false);
    };

    const handleToggleComplete = (id) => {
        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
        );
        setTasks(updatedTasks);
    };

    const handleDeleteTask = (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this task?');
        if (confirmDelete) {
            const updatedTasks = tasks.filter((task) => task.id !== id);
            setTasks(updatedTasks);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesPriority =
            priorityFilter === 'All' || task.priority === priorityFilter;
        const matchesCompletion =
            completionFilter === 'All' ||
            (completionFilter === 'Completed' && task.isCompleted) ||
            (completionFilter === 'Not Completed' && !task.isCompleted);

        return matchesSearch && matchesPriority && matchesCompletion;
    });

    const overdueTasks = filteredTasks.filter(
        (task) => !task.isCompleted && new Date(task.dueDate) < new Date()
    );
    const upcomingTasks = filteredTasks.filter(
        (task) => !task.isCompleted && new Date(task.dueDate) >= new Date()
    );
    const completedTasks = filteredTasks.filter((task) => task.isCompleted);

    return (
        <div className="py-6 px-2 sm:px-6 min-h-screen bg-gradient-to-r from-gray-100 via-white to-gray-100 relative overflow-hidden">
            {/* Background and Header */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-[#b1d29c] to-green-400 opacity-20 animate-gradient-pulse z-0"></div>
            <div className="absolute top-0 left-0 w-full h-48 sm:h-36 bg-gradient-to-r from-[#73BC44] to-green-600 rounded-b-full shadow-lg z-0"></div>
            <div className="relative z-10 text-center mb-12 px-4">
                <h1 className="text-4xl -mt-2 sm:mt-0 md:text-5xl font-extrabold uppercase text-white mb-4 tracking-wider">Task Management</h1>
                <p className="text-lg text-gray-200 font-medium">Organize and prioritize your tasks seamlessly</p>
            </div>

            {/* Floating Add New Task Button */}
            <div className="flex justify-center mb-8 z-10">
                <button
                    onClick={() => handleOpenModal()}
                    className="flex items-center gap-2 bg-gradient-to-r from-green-500 to-[#73BC44] text-white px-6 py-3 rounded-full shadow-xl hover:scale-105 hover:shadow-2xl transform transition-all duration-300"
                >
                    <FiPlus size={22} />
                    <span className="font-semibold text-lg">Add New Task</span>
                </button>
            </div>

            {/* Modal for Adding/Editing Task */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center z-50 transition-opacity duration-500 ease-in-out">
                    <div className="rounded-lg w-full max-w-lg transition-all duration-500 transform scale-95 opacity-100">
                        <TaskForm tasks={tasks} setTasks={setTasks} taskToEdit={taskToEdit} onClose={handleCloseModal} />
                    </div>
                </div>
            )}

            {/* Search and Filter Section */}
            <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4 px-4 z-20">
                <div className="relative w-full md:w-1/3 z-20">
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="border p-3 rounded-full w-full shadow focus:outline-none focus:ring-2 focus:ring-[#73BC44] transition text-gray-800 z-20"
                    />
                    <FiSearch className="absolute right-4 top-3 text-[#73BC44]" size={24} />
                </div>
                <select
                    value={priorityFilter}
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    className="border p-3 rounded-full w-full md:w-1/4 shadow focus:outline-none focus:ring-2 focus:ring-[#73BC44] transition text-gray-800 z-20"
                >
                    <option value="All">All Priorities</option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                </select>
                <select
                    value={completionFilter}
                    onChange={(e) => setCompletionFilter(e.target.value)}
                    className="border p-3 rounded-full w-full md:w-1/4 shadow focus:outline-none focus:ring-2 focus:ring-[#73BC44] transition text-gray-800 z-20"
                >
                    <option value="All">All Tasks</option>
                    <option value="Completed">Completed</option>
                    <option value="Incomplete">Incomplete</option>
                </select>
            </div>

            {/* Task Sections */}
            <div className="grid gap-8 px-4 z-10">
                {/* Conditional rendering based on filter selection */}
                {completionFilter === 'Incomplete' && (
                    <div>
                        <h2 className="text-2xl font-semibold text-blue-600 mb-4">Upcoming Tasks</h2>
                        {upcomingTasks.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {upcomingTasks.map((task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onEdit={handleOpenModal}
                                        onToggleComplete={handleToggleComplete}
                                        onDelete={handleDeleteTask}
                                        className="transform hover:scale-105 transition-transform duration-300 shadow hover:shadow-lg"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No upcoming tasks. You&apos;re all caught up!</p>
                        )}
                    </div>
                )}

                {completionFilter === 'Completed' && (
                    <div>
                        <h2 className="text-2xl font-semibold text-green-600 mb-4">Completed Tasks</h2>
                        {completedTasks.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                {completedTasks.map((task) => (
                                    <TaskItem
                                        key={task.id}
                                        task={task}
                                        onEdit={handleOpenModal}
                                        onToggleComplete={handleToggleComplete}
                                        onDelete={handleDeleteTask}
                                        className="transform hover:scale-105 transition-transform duration-300 shadow hover:shadow-lg"
                                    />
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-500">No completed tasks yet. Keep going!</p>
                        )}
                    </div>
                )}

                {/* Show all sections when 'All' is selected */}
                {completionFilter === 'All' && (
                    <>
                        <div>
                            <h2 className="text-2xl font-semibold text-red-600 mb-4">Overdue Tasks</h2>
                            {overdueTasks.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {overdueTasks.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            onEdit={handleOpenModal}
                                            onToggleComplete={handleToggleComplete}
                                            onDelete={handleDeleteTask}
                                            className="transform hover:scale-105 transition-transform duration-300 shadow hover:shadow-lg"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No overdue tasks. Great job!</p>
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-blue-600 mb-4">Upcoming Tasks</h2>
                            {upcomingTasks.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {upcomingTasks.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            onEdit={handleOpenModal}
                                            onToggleComplete={handleToggleComplete}
                                            onDelete={handleDeleteTask}
                                            className="transform hover:scale-105 transition-transform duration-300 shadow hover:shadow-lg"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No upcoming tasks. You&apos;re all caught up!</p>
                            )}
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold text-green-600 mb-4">Completed Tasks</h2>
                            {completedTasks.length > 0 ? (
                                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {completedTasks.map((task) => (
                                        <TaskItem
                                            key={task.id}
                                            task={task}
                                            onEdit={handleOpenModal}
                                            onToggleComplete={handleToggleComplete}
                                            onDelete={handleDeleteTask}
                                            className="transform hover:scale-105 transition-transform duration-300 shadow hover:shadow-lg"
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="text-center text-gray-500">No completed tasks yet. Keep going!</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
