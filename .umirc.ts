import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  base: '/MathJaxPlayground/',
  publicPath: '/MathJaxPlayground/',
  treeShaking: true,
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    'umi-plugin-gh-pages',
    ['umi-plugin-react', {
      antd: true,
      dva: false,
      dynamicImport: { webpackChunkName: true },
      title:{defaultTitle: 'MathJaxPlayground'},
      dll: true,
      locale: {
        enable: true,
        default: 'en-US',
      },
      routes: {
        exclude: [
          /components\//,
        ],
      },
      pwa: {
        importWorkboxFrom: 'local'
      },
    }],
  ],
}

export default config;
