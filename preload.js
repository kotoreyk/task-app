const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('taskAPI', {
    loadTasks: (callback) => {
        ipcRenderer.on('load-tasks', (event, tasks) => {
            callback(tasks);
        });
    },
    saveTasks: (tasks) => {
        ipcRenderer.send('save-tasks', tasks);
    }
})
