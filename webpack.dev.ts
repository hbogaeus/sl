import webpack from 'webpack';
import { merge } from "webpack-merge";
import common from './webpack.common';
import secrets from './secrets.json';

const baseSlUrl = "https://api.sl.se/api2"

const config: webpack.Configuration = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    // host: '0.0.0.0',
    // disableHostCheck: true,
    proxy: {
      '/api': {
        target: baseSlUrl,
        changeOrigin: true,
        pathRewrite: (path) => {
          let rewrittenPath = path.replace('/api', '');

          if (rewrittenPath.includes('typeahead')) {
            rewrittenPath += `&key=${secrets.locationSearchApiKey}`;
          } else if (rewrittenPath.includes('TravelplannerV3_1')) {
            rewrittenPath += `&key=${secrets.tripPlannerApiKey}`;
          }

          return rewrittenPath;
        }
      }
    }
  },
});

export default config;
