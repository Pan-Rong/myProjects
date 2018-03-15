# React-Router 示例练习
## 简介
React Router会将React项目转变成单页面应用。它通过提供大量特殊的组件来实现这一点。这些组件能够管理链接的创
建、管理应用的URL、在不同的URL地点之间导航时提供转换。

React Router是一系列导航式组件的集合，可以于应用一起以声明的方式编写代码。

React Router能使用户界面和URL保持同步，它能满足用户对页面链接以及URL的所有期待.

React Router提供了两个不同的使用场景“react-router-native”和“react-router-dom”.其中BrowserRouter使用
react-router-dom场景.当你使用BrowserRouter时，你是在创建history对象，该对象将监听URL中的变化，并使你的
应用知道这些变化.

## 安装
**安装react运行环境**(直接下载示例的文件夹，可忽略这个步骤)
安装一个全局的Create React App,NPM的命令行如下：
```npm install -g create-react-app```
在命令窗口，打开create-react-app安装的文件夹，在这里输入以下命令安装react项目包(文件夹名称:contacts)：
```
 create-react-app contacts
```    
       
**安装React Router模块**
在使用React Router之前，我们需要通过NPM安装它
打开示例所在的目录，执行一下命令
```
npm install
```
```
npm install --save react-router-dom
```
执行以下命令，可在浏览器上看到效果
```
npm start
```

**注**：该示例中都是采用 react-router-dom@4.2.2版。
