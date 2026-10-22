const taskInput = document.getElementById("taskEnter");
const taskList = document.getElementById("taskList");

const button = document.querySelector(".newTask");
const completedBtn = document.querySelector(".completed");
const allBtn = document.querySelector(".all");
const importantBtn = document.querySelector(".important");

let tasks = [];
let onCompleted = false;
let onImportant = false;

function createTaskElement(taskData) {
    const task = document.createElement("li");
    task.textContent = taskData.text;
    taskList.appendChild(task);
    taskData.task = task;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskData.completed;
    task.appendChild(checkbox);

    if (taskData.completed) {
        task.style.color = "rgb(13, 255, 0)";
    } else if (taskData.important) {
        task.style.color = "rgb(255, 170, 0)";
    } else {
        task.style.color = "white";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.innerHTML = "&times;";
    task.appendChild(deleteBtn);

    checkbox.addEventListener("change", function () {
        taskData.completed = checkbox.checked;
        if (checkbox.checked) {
            task.style.color = "rgb(13, 255, 0)";
        } else if (taskData.important) {
            task.style.color = "rgb(255, 170, 0)";
        } else {
            task.style.color = "white";
        }

        if (!checkbox.checked && onCompleted) {
            task.style.display = "none";
        }
        window.taskAPI.saveTasks(tasks);
    });

    task.addEventListener("click", function (event) {
        if (event.target === checkbox || event.target === deleteBtn) {
            return;
        }
        if (!checkbox.checked) {
            taskData.important = !taskData.important;
            if (taskData.important) {
                task.style.color = "rgb(255, 170, 0)";
            } else {
                task.style.color = "white";
            }
            if (!taskData.important && onImportant) {
                task.style.display = "none";
            }
            window.taskAPI.saveTasks(tasks);
        }
    });

    deleteBtn.addEventListener("click", function () {
        const index = tasks.indexOf(taskData);
        if (index !== -1) {
            tasks.splice(index, 1);
        }
        task.remove();
        window.taskAPI.saveTasks(tasks);
    });

    if (onCompleted && !taskData.completed) {
        task.style.display = "none";
    }
    if (onImportant && !taskData.important) {
        task.style.display = "none";
    }
}

button.addEventListener("click", function () {
    const text = taskInput.value.trim();
    if (text === "" || tasks.some(t => t.text.toLowerCase() === text.toLowerCase())) {
        return;
    }

    const newTask = {
        text: text,
        completed: false,
        task: null,
        important: false
    };

    tasks.push(newTask);
    createTaskElement(newTask);
    taskInput.value = "";
    window.taskAPI.saveTasks(tasks);
});

completedBtn.addEventListener("click", function () {
    if (!onCompleted) {
        for (let i = 0; i < tasks.length; i++) {
            if (!tasks[i].completed) {
                tasks[i].task.style.display = "none";
            } else {
                tasks[i].task.style.display = "list-item";
            }
        }
        onCompleted = true;
        onImportant = false;
    } else {
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].task.style.display = "list-item";
        }
        onCompleted = false;
    }
});

allBtn.addEventListener("click", function () {
    for (let i = 0; i < tasks.length; i++) {
        tasks[i].task.style.display = "list-item";
    }
    onCompleted = false;
    onImportant = false;
});

importantBtn.addEventListener("click", function () {
    if (!onImportant) {
        for (let i = 0; i < tasks.length; i++) {
            if (!tasks[i].important) {
                tasks[i].task.style.display = "none";
            } else {
                tasks[i].task.style.display = "list-item";
            }
        }
        onImportant = true;
        onCompleted = false;
    } else {
        for (let i = 0; i < tasks.length; i++) {
            tasks[i].task.style.display = "list-item";
        }
        onImportant = false;
    }
});

window.taskAPI.loadTasks((savedTasks) => {
    if (!savedTasks || !Array.isArray(savedTasks)) {
        return;
    }
    tasks = [];
    taskList.innerHTML = "";
    savedTasks.forEach(element => {
        const taskData = {
            text: element.text,
            completed: element.completed,
            task: null,
            important: element.important
        };
        tasks.push(taskData);
        createTaskElement(taskData);
    });
});