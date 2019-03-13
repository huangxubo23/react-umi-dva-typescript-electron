import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';
import _dvaDynamic from 'dva/dynamic'

let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/",
    "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "layouts__index" */'../../layouts/index.tsx'),
  
}),
    "routes": [
      {
        "path": "/Main/users",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__Main__users" */'../Main/users.tsx'),
  
}),
        "_title": "mmg-demo",
        "_title_default": "mmg-demo"
      },
      {
        "path": "/User/login",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__User__login" */'../User/login.tsx'),
  
}),
        "_title": "mmg-demo",
        "_title_default": "mmg-demo"
      },
      {
        "path": "/User/register",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__User__register" */'../User/register.tsx'),
  
}),
        "_title": "mmg-demo",
        "_title_default": "mmg-demo"
      },
      {
        "path": "/User/:id",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__User__$id" */'../User/$id.tsx'),
  
}),
        "_title": "mmg-demo",
        "_title_default": "mmg-demo"
      },
      {
        "path": "/",
        "exact": true,
        "component": _dvaDynamic({
  
  component: () => import(/* webpackChunkName: "p__index" */'../index.tsx'),
  
}),
        "_title": "mmg-demo",
        "_title_default": "mmg-demo"
      },
      {
        "component": () => React.createElement(require('/Users/harryhuang/MMG/demo/mmg-demo/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
        "_title": "mmg-demo",
        "_title_default": "mmg-demo"
      }
    ],
    "_title": "mmg-demo",
    "_title_default": "mmg-demo"
  },
  {
    "component": () => React.createElement(require('/Users/harryhuang/MMG/demo/mmg-demo/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'src/pages', hasRoutesInConfig: false }),
    "_title": "mmg-demo",
    "_title_default": "mmg-demo"
  }
];
window.g_routes = routes;
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

// route change handler
function routeChangeHandler(location, action) {
  window.g_plugins.applyForEach('onRouteChange', {
    initialValue: {
      routes,
      location,
      action,
    },
  });
}
window.g_history.listen(routeChangeHandler);
routeChangeHandler(window.g_history.location);

export default function RouterWrapper() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
