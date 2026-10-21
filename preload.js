const {contextBridge, ipcRenderer} = require('electron')

contextBridge.exposeInMainWorld('taskAPI', {
    test: () => {
        console.log("Мост работает");
    },
    saveTasks: (tasks) => {
        ipcRenderer.send('save-tasks', tasks);
    }
})
