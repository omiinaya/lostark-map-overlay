import { app, BrowserWindow, globalShortcut, Menu, Tray } from 'electron';
import * as path from 'path';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

let tray = null;

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    title: "Lost Ark Map",
    icon: path.join(__dirname, 'assets', 'favicon.ico'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false
    },
    fullscreenable: true,
    autoHideMenuBar: true,
    frame: false,
    transparent: true,
    resizable: false,
    skipTaskbar: true,
  });

  mainWindow.setAlwaysOnTop(true, 'screen-saver');
  mainWindow.setMinimizable(false);
  mainWindow.setFullScreen(true);
  mainWindow.setVisibleOnAllWorkspaces(true);
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  globalShortcut.register('CmdOrCtrl + H', () => {
    mainWindow.webContents.send('visibility-change', false);
  });
};

app.disableHardwareAcceleration();
app.on('ready', createWindow);
app.whenReady().then(() => {

  const iconPath = path.join(__dirname, 'assets', 'favicon.ico')
  tray = new Tray(iconPath);

  const contextMenu = Menu.buildFromTemplate([
    { label: 'Exit', 'click': app.quit }
  ]);

  tray.setToolTip('Lostark Map Overlay');
  tray.setContextMenu(contextMenu);

});