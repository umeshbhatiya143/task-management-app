import React from 'react'

const TaskFilter = () => {
    return (
        <div className="p-4 border rounded bg-white shadow-md w-full md:w-1/2">
            <h2 className="text-2xl font-semibold text-black mb-4">Filter Tasks</h2>
            <select className="border p-2 mt-2 block w-full rounded">
                <option>Filter by Priority</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
            </select>
            <select className="border p-2 mt-2 block w-full rounded">
                <option>Filter by Status</option>
                <option>Completed</option>
                <option>Upcoming</option>
                <option>Overdue</option>
            </select>
        </div>
    )
}

export default TaskFilter