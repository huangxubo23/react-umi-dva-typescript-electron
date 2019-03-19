import { create, getPath } from './window';

export function init() {
  const win = create({ width: 1024, height: 800 });
  // win.maximize();
  win.loadURL(getPath());
}
