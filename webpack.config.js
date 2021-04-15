const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');

const nodeExternals = require('webpack-node-externals');

const frontConfig = {
    entry : './src/app/index.tsx',
    output : {
        path : path.resolve(__dirname , 'dist/app'),
        filename: 'app.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    module : {
        rules : [
            {
                test : /\.[jt]sx?$/,
                exclude: /node_modules/,
                use:'babel-loader'
            },
            {test : /\.css$/, use:['style-loader', 'css-loader']},
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                        name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : 'src/app/index.html'
        })
    ]
}

const backConfig = {
    entry : './src/server/index.ts',
    output : {
        path : path.resolve(__dirname , 'dist/server'),
        filename: 'server.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module : {
        rules : [
            {
                test : /\.[jt]s$/,
                exclude: /node_modules/,
                use:'babel-loader'
            }
        ]
    },
    target: 'node',
    externals: [nodeExternals()],
    mode:'development',
    node: {
        __dirname: true
    }
}

module.exports = [ frontConfig, backConfig ];