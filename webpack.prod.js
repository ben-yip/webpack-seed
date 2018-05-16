const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(commonConfig, {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                minimize: true,
                                sourceMap: true
                            }
                        }
                    ]
                }),
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                // If you are having trouble with urls not resolving add this setting.
                                // See https://github.com/webpack-contrib/css-loader#url
                                url: false,
                                minimize: true,
                                sourceMap: true
                            }
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                sourceMap: true
                            }
                        }
                    ],
                })
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    /**
                     * Loads image files as `base64` encoded URL.
                     *
                     * https://github.com/webpack-contrib/url-loader
                     */
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader', //when file is greater than the limit
                            limit: 1024 * 10,  // Byte limit to inline files as Data URL
                        }
                    },
                    /**
                     * Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin
                     * NOTE: compression is a little time-consuming.
                     *
                     * https://github.com/tcoopman/image-webpack-loader
                     */
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            mozjpeg: {
                                progressive: true,
                                quality: 65        // [0, 100]
                            },
                            pngquant: {
                                floyd: 0.5,        // level of dithering, [0, 1]
                                quality: '65-90',  // similar to JPEG, [0, 100]
                                speed: 4           // speed/quality trade-off, [1, 10]
                            },
                            optipng: {
                                enabled: false,
                            },
                            gifsicle: {
                                interlaced: true,     // for progressive rendering
                                optimizationLevel: 2, // [1,2,3], bigger takes longer but better results
                            },
                        }
                    },
                ]
            },
        ]
    },

    devtool: 'source-map',

    plugins: [
        /* 为所有依赖指定环境为 production */
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),

        /* webpack 自带的 UglifyJs 插件 */
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                drop_console: true,
            }
        }),

        /**
         * moves all the required *.css modules in entry chunks into a separate CSS file.
         * So your styles are no longer inlined into the JS bundle, but in a separate CSS file
         *
         * ExtractTextPlugin generates a file per entry,
         * so you must use [name], [id] or [contenthash] when using multiple entries.
         *
         * https://github.com/webpack-contrib/extract-text-webpack-plugin
         */
        new ExtractTextPlugin({
            filename: '[name].[contenthash].css'
        }),

        /**
         * https://webpack.js.org/plugins/hashed-module-ids-plugin/
         * 根据文件的相对路径生成一个 hash 来作为 module.id，建议用于生产环境
         */
        new webpack.HashedModuleIdsPlugin(),

        /**
         * https://github.com/chrisbateman/webpack-visualizer
         * 打包分析，会在output目录输出一个HTML文件。不需要时就注释掉。
         */
        // new require('webpack-visualizer-plugin')({filename: './statistics.html'}),
    ]
});