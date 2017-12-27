# 作品说明
### 作品说明
    此作品说明，含三个部分：已实现的功能，完成过程中的问题分析及处理，可完善部分

**1、已实现的功能**

    1、利用bootstrap和jquery实现随机引言呈现功能，其中引言颜色和背景色保持一致，且可随机变化;背景色的变化是渐变，非突变。
    2、可点击twitter或tumblr,将引言发到该网站。
    3、该作品可根据设备的不同(屏幕宽度为500px是分界线)，自适应。
    4、使用了文档模式法和条件注释法兼容IE浏览器

**2、完成过程中的问题分析及处理**

    1、container和container-fluid的区别：container和container-fluid都有15px的左右padding，但当满屏显示时，container的左右margin为86px(屏幕
       尺寸不同可能略有不同)，container-fluid的左右margin还是为auto;
       
    2、背景颜色渐变非突变处理，查阅jquery手册，用fadeTo()函数解决。fadeTo(speed,opacity,callback) 方法将被选元素的不透明度逐渐地改变为指定的值.
    
    3、10进制数转成16进制数后再转成字符串，number.toString(radix) 方法可把一个逻辑值转换为字符串，并返回结果。radix 可选,规定表示数字的基数.
    
    4、encodeURIComponent() 函数可把字符串作为 URI 组件进行编码.
    
    5、适应小屏幕的字体尺寸，使用<meta name="viewport" content="width=device-width, initial-scale=1">+媒体查询法，根据不同的屏幕尺寸重新设置.
       注：媒体查询法放在其他css样式的下面，以免被覆盖;@media screen and (max-width:xx px){},注意and后面有空格.
    
**3、可完善部分**

    1、代码的排版及压缩
    2、引言的数量等


