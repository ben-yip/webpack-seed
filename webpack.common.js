const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    /**
     * https://webpack.js.org/configuration/entry-context/
     */
    context: path.resolve(__dirname),
    entry: {
        main: './asset/js/main.js',
        another: './asset/js/another.js',
        vendor: [
            /* here goes 3-party modules, like lodash or react.*/
            './asset/js/vendor-1.test.js',
            './asset/js/vendor-2.test.js',
        ],
    },

    /**
     * https://webpack.js.org/configuration/output/
     */
    output: {
        // 生成文件的根目录，需要传入一个绝对路径
        path: path.join(__dirname, 'dist'),

        // 表示的是一个URL路径
        // 可以是一个相对路径，如示例中的'../../build/'，
        // 也可以是一个绝对路径如http://www.xxxx.com/
        // publicPath: "/"

        // 表示如何命名生成出来的入口文件
        //
        filename: '[name].bundle.[chunkhash].js',
    },

    /**
     * https://webpack.js.org/configuration/module/
     */
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
            {
                test: /\.(csv|tsv)$/,
                use: ['csv-loader']
            },
            {
                test: /\.xml$/,
                use: ['xml-loader']
            }
        ]
    },

    /**
     * https://webpack.js.org/configuration/plugins/
     */
    plugins: [
        // 每次构建前先清理输出目录
        new CleanWebpackPlugin(['dist']),

        /**
         * https://webpack.js.org/plugins/commons-chunk-plugin
         */
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',       // 对应 entry 中的 vendor，显式指定
            minChunks: Infinity,  // ensures that no other module goes into the vendor chunk
            // ↑若不指定，那么如果全部入口点之间有共用块的话，也会被合并到 vendor 中。
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',     // 这个在 entry 中没有，用来提取一份 webpack 的 boilerplate 和 manifest
            minChunks: Infinity,  // 默认是 entry 的数量
            // 因为入口点没有本文件，所以文件名不能使用[chunkhash]，因此这里要显式定义以覆盖 output 中的设置
            filename: 'manifest.[hash].js',
        }),

        /**
         * https://github.com/jantimon/html-webpack-plugin
         * 动态生成 HTML 文件，自动引用所需资源
         */
        new HtmlWebpackPlugin({
            template: 'pages/index.html',
            // title: 'Output management', // 指定了 template 的话会被忽略
            // hash: true,
            // minify: true,
        }),
    ]
};