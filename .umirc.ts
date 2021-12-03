import { defineConfig } from 'umi';

export default defineConfig({
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
