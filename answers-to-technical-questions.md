# Answers to Technical Questions

---

## **1. How long did you spend on the coding test?**

I spent **5 hours** working on the coding test and an additional **1 hour** for testing and refining the application to ensure it functions as expected.

---

## **2. What was the most useful feature that was added to the latest version of your chosen language? Please include a snippet of code that shows how you've used it.**

In the latest version of **React** that I used for the task management application, there were no new features that I specifically utilized for this project. Instead, I relied on commonly used features such as the **`useState` hook**. While **`useState`** has been a part of React for a long time, it continues to be an essential feature for managing the component state.

Here’s an example of how I used **`useState`** to handle dynamic task data within the application:

```javascript
    import { useState } from 'react';

    function TaskApp() {
        const [tasks, setTasks] = useState([]);

        const addTask = (title, description, dueDate, priority) => {
            const newTask = {
                title,
                description,
                dueDate,
                priority,
                isCompleted: false,
            };
            setTasks([...tasks, newTask]);
        };

        return (
            <div>
                <button onClick={() => addTask('New Task', 'Task description', '2024-11-30', 'High')}>
                    Add Task
                </button>
                <div>
                    {tasks.map((task, index) => (
                        <div key={index}>
                            <h3>{task.title}</h3>
                            <p>{task.description}</p>
                            <p>{task.priority}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    export default TaskApp;
```

---

## 3. How would you track down a performance issue in production? Have you ever had to do this?

To track a performance issue in production, I follow these steps:

1. **Identify the Issue**:
   - Slow loading times or unresponsive UI.
   - High CPU or memory usage.

2. **Use Monitoring Tools**:
   - **Chrome DevTools** to inspect network requests and JavaScript performance.
   - **Real User Monitoring** (e.g., **Sentry**, **Datadog**) to track performance in real time.

3. **Analyze Bottlenecks**:
   - Check if **API calls** are slow.
   - Analyze **rendering performance** (e.g., unnecessary re-renders in React).

4. **Optimize**:
   - Use **code splitting** and **lazy loading**.
   - Optimize **images** by using **next/image** for better performance.

### Experience:
I faced performance issues with a travel agency website I worked on, where the website was loading slowly. To resolve this, I implemented:
- **Server-Side Rendering (SSR)** and **Static Props** to pre-render content.
- Used **Next.js's `next/image`** instead of the regular `img` tag for optimized image loading.

These changes improved load times significantly, making the website faster and more responsive.

---

## 4. If you had more time, what additional features or improvements would you consider adding to the task management application?

If I had more time, I would consider adding the following features and improvements to enhance the task management application:

1. **Persistent Storage**:
   - Implement a backend to store tasks permanently (e.g., using MongoDB), so tasks persist across app reloads and user sessions.
   
2. **User Authentication**:
   - Add a user authentication system (using OAuth or JWT) to allow users to sign in and manage their tasks securely across different devices.

3. **Task Reminders & Notifications**:
   - Implement a feature that sends reminders or notifications to users when a task is approaching its due date or when a task becomes overdue.

4. **Task Categorization**:
   - Add a feature that allows users to categorize tasks (e.g., Work, Personal, Urgent), helping to better organize tasks.

5. **Improved Task Search & Filtering**:
   - Improve search functionality by supporting filtering by date, priority, and status, providing a more efficient way to find tasks.

These additional features would significantly improve the user experience, providing more functionality and making task management more efficient.
