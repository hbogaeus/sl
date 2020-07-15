import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from "html-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import secrets from './secrets.json';

const baseSlUrl = "https://api.sl.se/api2"

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  devtool: 'inline-source-map',
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
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_module/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader',
        ],
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        'src/manifest.webmanifest'
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'SL',
      template: 'src/index.html'
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  }
}

export default config;
