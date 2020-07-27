import common from '../webpack.common';
import webpack from 'webpack';
import { merge } from "webpack-merge";

const config = {
  stories: ['../src/**/*.stories.tsx'],
  webpackFinal: async (config: webpack.Configuration) => {
    return merge(common, config)
  },
}

export default config;