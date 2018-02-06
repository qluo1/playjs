// webpack.config
//
const path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
     },

    devServer: {
          contentBase: path.join(__dirname, "dist"),
          compress: true,
          host: '0.0.0.0',
          port: 9000,
          disableHostCheck: true

    },

    module: {

     loaders: [
               { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
               { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
     ]
    }
};
