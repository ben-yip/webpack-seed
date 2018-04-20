const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './asset/js/index.js',
    },
    output: {
        // 生成文件的根目录，需要传入一个绝对路径
        path: path.join(__dirname, 'dist'),

        // 表示的是一个URL路径
        // 可以是一个相对路径，如示例中的'../../../../build/'，
        // 也可以是一个绝对路径如http://www.xxxxx.com/
        // publicPath: "/"

        // 表示如何命名生成出来的入口文件
        //
        filename: '[name].bundle.[hash].js',
    },
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
                // use: [
                //     {
                //         loader: 'file-loader',
                //         options: {
                //             name: '[path][name].[ext]'
                //         }
                //     },
                //     'extract-loader',
                //     'html-loader'
                // ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(csv|tsv)$/,
                use: [
                    'csv-loader'
                ]
            },
            {
                test: /\.xml$/,
                use: [
                    'xml-loader'
                ]
            }
        ]
    },

    devtool: "inline-source-map",
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 3000,
        hot: true
    },

    plugins: [
        // 每次构建前先清理输出目录
        new CleanWebpackPlugin(['dist']),

        // 动态生成 HTML 文件，自动引用所需资源
        new HtmlWebpackPlugin({
            // title: 'Output management',
            template: './index.html',
            // hash: true,
            // minify: true,
        }),

        /* webpack 自带的压缩工具 */
        // new webpack.optimize.UglifyJsPlugin(),

        // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
        new webpack.NamedModulesPlugin(),
        // 启用热替换模块(Hot Module Replacement)
        new webpack.HotModuleReplacementPlugin()
    ]
};