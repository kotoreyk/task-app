console.log("JS работает");

const taskInput = document.getElementById("taskEnter");

const button = document.querySelector(".newTask");

const taskList = document.getElementById("taskList");

let tasks = [];

button.addEventListener("click",function(){
    tasks.push(taskInput.value)
    const task = document.createElement("li");
    task.textContent = taskInput.value;
    taskList.appendChild(task);
    taskInput.value = "";
})