import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import themePluginConfig from './themePluginConfig';
const { pwa } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const { ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION } = process.env;
const isAntDesignProPreview = ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site';
const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      dynamicImport: {
        loadingComponent: './components/PageLoading/index',
        webpackChunkName: true,
        level: 3,
      },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
];

if (isAntDesignProPreview) {
  // 针对 preview.pro.ant.design 的 GA 统计代码
  plugins.push([
    'umi-plugin-ga',
    {
      code: 'UA-72788897-6',
    },
  ]);
  plugins.push(['umi-plugin-antd-theme', themePluginConfig]);
}

export default {
  plugins,
  hash: true,
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/user',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/user/login',
          component: './user/login',
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/welcome',
        },
        {
          name: '工作台',
          icon: 'smile',
          path: '/welcome/workplace',
          component: './workplace',
        },
        {
          path: '/welcome',
          name: 'welcome',
          icon: 'smile',
          component: './Welcome',
        },
        {
          path: '/admin',
          name: 'admin',
          icon: 'crown',
          component: './Admin',
        },
        {
          name: 'articlemange',
          icon: 'smile',
          path: '/articlemange',
          routes: [
            {
              name: 'translate',
              icon: 'smile',
              path: '/articlemange/translate',
              component: './articlemange/translate',
            },
            {
              name: 'article',
              icon: 'smile',
              path: '/articlemange/article',
              component: './articlemange/article',
            },
            {
              name: 'articleInfo',
              icon: 'smile',
              path: '/articlemange/article/articleInfo',
              component: './articlemange/article/articleInfo',
              hideInMenu: true,
            },
            {
              name: 'taglist',
              icon: 'smile',
              path: '/articlemange/taglist',
              component: './articlemange/tag',
            },
          ],
        },
        {
          name: 'system',
          icon: 'setting',
          path: '/system',
          routes: [
            {
              name: 'system set',
              icon: 'smile',
              path: '/system/system',
              component: './system',
            },
            {
              name: 'profile',
              icon: 'smile',
              path: '/system/profile',
              component: './profile',
            },
            {
              name: 'userList',
              path: '/system/userList',
              component: './system/userList',
            },
          ],
        },
        {
          name: '权限',
          icon: 'smile',
          path: '/permission',
          component: './permission',
        },
        {
          name: '角色 ',
          icon: 'smile',
          path: '/role',
          component: './role',
        },
        {
          name: 'menu',
          icon: 'smile',
          path: '/menu',
          component: './menu',
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
  },
  define: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION:
      ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION || '', // preview.pro.ant.design only do not use in your production ; preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。
  },
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  // chainWebpack: webpackPlugin,
  // proxy: {
  proxy: {
    '/api/': {
      target: 'http://localhost:9000/',
      changeOrigin: true,
      pathRewrite: {
        '': '',
      },
    },
    '/articlemange/api/': {
      target: 'http://localhost:9000/',
      changeOrigin: true,
      pathRewrite: {
        'articlemange/api/': 'api/',
      },
    },
    '/articlemange/article/api/': {
      target: 'http://localhost:9000/',
      changeOrigin: true,
      pathRewrite: {
        'articlemange/article/api/': 'api/',
      },
    },
    '/user/api/': {
      target: 'http://localhost:9000/',
      changeOrigin: true,
      pathRewrite: {
        'user/api/': 'api/',
      },
    },
  },
};
