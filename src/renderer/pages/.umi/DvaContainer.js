import { Component } from 'react';
import dva from 'dva';
import createLoading from 'dva-loading';

let app = dva({
  history: window.g_history,
  
});

window.g_app = app;
app.use(createLoading());
app.use(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'g', ...(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/src/renderer/models/g.js').default) });
app.model({ namespace: 'global', ...(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/src/renderer/models/global.ts').default) });
app.model({ namespace: 'images', ...(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/src/renderer/models/images.ts').default) });
app.model({ namespace: 'menu', ...(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/src/renderer/models/menu.ts').default) });
app.model({ namespace: 'setting', ...(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/src/renderer/models/setting.ts').default) });
app.model({ namespace: 'user', ...(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/src/renderer/models/user.ts').default) });

class DvaContainer extends Component {
  render() {
    app.router(() => this.props.children);
    return app.start()();
  }
}

export default DvaContainer;
