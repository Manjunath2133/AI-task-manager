const apiUrl = 'http://localhost:5001/tasks';

async function fetchTasks() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const tasks = await response.json();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.title} - ${task.deadline}`;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching tasks:', error);
    }
}

async function addTask() {
    try {
        const title = document.getElementById('task-title').value;
        const deadline = document.getElementById('task-deadline').value;
        const task = { title, deadline, id: Date.now() };

        console.log('Adding task:', task);

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(task)
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        console.log('Task added successfully');
        await fetchTasks(); // Refresh the task list
    } catch (error) {
        console.error('Error adding task:', error);
    }
}


async function prioritizeTasks() {
    try {
        const tasksResponse = await fetch(apiUrl);
        if (!tasksResponse.ok) throw new Error(`HTTP error! status: ${tasksResponse.status}`);
        const tasks = await tasksResponse.json();

        const response = await fetch(apiUrl + '/prioritize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(tasks)
        });
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const prioritizedTasks = await response.json();
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';
        prioritizedTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = `${task.title} - ${task.deadline}`;
            taskList.appendChild(li);
        });
    } catch (error) {
        console.error('Error prioritizing tasks:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchTasks);
