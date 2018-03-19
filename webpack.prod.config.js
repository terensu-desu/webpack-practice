const path = require("path");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
	devtool: "cheap-module-source-map",
	entry: "./src/index.js",
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "bundle.js",
		chunkFilename: "[id].js",
		publicPath: "" //store into the root of the 'path'
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	module: {
		rules: [
			{
				test: /\.js$/, //use regex to find .js files
				loader: "babel-loader",
				exclude: /node_modules/ //pretty much required
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				// to set up a loader with config or multiple loaders loader -> use
				// webpack parses from RIGHT to LEFT of the array
				use: [
					{ loader: "style-loader" },
					{ 
						loader: "css-loader",
						options: {
							// due to importing postcss-loader before, declare importLoaders
							importLoaders: 1,
							modules: true,
							localIdentName: "[name]__[local]__[hash:base64:5]"
						}
					},
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							plugins: () => [
								autoprefixer({
									browsers: [
										"> 1%",
										"last 2 versions"
									]
								})
							]
						}
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loader: "url-loader?limit=8000&name=images/[name].[ext]"
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: __dirname + "/src/index.html",
			filename: "index.html",
			inject: "body"
		}),
		// somehow use -> config.optimize.minimize()
	]
};