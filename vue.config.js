const webpack = require('webpack');


module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  // ? '/'
  // : '/',
  devServer: {
    proxy: {
      '^/auth/': {
        // target: 'http://ec2-54-242-72-201.compute-1.amazonaws.com:8080',
        target:'http://pangtudy.xyz:8000',
        changeOrigin: true
      },
      '^/users': {
        // target: 'http://ec2-54-242-72-201.compute-1.amazonaws.com:8080',
        target: 'http://pangtudy.xyz:8000/user',
        changeOrigin: true
      }
    }

  },
  configureWebpack: {
    // Set up all the aliases we use in our app.

    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ],

  },

  pwa: {
    name: 'Vue Argon Design',
    themeColor: '#172b4d',
    msTileColor: '#172b4d',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#172b4d'
  },

  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },

  transpileDependencies: [
    'vuetify'
  ]
};
