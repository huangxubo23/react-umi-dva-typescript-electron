import { join } from 'path';
import slash from 'slash';
import { primaryColor } from './defaultSettings';

export default {
  // disableServiceWorker: true,
  disableDynamicImport: true,
  // hashHistory: true,
  publicPath: './static/',
  outputPath: '../../app/dist/renderer',
  plugins: [
    ['umi-plugin-dva', {
      immer: true,
      antd: true,
      dva: {
        hmr: true,
      },
      // targets: {
      //   ie: 11,
      // },
      // locale: {
      //   enable: true, // default false
      //   default: 'zh-CN', // default zh-CN
      //   baseNavigator: true, // default true, when it is true, will use `navigator.language` overwrite default
      // },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
      },
    }],
  ],
  // targets: {
  //   ie: 11,
  // },
  externals(context, request, callback) {
    const isDev = process.env.NODE_ENV === 'development';
    let isExternal = false;
    const load = [
      'electron',
      'fs',
      'path',
      'os',
      'url',
      'child_process'
    ];
    if (load.includes(request)) {
      isExternal = `require("${request}")`;
    }
    const appDeps = Object.keys(require('../../app/package').dependencies);
    if (appDeps.includes(request)) {
      const orininalPath = slash(join(__dirname, '../../app/node_modules', request));
      const requireAbsolute = `require('${orininalPath}')`;
      isExternal = isDev ? requireAbsolute : `require('${request}')`;
    }
    callback(null, isExternal);
  },

   /**
   * 路由相关配置
   */
  // routes: [
  //   {
  //     path: '/user',
  //     component: '../layouts/UserLayout',
  //     routes: [{ path: '/user', component: './Welcome' }],
  //   },
  //   {
  //     path: '/',
  //     component: '../layouts/BasicLayout',
  //     routes: [
  //       { path: '/', redirect: '/welcome' },
  //       // dashboard
  //       {
  //         path: '/welcome',
  //         name: 'welcome',
  //         icon: 'smile',
  //         component: './Welcome',
  //       },
  //       {
  //         path: 'https://github.com/umijs/umi-blocks/tree/master/ant-design-pro',
  //         name: 'more-blocks',
  //         icon: 'block',
  //       },
  //     ],
  //   },
  // ],
  // disableRedirectHoist: true,
  disableDynamicImport: false,

  /**
   * webpack 相关配置
   */
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
  },
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
};
