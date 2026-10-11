console.log("JS работает");

const taskInput = document.getElementById("taskEnter");
const taskList = document.getElementById("taskList");

const button = document.querySelector(".newTask");

let tasks = [];

button.addEventListener("click",function(){
    if(taskInput.value.trim() !== ""){
    tasks.push({
        text: taskInput.value,
        completed: false})

    const task = document.createElement("li");
    task.textContent = taskInput.value;
    taskList.appendChild(task);
    taskInput.value = "";
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    task.appendChild(checkbox);
    checkbox.dataset.taskIndex =tasks.length-1;
    console.log(checkbox.dataset.taskIndex);
    
    checkbox.addEventListener("change", function(){
    tasks[checkbox.dataset.taskIndex].completed = checkbox.checked;
    if(checkbox.checked === true){
        task.style.color = "rgb(13, 255, 0)";
    }else{
        task.style.color = "white";
    }
    console.log(tasks[checkbox.dataset.taskIndex]);
    })}
})

