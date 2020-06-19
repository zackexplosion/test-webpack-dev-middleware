const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const js_path = __dirname + '/scripts'
const compiler = webpack({
  entry: {
    // 'webpack/hot/dev-server',
    // 'webpack-hot-middleware/client',
    'global': `${js_path}/global.js`,
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build',
    publicPath: '/assets-mall/javascripts/'
  },
  module:{
    rules:[
      {
        test: /\.js$/,
        loader: 'babel-loader'
      }
    ]
  }
});
const express = require('express');
const app = express();

app.use(
  middleware(compiler, {
    // webpack-dev-middleware options
  })
);

app.listen(5000, () => console.log('Example app listening on port 5000!'));