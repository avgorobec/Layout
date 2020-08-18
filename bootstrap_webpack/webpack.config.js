const path = require('path');
const sourcePath = path.join(__dirname, './src');
const outputPath = path.join(__dirname, './dist');
// console.log(sourcePath)

// Variables

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    // Входные файлы
    entry: './src/js/index.js',
    output: {
        path: outputPath,
        filename: './js/bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [
            /*
            * JS
            * */
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src/js'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: 'env'
                    }
                }
            },
            /**
             * SASS
             */
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    'style-loader',
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            // static assets
            {test: /\.html$/, use: 'html-loader'},
            {test: /\.(a?png|svg)$/, use: 'url-loader?limit=10000'},
            {
                test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[hash].css'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                minifyJS: true,
                minifyCSS: true,
                removeComments: true,
                useShortDoctype: true,
                collapseWhitespace: true,
                collapseInlineTagWhitespace: true
            }
        })
    ]
};