console.log("JS работает");

const taskInput = document.getElementById("taskEnter");
const taskList = document.getElementById("taskList");

const button = document.querySelector(".newTask");
const completed = document.querySelector(".completed")

let tasks = [];

button.addEventListener("click",function(){
    if (taskInput.value.trim() !== "" && !tasks.some(task => task.text.toLowerCase() === taskInput.value.trim().toLowerCase())){
    
    let newTask =  {
        text: taskInput.value.trim(),
        completed: false
    };

    tasks.push(newTask);

    //Создание задачи в списке
    const task = document.createElement("li");
    task.textContent = taskInput.value.trim();
    taskList.appendChild(task);
    taskInput.value = "";
    
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
}
})