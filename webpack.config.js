const { resolve } = require('path');
const webpack = require('webpack');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const TidyPlugin = require('@noxx/webpack-tidy-plugin');
const repoConf = require('./conf.repo');

const HASH_LENGTH = 5;
const OUTPUT_DIR = 'example/dist';
const stats = {
  chunks: false,
  colors: true,
  errors: true,
  errorDetails: true,
  modules: false,
};

const conf = {
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
    new TidyPlugin({
      cleanOutput: true,
      hashLength: HASH_LENGTH,
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
      template: resolve(__dirname, './example/src/template.js'),
    }),
    /**
     * Generate a manifest file which contains a mapping of all asset filenames
     * to their corresponding output file so that tools can load them without
     * having to know the hashed name.
     */
    new WebpackAssetsManifest({
      sortManifest: false,
      writeToDisk: true,
    }),
    /**
     * Provides build progress in the CLI
     */
    new SimpleProgressWebpackPlugin({
      format: 'minimal',
    }),
  ],
  resolve: {
    alias: {},
    extensions: ['.js'],
  },
  stats: stats,
};

// Add paths to webpack as alias'. This will allow us to `import` or `require` a
// path via a constant rather than having to use `../../etc/`.
for(let alias in repoConf.webpack.aliases){
  conf.resolve.alias[alias] = repoConf.webpack.aliases[alias];
}

module.exports = conf;
