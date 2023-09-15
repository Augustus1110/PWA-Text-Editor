const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');


module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    // Added and configured workbox plugins for a service worker and manifest file.
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'PWA Text Editor'
      }),
     
      // Injected the custom service worker.
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'src-sw.js',
      }),

      // Created a manifest (which is basically a .json file that will be cached)
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name: 'PWA Text Editor',
        short_name: 'Text Editor',
        description: 'Write text offline',
        background_color: '#225ca3',
        theme_color: '#225ca3',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512], //sizes my logo.
            destination: path.join('assets', 'icons'), // inserts logo into cached assets in my inspect.
          },
        ],
      }),
      
    ],
    // Added CSS loaders and babel to webpack.
    module: {
      rules: [
        {
          test: /\.css$/i, // This is a regular expression that looks for CSS files. The "i" means case insensitive.
          use: ['style-loader', 'css-loader'], // These are brought in through the package.json file.
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          // Babel-loader translates ES5 into ES6.
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-proposal-object-rest-spread', '@babel/transform-runtime'],
            },
          },
        },
      ],
    },
  };
};
