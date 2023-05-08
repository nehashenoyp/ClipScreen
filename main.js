const { app, BrowserWindow } = require ('electron')
const path = require('path');

function createWindow(){
     //Creating Browser Window
     const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            preload: path.join(__dirname, 'preload.js')
          }          
     })
     win.loadFile('src/index.html')

     //Opening DevTools
     win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

//Quiting when all the windows are closed
app.on('window-all-closed', ()=>{
    if (process.platform !== 'darwin'){
        app.quit()
    }
})

app.on('activate',()=>{
    if(BrowserWindow.getAllWindows().length==0){
        createWindow()
    }
})
