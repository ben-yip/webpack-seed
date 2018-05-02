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
                    {
                        loader: 'url-loader',
                        options: {
                            fallback: 'file-loader', //when file is greater than the limit
                            limit: 1024 * 10,  // Byte limit to inline files as Data URL
                        }
                    },
                    // NOTE: compression is a little time-consuming.
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
        new webpack.optimize.UglifyJsPlugin(),

        /* 把 CSS 提取为单独的样式文件 */
        new ExtractTextPlugin('styles.css'),

        /* 打包分析，会在output目录输出一个HTML文件。不需要时就注释掉。*/
        // new require('webpack-visualizer-plugin')({filename: './statistics.html'}),
    ]
});