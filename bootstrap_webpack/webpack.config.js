const path = require('path');


// Variables
const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev
console.log('isDev - ', isDev)

const sourcePath = path.join(__dirname, './src');
const outputPath = path.join(__dirname, './dist');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all',
        }
    }
    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin()
        ]
    }
    return config

}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: true
            },
        },
        'css-loader'
    ]
    if (extra) {
        loaders.push(extra)
    }
    return loaders
}

module.exports = {
    context: sourcePath,
    entry: {
        app: [
            './js/index.js',
            './styles/style.scss'
        ]
    },
    // mode: 'development',
    output: {
        path: outputPath,
        filename: filename('js')
    },
    devtool: "source-map",
    target: 'web',
    resolve: {
        extensions: ['.js', '.json', '.png', '.scss'],
        alias: {
            App: path.resolve(__dirname, 'src'),
            Assets: path.resolve(__dirname, 'src/assets')
        }
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders()
            },
            {
                test: /\.s[ac]ss$/i,
                use: cssLoaders('sass-loader'),
            },
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
    optimization: optimization(),
    devServer: {
        hot: true,
        inline: true,
        watchContentBase: true,
        stats: 'minimal',
        clientLogLevel: 'warning'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: filename('css'),
            chunkFilename: '[id].css',
            disable: isDev
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                minifyJS: isProd,
                minifyCSS: isProd,
                removeComments: isProd,
                useShortDoctype: isProd,
                collapseWhitespace: isProd,
                collapseInlineTagWhitespace: isProd
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/assets/favicon.ico'),
                    to: path.resolve(__dirname, 'dist')
                }
            ]
        })
    ]
};