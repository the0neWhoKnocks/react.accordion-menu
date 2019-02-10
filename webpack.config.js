const { resolve } = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');

const HASH_LENGTH = 5;
const OUTPUT_DIR = 'example/dist';
const stats = {
  chunks: false,
  colors: true,
  errors: true,
  errorDetails: true,
  modules: false,
};

module.exports = {
  devServer: {
    clientLogLevel: 'none', // kill client socket logs
    compress: true, // gzips responses
    headers: {
      'Cache-Control': 'max-age=60000', // allow for images to be cached to truly validate caching and loading
    },
    port: 3001,
    stats: stats,
  },
  entry: {
    example: resolve(__dirname, './example/src/index.js'),
    module: resolve(__dirname, './src/index.js'),
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/,
      },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: resolve(__dirname, 'node_modules'),
          name: 'vendor',
          enforce: true,
        },
      },
    },
  },
  output: {
    path: resolve(__dirname, OUTPUT_DIR),
    // assigns the hashed name to the file
    filename: `[name]_[chunkhash:${ HASH_LENGTH }].js`,
    // Point sourcemap entries to original disk location (format as URL on Windows)
    devtoolModuleFilenameTemplate: info => resolve(info.absoluteResourcePath).replace(/\\/g, '/'),
  },
  plugins: [
    new CleanWebpackPlugin([
      `${ OUTPUT_DIR }/*.*`,
    ], {
      
    }),
    /**
     * Gives more control of how bundles are hashed
     */
    new webpack.HashedModuleIdsPlugin({
      hashDigestLength: HASH_LENGTH,
    }),
    /**
     * Wires up the example HTML with generated bundles
     */
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: resolve(__dirname, './example/src/index.html'),
    }),
    /**
     * Provides build progress in the CLI
     */
    new SimpleProgressWebpackPlugin({
      format: 'minimal',
    }),
  ],
  resolve: {
    extensions: ['.js'],
  },
  stats: stats,
};