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
     * This set of options is picked up by webpack-dev-server
     * and can be used to change its behavior in various ways.
     *
     * https://webpack.js.org/configuration/dev-server/
     */
    devServer: {
        contentBase: path.join(__dirname, "dist"), // Tell the server where to serve content from.

        /* Tell the server to watch the files served by the devServer.contentBase option.
         * File changes will trigger a full page reload.
         */
        // watchContentBase: true,

        compress: true,    // enable gzip for all resources
        hot: true,         // enable HMR feature
        open: true,        // open with default browser
        useLocalIp: true,  // open with local ip
        host: '0.0.0.0',   // enable external access
        port: 3000,        // Specify a port number to listen for requests on
        // index: 'index.html',          // The filename that is considered the index file.
        // openPage: '/different/page',  // Specify a page to navigate to when opening the browser.

        /*  Proxying some URLs can be useful when you have a separate API backend development server
         *  and you want to send API requests on the same domain.
         */
        // proxy: {
        //     "/api": "http://localhost:8080"
        // },

        /* This option lets you precisely control what bundle information gets displayed.
         * This can be a nice middle ground if you want some bundle information, but not all of it.
         * https://webpack.js.org/configuration/stats/
         */
        // stats: 'errors-only',
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