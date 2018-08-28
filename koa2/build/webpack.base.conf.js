
var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var vueLoaderConfig = require('./vue-loader.conf')

var env = process.env.NODE_ENV
    // check env & config/index.js to decide weither to enable CSS Sourcemaps for the
    // various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}


module.exports = {
    entry: {
        app: './src/main.js'
    },
    output: {
        path: config.build.assetsRoot,
        publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
        filename: '[name].js'
    },
    resolve: {
        extensions: ['*', '.js', '.vue', '.less', '.css', '.scss'],
        fallback: [path.join(__dirname, '../node_modules')],
        alias: {
            'muse-components': 'muse-ui/src', //npm包里面的组件引用
            'vue$': 'vue/dist/vue.common.js',
            'src': path.resolve(__dirname, '../src'),
            'assets': path.resolve(__dirname, '../src/assets'),
            'components': path.resolve(__dirname, '../src/components'),
        }
    },
    resolveLoader: {
        fallback: [path.join(__dirname, '../node_modules')]
    },
    module: {
        loaders: [{
            test: /\.vue$/,
            loader: 'vue'
        }, {
            test: /muse-ui.src.*?js$/,
            loader: 'babel'
        }, {
            test: /\.js$/,
            loader: 'babel',
            include: projectRoot,
            exclude: /node_modules/
        }, {
            test: /\.json$/,
            loader: 'json'
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('img/[name].[ext]')
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url',
            query: {
                limit: 10000,
                name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
            }
        }]
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: useCssSourceMap
        }),
        postcss: [
            require('autoprefixer')({
                browsers: ['last 10 versions']
            })
        ]
    }
}




  /* plugins: [
  new webpack.ProvidePlugin({
    $: "muse-components",//设置为全局变量 无需重复 require('muse-components')
     $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      'window.$': 'jquery', 
  })
  ],*/
  
      // expose-loader，这个loader的作用是，将指定js模块export的变量声明为全局变量
    /*  {
        test: require.resolve('jquery'),  // 此loader配置项的目标是NPM中的jquery
        loader: 'expose?$!expose?jQuery', // 先把jQuery对象声明成为全局变量`jQuery`，
        //再通过管道进一步又声明成为全局变量`$`,那么，当某个js模块显式地调用var $ = require('jquery')的时候，就会把window,
    // jQuery返回给它,与上述ProvidePlugin + expose-loader的方案相反，此方案是先用<script>加载的jQuery满足老式jQuery插件的需要，
    // 再通过externals将其转换成符合模块化要求的exports。
      },*/
