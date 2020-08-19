const path = require('path');


// Variables
const isDev = process.env.NODE_ENV === 'development'
const sourcePath = path.join(__dirname, './src');
const outputPath = path.join(__dirname, './dist');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    context: sourcePath,
    entry: {
        app: [
            './js/index.js',
            './styles/style.scss'
        ]
    },
    mode: 'development',
    output: {
        path: outputPath,
        filename: '[name].[contenthash].bundle.css'
    },
    devtool: "source-map",
    resolve: {
        extensions: ['.js', '.json', '.png'],
        alias: {
            App: path.resolve(__dirname, 'src'),
            Assets: path.resolve(__dirname, 'src/assets')
        }
    },
    module: {
        rules: [
            /*
            *  CSS 
            * */
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                            reloadAll: true
                        },
                    },
                    'css-loader'
                ]
            },
            /**
             * SASS / SCSS
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
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(a?png|svg)$/,
                use: 'url-loader?limit=10000'
            },
            {
                test: /\.(jpe?g|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                use: 'file-loader'
            }
        ]
    },
    optimization: {
      splitChunks: {
          chunks: 'all',
      }  
    },
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].bundle.js'
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
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