const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 拆分css样式的插件
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 正常写入的less
const styleLess = new ExtractTextWebpackPlugin('css/style.css');
// reset
const resetCss = new ExtractTextWebpackPlugin('css/reset.css');
module.exports = {
	// entry: ['./src/index.js', './src/login.js'], // 入口文件
	entry: {
		index: './src/index.js'
		// login: './src/login.js'
	},
	output: {
		filename: 'bundle.js', // 打包后的文件名称
		// filename: '[name].js',
		// filename: 'bundle.[hash:4].js',
		path: path.resolve('dist') // 打包后的目录，必须是绝对路径
	}, // 出口文件
	module: {
		rules: [
			{
				test: /\.css$/,
				use: resetCss.extract({
					use: 'css-loader'
				})
			},
			{
				test: /\.less$/,
				use: styleLess.extract({
					use: 'css-loader'
				})
			}
			// {
			// 	test: /\.css$/, // 解析css
			// 	// use: ['style-loader', 'css-loader'] // 从右向左解析
			// 	use: ExtractTextWebpackPlugin.extract({
			// 		// 将css用link的方式引入就不再需要style-loader了
			// 		use: 'css-loader'
			// 	})
				 
   //                  也可以这样写，这种方式方便写一些配置参数
   //                  use: [
   //                      {loader: 'style-loader'},
   //                      {loader: 'css-loader'}
   //                  ]
                
			// }
			// {
            //     test: /\.css$/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader']
            // }
		]
	}, // 处理对应模块
	plugins: [
		// 通过new一下这个类来使用插件
        new HtmlWebpackPlugin({
            // 用哪个html作为模板
            // 在src目录下创建一个index.html页面当做模板来用
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index'] // 对应关系，index.js对应的是index.html
            // hash: true, // 会在打包好的bundle.js后面加上hash串
        }),
        styleLess,
        resetCss
        // 拆分后会把css文件放到dist目录下的css/style.css
        // new ExtractTextWebpackPlugin('css/style.css')
        // new MiniCssExtractPlugin({
        //     filename: 'css/a.css'   // 指定打包后的css
        // })
        // new HtmlWebpackPlugin({
        // 	template: './src/login.html',
        // 	filename: 'login.html',
        // 	chunks: ['login']
        // })
	] // 对应的插件
	// devServer: {}, // 开发服务器配置
	// mode: 'development' // 模式配置
}
