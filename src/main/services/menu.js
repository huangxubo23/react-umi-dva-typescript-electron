import { Menu, dialog, ipcMain } from 'electron';
import log from 'electron-log';

function getTemplate() {
  return [
    {
      label: 'MyApp',
      submenu: [
        { role: 'hide', label: '隐藏' },
        { role: 'hideothers', label: '隐藏其它应用' },
        { role: 'unhide', label: '显示全部' },
        { type: 'separator' },
        { role: 'quit', label: '退出' },
      ],
    },
    {
      label: '操作',
      submenu: [
        {
          label: '上一步',
          click: (item, focusedWindow) => {
            focusedWindow.webContents.send('router-goback');
          }
        }, {
          label: '下一步',
          click: (item, focusedWindow) => {
            focusedWindow.webContents.send('router-goforward');
          }
        }, {
          type: 'separator'
        }, {
          label: '弹框',
          click: (item, focusedWindow) => {
            console.info(item, focusedWindow);
            dialog.showMessageBox({
              title: 'MMG',
              type: 'info',
              message: '这是一个弹框',
            });
          }
      }]
    },
    // {
    //   label: 'Edit',
    //   submenu: [
    //     { role: 'undo' },
    //     { role: 'redo' },
    //     { type: 'separator' },
    //     { role: 'cut' },
    //     { role: 'copy' },
    //     { role: 'paste' },
    //     { role: 'selectall' },
    //   ],
    // },
    // {
    //   label: 'View',
    //   submenu: [
    //     { role: 'reload' },
    //     { role: 'toggledevtools' },
    //     { type: 'separator' },
    //     { role: 'togglefullscreen' },
    //   ],
    // },
    {
      role: 'window',
      label: '窗口',
      submenu: [
        { role: 'minimize', label: '最小化' },
        { role: 'close', label: '关闭窗口' },
      ],
    },
  ];
}

export function init() {
  log.info('(menu) init');
  const menu = Menu.buildFromTemplate(getTemplate());
  Menu.setApplicationMenu(menu);
}
