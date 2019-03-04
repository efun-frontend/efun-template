热跟新必须有以下3点： 
1.引入webpack 
2.devServer中增加hot:true 
4.在plugins中配置 new webpack.HotModuleReplacementPlugin()

但是上述只会针对css和js进行热更，需要html的修改也热更需要加多两个参数：
contentBase: path.join(__dirname, 'src'), //项目开发开发环境路径
watchContentBase:true

意思是：webpack-dev-server将监视位于contentBasedir 中的所有文件的更改。在这里，我们观看./src中的所有文件。