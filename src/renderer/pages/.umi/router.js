import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import { routerRedux } from 'dva/router';



let Router = DefaultRouter;
const { ConnectedRouter } = routerRedux;
Router = ConnectedRouter;


let routes = [
  {
    "path": "/",
    "component": require('../../layouts/index.tsx').default,
    "routes": [
      {
        "path": "/Welcome",
        "exact": true,
        "component": require('../Welcome.tsx').default
      },
      {
        "path": "/article/add",
        "exact": true,
        "component": require('../article/add.tsx').default
      },
      {
        "path": "/images",
        "exact": true,
        "component": require('../images.js').default
      },
      {
        "path": "/",
        "exact": true,
        "component": require('../index.js').default
      },
      {
        "component": () => React.createElement(require('/Users/harryhuang/MMG/demo/react-umi-dva-typescript-electron/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', routes: '[{"path":"/","component":"./layouts/index.tsx","routes":[{"path":"/Welcome","exact":true,"component":"./pages/Welcome.tsx"},{"path":"/article/add","exact":true,"component":"./pages/article/add.tsx"},{"path":"/images","exact":true,"component":"./pages/images.js"},{"path":"/","exact":true,"component":"./pages/index.js"}]}]' })
      }
    ]
  }
];


export default function() {
  return (
<Router history={window.g_history}>
  <Route render={({ location }) =>
    renderRoutes(routes, {}, { location })
  } />
</Router>
  );
}
