import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';
import createStyledComponentsTransformer from 'typescript-plugin-styled-components';

// This is to get React component names in generated CSS classes
const styledComponentsTransformer = createStyledComponentsTransformer();

const config: webpack.Configuration = {
  entry: './src/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        exclude: /node_module/,
        options: {
          getCustomTransformers: () => ({ before: [styledComponentsTransformer] })

        }
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
      {
        test: /\.(png|svg|jpg|gif)$/,
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
        { from: 'src/icons/', to: 'icons' },
        'src/manifest.webmanifest'
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Stockholms Lokaltrafik',
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