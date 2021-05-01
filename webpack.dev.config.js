const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('nyan-progress-webpack-plugin');
module.exports = {
    mode:"development",
    entry:path.join(__dirname,'./example/entry.js'),
    output:{
        filename:'index.js',
        path:path.join(__dirname,'./example/dist')
    },
    devServer:{
        host:'127.0.0.1',
        port:'9001',
        hot:true,
        //open:true
    },
    resolve:{
        alias:{
            YTui:path.join(__dirname,'./src/index.js')
        },
        modules:['node_modules'],
        extensions:['.js','.json','.vue']
    },
    module:{
        rules:[
            {
                test:/\.vue$/,
                loader:'vue-loader',
                options: {
                    compilerOptions: {
                      preserveWhitespace: false
                    }
                  }
            },
            {
                test:/\.md$/,
                use:[
                    {
                        loader:'vue-loader',
                        options: {
                            compilerOptions: {
                              preserveWhitespace: false
                            }
                          }
                    },
                    {
                        loader:path.join(__dirname,'./md-loader/index.js')
                    }
                ]
                
            },
            {
                test:/\.(scss|css)$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
                loader: 'url-loader'
              }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),
        new VueLoaderPlugin(),
        new ProgressBarPlugin(
            {
                nyanCatSays:(progress) => progress === 1 && '服务启动成功!'
            }
        ),
        new HtmlWebpackPlugin({
            template:path.join(__dirname,'./example/public/index.html')
        })
    ]
}