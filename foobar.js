const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
// const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

const config = {
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        path: "/home/proj/cdn/assets/[hash]",
        publicPath: "http://cdn.example.com/assets/[hash]/"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {loader: 'style-loader'},
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
            }
        ]
    }
};

// writes to disk: ./dist/app.js, ./dist/search.js

function ConsoleLogOnBuildWebpackPlugin() {

}

ConsoleLogOnBuildWebpackPlugin.prototype.apply = function (compiler) {
    compiler.plugin('run', function (compiler, callback) {
        console.log("The webpack build process is starting!!!");

        callback();
    });
};

new ConsoleLogOnBuildWebpackPlugin().apply()


module.exports = config;


const configuration = require('./webpack.config.js');

let compiler = webpack(configuration);
compiler.apply(new webpack.ProgressPlugin());

compiler.run(function(err, stats) {
    // ...
});

module.exports = {
    target: 'node' // 默认值是 'web'
};