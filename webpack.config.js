const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WebpackPwaManifest = require("webpack-pwa-manifest");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require("path");

const config = {
    entry: {
      index: "./public/assets/js/index.js",
    },
    output: {
      path: __dirname + "/public/dist",
      filename: "[name].[contenthash].bundle.js",
      publicPath: '/dist',
      // filename: "[name].bundle.js"
      // libraryTarget: 'umd',  
      // library: ''
    },
    mode: "development",
    devtool: "source-map",
    // devServer: {
    //   port: 3000,
    //   contentBase: path.join(),
    //   writeToDisk: true,
    //   hot: true
    // },
    plugins: [
        new WebpackPwaManifest({
          filename: "manifest.json",
    
          inject: false,

          fingerprints: false,
    
          name: "Budget App",
          short_name: "Budget App",
          theme_color: "#ffffff",
          background_color: "#ffffff",
          start_url: "/",
          display: "standalone",
    
          icons: [
            {
              src: path.resolve(
                __dirname,
                "./public/assets/icons/icon-512x512.png"
                ),
              sizes: [72, 96, 128, 144, 152, 192, 384, 512],
              destination: path.join("assets", "icons")
            }
          ]
        }),
        new HtmlWebpackPlugin({
          template: './public/template.html',
          
        }),
        new MiniCssExtractPlugin({
          filename: 'style.css'
        }),
        new CleanWebpackPlugin(),
        // new webpack.HotModuleReplacementPlugin()
      ],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"]
            }
          }
        },
        // {
        //   test: /\.css$/i,
        //   use: ['style-loader', 'css-loader']
        // },
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
        },
      ]
    }
  };
  module.exports = config;
  