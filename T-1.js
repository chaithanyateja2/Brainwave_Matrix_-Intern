let tasks = [];
let timerInterval;
let currentTimer = null;

document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input').value.trim();
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    const addTimer = document.getElementById('add-timer').checked;

    if (!taskInput) return;

    const task = {
        id: Date.now(),
        name: taskInput,
        timer: addTimer,
        timeRemaining: addTimer ? { hours, minutes, seconds } : null,
        isCompleted: false,
    };

    tasks.push(task);
    renderTasks();
    document.getElementById('task-input').value = '';
    resetTimerInputs();
});

function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');
        if (task.isCompleted) taskElement.classList.add('completed');

        const timerDisplay = task.timer
            ? `<span class="timer-display">${formatTime(task.timeRemaining)}</span>`
            : `<span>No Timer</span>`;

        taskElement.innerHTML = `
            <span>${task.name}</span>
            ${timerDisplay}
            ${!task.isCompleted && task.timer ? `<button class="timer-btn" onclick="toggleTimer(${index})">▶️</button>` : ''}
            <button class="complete-btn" onclick="completeTask(${index})">✔️</button>
            <button class="delete-btn" onclick="deleteTask(${index})" ${task.isCompleted ? '' : 'disabled'}>🗑️</button>
        `;

        taskList.appendChild(taskElement);
    });
}

function formatTime(time) {
    const { hours, minutes, seconds } = time;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function toggleTimer(index) {
    const task = tasks[index];
    const timerBtn = document.querySelectorAll('.timer-btn')[index];
    const completeBtn = document.querySelectorAll('.complete-btn')[index];

    if (task.isCompleted) return;

    if (currentTimer !== index) {
        startTimer(index);
        currentTimer = index;
        timerBtn.textContent = '⏸️'; 
    } else {
        clearInterval(timerInterval);
        timerBtn.textContent = '▶️'; 
        currentTimer = null;
    }
}

function startTimer(index) {
    const task = tasks[index];
    task.timeRemaining = { ...task.timeRemaining }; 

    timerInterval = setInterval(function() {
        if (task.timeRemaining.seconds > 0) {
            task.timeRemaining.seconds--;
        } else if (task.timeRemaining.minutes > 0) {
            task.timeRemaining.minutes--;
            task.timeRemaining.seconds = 59;
        } else if (task.timeRemaining.hours > 0) {
            task.timeRemaining.hours--;
            task.timeRemaining.minutes = 59;
            task.timeRemaining.seconds = 59;
        }

        renderTasks();

        if (task.timeRemaining.hours === 0 && task.timeRemaining.minutes === 0 && task.timeRemaining.seconds === 0) {
            clearInterval(timerInterval);
            task.isCompleted = true;
            renderTasks();
        }
    }, 1000);
}

function completeTask(index) {
    tasks[index].isCompleted = true;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function resetTimerInputs() {
    document.getElementById('hours').value = 0;
    document.getElementById('minutes').value = 0;
    document.getElementById('seconds').value = 0;
}

document.getElementById('add-timer').addEventListener('change', function() {
    const timerFields = document.querySelectorAll('#hours, #minutes, #seconds');
    if (this.checked) {
        timerFields.forEach(field => field.disabled = false);
    } else {
        timerFields.forEach(field => field.disabled = true);
    }
});
