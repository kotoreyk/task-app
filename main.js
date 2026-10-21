const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')
const fs = require('node:fs')

let tasksFilePath = path.join(__dirname, 'tasks.json')

fs.readFile(tasksFilePath, 'utf8', (ошибка, tasksJSON) => {
    if(ошибка){
            console.error(ошибка);
        }else{
            let loadedTasks = JSON.parse(tasksJSON);
            console.log(loadedTasks);
        }
})

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html');
}

ipcMain.on('save-tasks', (event, tasks) => {
    let tasksToSave = tasks.map(task => ({
        text: task.text,
        completed: task.completed,
        important: task.important}
    ));

    let tasksJSON = JSON.stringify(tasksToSave, null, 2);
    console.log(tasksJSON);

    fs.writeFile(tasksFilePath, tasksJSON, (ошибка) => {
        if(ошибка){
            console.error(ошибка);
        }else{
            console.log("запись успешна");
        }
    })
})



app.whenReady().then(() => {
    createWindow();
})                                                                                                                                                                          