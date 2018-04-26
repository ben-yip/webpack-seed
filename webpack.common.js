const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    /**
     * https://webpack.js.org/configuration/entry-context/
     *
     */
    context: path.resolve(__dirname),
    entry: {
        main: './asset/js/index.js',
        other: './asset/js/another.js',
        // vendor: [
        //     './asset/js/vendor-1.test.js',
        //     './asset/js/vendor-2.test.js',
        // ],
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
        filename: '[name].bundle.[hash].js',
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

        // 代码去重，提取为共用块
        new webpack.optimize.CommonsChunkPlugin({
            // 共用 bundle 的 name
            names: [
                // 'vendor',  // 对应 entry 中的 vendor，显式地
                'common',
            ],
            // filename: 'vendor.js' // 也可以另起文件名
            // minChunks: Infinity,
        }),

        // 动态生成 HTML 文件，自动引用所需资源
        new HtmlWebpackPlugin({
            template: 'pages/index.html',
            // title: 'Output management', // 指定了 template 的话会被忽略
            // hash: true,
            // minify: true,
        }),
    ]
};