import { defineConfig } from 'umi';

export default defineConfig({
  base: '/MathJaxPlayground/',
  publicPath: '/MathJaxPlayground/',
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  locale: {
    default: 'en-US',
    antd: true,
    title: true,
    baseNavigator: true,
    baseSeparator: '-',
  },
});
