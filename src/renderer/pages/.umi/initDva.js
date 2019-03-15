import dva from 'dva';
import createLoading from 'dva-loading';

const runtimeDva = window.g_plugins.mergeConfig('dva');
let app = dva({
  history: window.g_history,
  
  ...(runtimeDva.config || {}),
});

window.g_app = app;
app.use(createLoading());
(runtimeDva.plugins || []).forEach(plugin => {
  app.use(plugin);
});
app.use(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/node_modules/dva-immer/lib/index.js').default());
app.model({ namespace: 'g', ...(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/src/renderer/models/g.js').default) });
app.model({ namespace: 'images', ...(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/src/renderer/models/images.js').default) });
