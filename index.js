const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const js_path = __dirname + '/scripts'
const compiler = webpack({
  entry: {
    // 'webpack/hot/dev-server',
    // 'webpack-hot-middleware/client',
    'global': `${js_path}/global.js`,
    'test': `${js_path}/test.js`,
  },
  mode: 'development',
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
    publicPath: '/assets-mall/javascripts/'
    // webpack-dev-middleware options
  })
);

app._router.stack.forEach(function(r){
  if (r.route && r.route.path){
    console.log(r.route.path)
  }
})

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + '/view/index.html')
})

app.listen(5000, () => console.log('Example app listening on port 5000!'));