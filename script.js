console.log("JS работает");

const taskInput = document.getElementById("taskEnter");
const taskList = document.getElementById("taskList");

const button = document.querySelector(".newTask");
const completedBtn = document.querySelector(".completed");
const allBtn = document.querySelector(".all");
const importantBtn = document.querySelector(".important");

let tasks = [];

button.addEventListener("click",function(){
    if (taskInput.value.trim() !== "" && !tasks.some(task => task.text.toLowerCase() === taskInput.value.trim().toLowerCase())){
    
    let newTask =  {
        text: taskInput.value.trim(),
        completed: false,
        task: null,
        important: false
    };

    tasks.push(newTask);

    const task = document.createElement("li");
    task.textContent = taskInput.value.trim();
    taskList.appendChild(task);
    taskInput.value = "";
    newTask.task = task;
    
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    task.appendChild(checkbox);
    checkbox.dataset.taskIndex =tasks.length-1;

    checkbox.addEventListener("change", function(){
        newTask.completed = checkbox.checked;
        if(checkbox.checked === true){
            task.style.color = "rgb(13, 255, 0)";
        }else if(newTask.completed === false && newTask.important === false){
            task.style.color = "white";
        }else if(newTask.completed === false && newTask.important === true){
            task.style.color = "rgb(255, 170, 0)";
        }

        if(checkbox.checked === false && onCompleted === true){
            task.style.display = "none";
        }
    })
    
    task.addEventListener("click", function(event){
        if(event.target === checkbox || event.target === deleteBtn){

        }else{
            if(checkbox.checked === false){
                if(newTask.important !== true){
                newTask.important = true;
                task.style.color = "rgb(255, 170, 0)";
                console.log("newTask.important = true;");
                }else{
                newTask.important = false;
                task.style.color = "white";
                console.log("newTask.important = false;");
                }

                if(newTask.important === false && onImportant === true){
                task.style.display = "none";
                }
            }
        }
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.className = 'delete-btn';
    deleteBtn.innerHTML = '&times;';
    task.appendChild(deleteBtn);
    
    deleteBtn.addEventListener("click", function(){
        let deleteTask = tasks.indexOf(newTask);
        tasks.splice(deleteTask,1);
        task.remove();
    })

    let onCompleted = false;
    completedBtn.addEventListener("click", function(){
        if(onCompleted === false){
            for(let i = 0; i < tasks.length; i++){
                if(tasks[i].completed === false){
                    tasks[i].task.style.display = "none";
                }
            }
            onCompleted = true;
        }else{
            for(let i = 0; i < tasks.length; i++){
             tasks[i].task.style.display = "list-item";
            }onCompleted = false;
        }
    })

    allBtn.addEventListener("click", function(){
        for(let i = 0; i < tasks.length; i++){
             tasks[i].task.style.display = "list-item";
            }
        onCompleted = false;
    })

    let onImportant = false;
    importantBtn.addEventListener("click", function(){
        if(onImportant === false){
            for(let i = 0; i < tasks.length; i++){
                if(tasks[i].important === false){
                    tasks[i].task.style.display = "none";
                }
            }onImportant = true;
        }else{
            for(let i = 0; i < tasks.length; i++){
                if(tasks[i].important === false){
                    tasks[i].task.style.display = "list-item";
                }
            }onImportant = false;
        }
    })

    
}

})

