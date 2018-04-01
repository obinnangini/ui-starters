const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const eslintFormatter = require('eslint-friendly-formatter');

const nodeEnv = process.env.NODE_ENV;
const common = {

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['.js', '.html', '.json', '.css', '.scss'],
  },

  module: {
    rules: [
      {
        test: /\.(js)$/,
        enforce: 'pre',
        exclude: /node_modules/,
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: eslintFormatter,
            },
          },
        ],
      },
      {
        test: /\.(html)$/,
        loader: 'htmlhint-loader',
        enforce: 'pre',
      },
      {
        test: /\.(js)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(html)$/,
        loader: 'html-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        use: 'file-loader',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(nodeEnv),
      },
    }),
    new webpack.NamedModulesPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    // }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
    }),
  ],
};

const dev = {
  entry: [
    'babel-polyfill',
    'isomorphic-fetch',
    'react-hot-loader/patch',
    path.join(__dirname, 'src', 'index.js'),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    historyApiFallback: true,
    noInfo: true,
    host: '0.0.0.0',
    hot: true,
    port: 9000,
    proxy: {
      '/api': 'http://localhost:8005',
    },
    stats: 'errors-only',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
};

const prod = {
  entry: [
    'babel-polyfill',
    'isomorphic-fetch',
    path.join(__dirname, 'src', 'index.js'),
  ],
  devtool: 'source-map',

  output: {
    filename: '[name].[chunkhash].js',
  },

  bail: true,

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'style-loader',
        ],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          // 'resolve-url-loader',
          'sass-loader?sourceMap',
        ],
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash].css',
      chunkFilename: '[id].css',
    }),
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
};

console.log('NODE_ENV:', nodeEnv);
switch (nodeEnv) {
  case 'development':
    module.exports = merge(common, dev);
    break;
  case 'production':
    module.exports = merge(common, prod);
    break;
  default:
    // eslint-disable-next-line no-console
    console.error(`ERROR: NODE_ENV ${nodeEnv} is not valid in webpack config!`);
    break;
}
