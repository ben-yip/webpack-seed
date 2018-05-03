const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

module.exports = merge(commonConfig, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader', // 有 HMR 功能
                    'css-loader'
                ]
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    'style-loader',
                    {
                        loader: "css-loader",
                        options: {
                            // If you are having trouble with urls not resolving add this setting.
                            // See https://github.com/webpack-contrib/css-loader#url
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader'
            },
        ]
    },

    /**
     * https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        // watchContentBase: true,
        compress: true,    // enable gzip for all resources
        hot: true,         // enable HMR feature
        open: true,        // open with default browser
        useLocalIp: true,  // open with local ip
        host: '0.0.0.0',   // enable external access
        port: 3000,
        // stats: 'errors-only', // 控制要显示的 bundle 信息
    },

    /**
     * How source maps are generated.
     *
     * https://webpack.js.org/configuration/devtool/
     * https://webpack.js.org/guides/build-performance/#devtool
     */
    devtool: "cheap-module-eval-source-map",

    plugins: [
        // 启用模块热替换(Hot Module Replacement)
        new webpack.HotModuleReplacementPlugin(),

        /**
         * https://webpack.js.org/plugins/named-modules-plugin/、
         * 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境。
         */
        new webpack.NamedModulesPlugin(),
    ]
});