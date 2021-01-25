const { app, BrowserWindow } = require('electron')


function createWindow () {
  const win = new BrowserWindow({
    width: 1500,
    height: 800,
    webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
    }
  })
  console.log("On a cree une fenetre de app process");
  var python = require('child_process').spawn('python', ['./code_python/graph.py']);
  python.stdout.on('data',function(data){
      console.log("data: ",data.toString('utf8'));
  });
  win.loadFile('html/index.html');

  win.on("closed", () => {
      //win = null;
  });
  //win.webContents.openDevTools()
  //win.setMenu(null) 
}
/*
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  //if (BrowserWindow.getAllWindows().length === 0) {
  //   createWindow()
  //}
})*/

module.exports = createWindow;