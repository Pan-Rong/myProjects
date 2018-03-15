
# React demo1

## 安装环境
**一、浏览器环境下直接打开React的版本**
```
<!DOCTYPE html>
<html>
<head>
   <meta charset="utf-8">
   <title>Hello world!</title>
   <script src = "../../build/react.js"></script>
   <script src = "../../build/react-dom.js"></script>
   <script src = "../../build/browser.min.js"></script>
</head>
<body>
   <div id = "example"></div>
   <script type="text/babel">
      ReactDOM.render(
            <h1>Hello,World!</h1>,
            document.getElementById('example')
      );
   </script>
</body>
</html>
```

**二、create-react-app搭建的开发环境**[参考]()
以下是基于Facebook开发、创建的Create React APP创建的React,它简化了搭建React应用框架时的初始化配置过程，
一般来说， 搭建React应用框架需要有Babel等转译器来实现转译，如通过WebPack构建工具运行Babel。使用
Create React APP则可以节省这一步骤。

首先，打开npm,
```
    npm install -g create-react-app
```
查看安装包的方法,找到安装包的位置(以便打开安装react)：
```
    npm list -g
```    
在命令窗口，打开create-react-app安装的文件夹，在这里输入以下命令安装react项目包(例：文件夹名称:contacts)：
```
    create-react-app contacts
```    
执行完成后，你会看到安装了`react`,`react-dom`，`react-scrip`t，其中，`react-script`安装了`Babel`，使我们可以使用最新的JavaScript语
法，如JSX(js扩展，可以在js语句中直接使用HTML标签)，它安装了webpack以使我们进行生成和构建以及`webpack dev server` ,它给了我
们目前为止看到的自动重新加载行为。`create-react-app`是快速入门最新技术的一个好的方法。你无需花费很多时间去学习它们，便可开始
构建第一个React应用了

```
npm install
```
```
npm start
```

**三、Webpack配置React开发环境**
[Webpack](http://webpack.github.io/)是一个前端资源加载/打包工具，只需要相对简单的配置就可以提供前端工程化需要的各种功能.

安装` Webpack`：`npm install -g webpack`

`Webpack` 使用一个名为 `webpack.config.js` 的配置文件，要编译 `JSX`，先安装对应的` loader`:
```
npm install babel-loader --save-dev
npm install babel-core --save-dev
```





