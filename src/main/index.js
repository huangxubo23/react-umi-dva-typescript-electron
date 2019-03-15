import { app, BrowserWindow, ipcMain, ipcRenderer, dialog, remote } from 'electron';
import { join } from 'path';
import is from 'electron-is';
import log from 'electron-log';
import * as application from './services/application';
import * as window from './services/window';
import * as menu from './services/menu';
import * as config from './configs/config';

log.transports.file.level = 'info';

log.info('(main/index) app start');
log.info(`(main/index) log file at ${log.transports.file.file}`);

console.log('test test', is);
if (is.dev()) {
  require('electron-debug')(); // eslint-disable-line global-require
}

app.on('ready', () => {
  log.info('(main/index) app ready');
  application.init();
  menu.init();

  // 加载 devtools extension
  if (is.dev()) {
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (window.getCount() === 0) {
    application.init();
  }
});

app.on('quit', () => {
  log.info('(main/index) app quit');
  log.info('(main/index) <<<<<<<<<<<<<<<<<<<');
});

ipcMain.on('open-file-dialog', (event) => {
  dialog.showOpenDialog({
    // properties: ['openFile', 'openDirectory'],
    filters: [
      {
        name: '图片', extensions: ['jpg', 'png', 'gif'],
        name: '视频', extensions: ['mkv', 'avi', 'mp4'],
        name: '全部', extensions: ['*']
      }
    ]
  }, (files) => {
    if(files) event.sender.send('selected-directory', files);
  })
})

// Register to global, so renderer can access these with remote.getGlobal
global.services = {
  application,
  window,
};
global.configs = {
  config,
};
