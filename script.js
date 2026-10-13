console.log("JS работает");

const taskInput = document.getElementById("taskEnter");
const taskList = document.getElementById("taskList");

const button = document.querySelector(".newTask");
const completedBtn = document.querySelector(".completed")

let tasks = [];

button.addEventListener("click",function(){
    if (taskInput.value.trim() !== "" && !tasks.some(task => task.text.toLowerCase() === taskInput.value.trim().toLowerCase())){
    
    let newTask =  {
        text: taskInput.value.trim(),
        completed: false,
        task: null
    };

    tasks.push(newTask);

    //Создание задачи в списке
    const task = document.createElement("li");
    task.textContent = taskInput.value.trim();
    taskList.appendChild(task);
    taskInput.value = "";
    newTask.task = task;
    
    //Галочка отмечающая выполнение
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"
    task.appendChild(checkbox);
    checkbox.dataset.taskIndex =tasks.length-1;

    checkbox.addEventListener("change", function(){
        newTask.completed = checkbox.checked;
        if(checkbox.checked === true){
            task.style.color = "rgb(13, 255, 0)";
        }else{
            task.style.color = "white";
        }

        if(checkbox.checked === false && onCompleted === true){
            task.style.display = "none";
        }
    })

    //Конпка удаления задачи
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
}

})

