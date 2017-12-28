
# 作品说明
## 作品说明
    此作品说明，含三个部分：已实现的功能，完成过程中的问题分析及处理，可完善部分
**1、已实现的功能**

    1、利用jquery的AJAX通过跨域连接维基百科API，实现数据的查询和连接查看详情;(Cross-origin resource sharing)跨域资源共享;
    2、可实现随机查询(第一行有提示);
    3、查询框可动态变化和关闭
    4、确定要查询的词后，按回车键实现查询
    5、可在移动设备上查看

**2、完成过程中的问题分析及处理**[问题1参考](https://www.cnblogs.com/dumuqiao/archive/2011/09/09/2172511.html)，
[问题2维基百科API文档](https://www.mediawiki.org/wiki/API:Main_page)，[维基百科API传送门](https://en.wikipedia.org/wiki/Special:ApiSandbox#action=query&titles=Main%20Page&prop=revisions&rvprop=content&format=jsonfm)

    1、查询框的动态显示：使用font-awesome的“search”图标加jQuery的animate()方法实现;过程中，涉及到给动态添加的DOM绑定事件
      方法有如下几种：
      
        (1) jQuery的delegate() 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的
            函数。适用于当前或未来的元素（比如由脚本创建的新元素）:
            $(selector).delegate(childSelector,event,data,function),data可选,传递到函数的额外数据.
            
        (2) jQuery的bind() 方法为被选元素添加一个或多个事件处理程序，并规定事件发生时运行的函数。
            $(selector).bind(event,data,function)或$(selector).bind({event:function, event:function, ...})
             
        (3) jQuery的live() 方法为被选元素附加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。适用于匹配选择器的当前及
            未来的元素（比如由脚本创建的新元素）:
            $(selector).live(event,data,function).
            
            三者区别见问题参考连接，推荐使用delegate()方法.
            
    2、维基百科API的使用
        按文中连接查询API文档，实现想要的参数设置，其中维基百科的跨域设置中，origin=*,实现跨域.详情参见文档.
        连接维基百科实现特定文档的维基页面连接有两种方式：
        
        (1) https://en.wikipedia.org/?curid="pageid","pageid"由上述API处获得
        
        (2) https://en.wikipedia.org/wiki/"title","title"由上述API处获得
     
    3、JSON中对象的key为数字命名的处理方式：
        维基百科的API中，AJAX获取的数据类型为JSON，但JSON中的对象的key是用数字命名的，该key的value也是一个对象。这时，用普通
        的对象查询方式就不可获取，如obj.key,不可用；obj[key]，只适合已知key的情况下，当有多个同为数字的key时就很不方便;下面介
        绍的一种方式，本人觉得相当方便，采用for in循环遍历对象属性，如：
        for(var sR in searchResult){}，其中的searchResult就是含有多个key为数字的对象.
         
  **3、可完善部分**

    1、代码的排版及压缩
    2、查询按钮的动画不完美,可完善成一体的.
    3、因本人目前知识有限，可能解释的不全，后期如发现错误再来更新
   
