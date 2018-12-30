// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain } = require("electron");
const RPC = require("discord-rpc");
const cId = "0000000000000000000"; // Replace with whatever clientID you happen to want to use.
const client = new RPC.Client({ transport: "ipc" });


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;
var toggle = true;

//
//  Electron Window
//

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 347, height: 250, transparent:true, frame: false});

  // and load the index.html of the app.
  
  mainWindow.loadFile("index.html");

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

//
//  Discord Rich Presence
//

ipcMain.on("asynchronous-message", (event, arg) => {
  console.log(arg);

  switch (arg) {
    case "home":
      return client.setActivity({
        details: "He's at Home",
        largeImageKey: "home", // Standard key for general "home" setting
        largeImageText: "Relaxing",
        instance: true,
      });
      break;
      
    case "homebusy":
      return client.setActivity({
        details: "He's busy at Home",
        largeImageKey: "home", 
        largeImageText: "Doing Stuff",
        smallImageKey: "busy",
        smallImageText: "Busy",
        instance: true,
      });

      break;
    case "homesleep":
      return client.setActivity({
        details: "He's at Home",
        largeImageKey: "home",
        largeImageText: "I'm Asleep",
        smallImageKey: "bed",
        smallImageText: "Asleep",
        instance: true,
      });
      break;
    
    case "work":
      return client.setActivity({
        details: "He's at Work",
        startTimestamp: new Date(),
        largeImageKey: "xxx", // Replace with whatever you want to present as your work place, either a logo etc.
        largeImageText: "Working at Such-Such", // Replace with whatever you want to call your work.
        instance: true,
      });
      break;

    case "else":
      return client.setActivity({
        details: "He's at another Castle", // Basically if you decided not to add another place in, just a general placeholder.
        largeImageKey: "unknown",
        largeImageText: "This is a box",
        instance: true,
      });
      break;
  }
});

client.on("ready", () => {
  console.log("Authed for user", client.user.username); // Authed for whatever your username is.
});

// Log in to RPC with client id
client.login({ clientId: cId}).catch(e => console.log(e));

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
