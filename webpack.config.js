// process.traceDeprecation = true;

const LWCWebpackPlugin = require('lwc-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

module.exports = env => {
    return {
        optimization: {
            minimize: true,
            minimizer: [
                new TerserJSPlugin()
            ],
        },
        stats: {
            children: true,
            errorDetails: true
        },
        mode: 'development',
        entry: {
            index: `./frontend/index.js`
        },
        output: {
            filename: 'js/[name].js',
            publicPath: '/',
            chunkFilename: 'js/[name].js'
        },
        module: {
            rules: [
                {
                    test: /\.m?js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: [
                                    "@babel/preset-env"
                                ],
                                plugins: [
                                    "@babel/plugin-transform-runtime"
                                ]
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        "style-loader",
                        "css-loader",
                        {
                            loader: "sass-loader"
                        },
                        {
                            loader: 'lwc-ace/loader',
                            options: {
                                theme: 'vine',
                                mixins: 'frontend/common/mixins_vine.scss'
                            }
                        }
                    ],
                },
                {
                    test: /\.pug$/,
                    loader: "pug-loader",
                    options: {
                        pretty: false
                    }
                }
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                filename: "index.html",
                template: `./frontend/index.pug`
            }),
            new LWCWebpackPlugin()
        ],
        resolve: {
            alias: {}
        }
    };
};