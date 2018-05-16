const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

let pagePath = path.join(__dirname, 'pages');

/**
 * https://webpack.js.org/configuration/
 */
module.exports = {
    /**
     * The entry object is where webpack looks to start building the bundle.
     * The context is an absolute string to the directory that contains the entry files.
     *
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
            'jquery',
            'lodash',
        ],
        page2: './pages/page2/page2.js'
    },

    /**
     * Instructing webpack on how and where it should output your bundles,
     * assets and anything else you bundle or load with webpack.
     *
     * https://webpack.js.org/configuration/output/
     */
    output: {
        // the target directory for all output files
        // must be an absolute path (use the Node.js path module)
        path: path.join(__dirname, 'dist'),

        // the url to the output directory resolved relative to the HTML page
        // 可以是一个相对路径，如示例中的'/assets/'，
        // publicPath: "http://cdn.example.com/",

        // the filename template for entry chunks
        filename: '[name].bundle.[chunkhash].js',
    },

    /**
     * These options determine how the different types of modules within a project will be treated.
     *
     * https://webpack.js.org/configuration/module/
     */
    module: {
        /**
         * Prevent webpack from parsing any files matching the given regular expression(s).
         * This can boost build performance when ignoring large libraries.
         */
        noParse: /jquery|lodash/,

        /**
         * An array of Rules which are matched to requests when modules are created.
         * These rules can modify how the module is created.
         * They can apply loaders to the module, or modify the parser.
         */
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
            /**
             * Support EJS template engine,
             * which makes html fragment sharing possible.
             *
             * https://github.com/bazilio91/ejs-compiled-loader
             * https://github.com/peerigon/extract-loader
             */
            {
                test: /\.ejs$/,
                use: [
                    'extract-loader',
                    'html-loader',
                    'ejs-compiled-loader',
                ]
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
     * Used to customize the webpack build process in a variety of ways.
     * webpack comes with a variety built-in plugins available under webpack.[plugin-name]
     *
     * https://webpack.js.org/configuration/plugins/
     */
    plugins: [
        /**
         * Shimming globals
         *
         * https://webpack.js.org/guides/shimming/
         * https://webpack.js.org/plugins/provide-plugin/
         */
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            _: 'lodash',
            // _join: ['lodash', 'join'],  // granular shimming is also available though.
        }),

        /**
         * Clean the output directory before every build.
         *
         * https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
         * https://www.npmjs.com/package/clean-webpack-plugin
         */
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
            template: path.join(pagePath, 'index.html'),
            filename: 'index.html',
            chunks: ['manifest', 'vendor', 'main', 'another']
        }),

        new HtmlWebpackPlugin({
            template: path.join(pagePath, 'page2/page2.ejs'),
            filename: 'page2.html',
            chunks: ['manifest', 'vendor', 'page2']
        }),
    ]
};