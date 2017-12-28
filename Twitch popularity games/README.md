
# 作品说明

### 作品说明

    此作品说明，含三个部分：已实现的功能，完成过程中的问题分析及处理，可完善部分.
  
**1、已实现的功能**
  
    1、利用jQuery的ajax通过Twitch的API实现Twitch上最热门游戏的搜索，并显示排列顺序.
    
    2、点击排行按钮，可显示第一名和第二名游戏的最受欢迎播放频道(最近一周内、前三名).
    
    3、点击最受欢迎的频道可连接到Twitch页面观看游戏.
    
    4、导航菜单里的三个按钮可实现动态显示其中一个，且可定位到相关呈现内容.

**2、完成过程中的问题分析及解决**[Get started with Twitch development](https://dev.twitch.tv/get-started) ,[Twitch API文档](https://dev.twitch.tv/docs/api)
    
    1、使用Twitch的API时，需要有自己的客户ID，并创建APP后才可以使用,详情见“Get started with Twitch development”

    2、jQuery中AJAX设置头文件的问题，通过查看Twitch API可以看到，跨越调取信息需要设置header，
        jQuery中设置header的方式有两种，如下：
          1、headers:{
                Accept: "application/json" ,
              }
          2、beforeSend:function(request) {
                request.setRequestHeader("Accept", "application/json");
              },
            
    3、以上设置后，并没有成功调取数据，因为Twitch的API中特别说明了，支持JSONP的端口已经被移除了(API首页有说明);
       所有写AJAX的时候，需要把“dataType”等相关信息去掉，然后才可以实现成功调取数据，我在这坑里待了好久才摸索
       着爬出来的，不容易呀.popularity games的调取我设置了同步获取，为了得到全局对象game的信息，以便再次调取
       Channel信息，Channel的获取设置成异步获取，充分利用CPU的时间.
       
      简要补充下同步调取和异步调取的区别：
      (1) 因为JS是单线程的，若使用同步调取，那么CPU就要等待代码的一步一步执行完才可以继续工作；而异步调取大大节省
          了时间，它充分利用CPU的空闲时间来执行代码;
      (2) 同步获取时，编者可知道代码的执行顺序和时间；但异步调取时，不知道代码时候可以执行好，所以当想在AJAX方法
          外使用AJAX获取的数据时，就不能用异步调取.所以该作品中有同步也有异步.
          
    4、补充一点，使用xml源码实现获取数据，代码如下：
```
        var httpRequest=new XMLHttpRequest();

            httpRequest.addEventListener('load',getVideoList);//设置监听事件

            httpRequest.open('GET','https://api.twitch.tv/kraken/clips/top?limit=3&game=Overwatch&trending=true');

            httpRequest.setRequestHeader('Client-ID','4qmm1mr43yfbpc3u06yau8e1mp1x87');//设置header

            httpRequest.setRequestHeader('Accept','application/vnd.twitchtv.v5+json');//设置header

            httpRequest.send(); 
            
        function getVideoList(){
     
            var clipList=JSON.parse(httpRequest.responseText);//即可获得类型为JSON的数据
            
        }
```

**3、可完善部分**

    1、导航菜单内只有三个按钮，分别为游戏列表和前两名游戏的频道列表，第三名没有添加
    
    2、没有做适应手机观看的调整
    
    3、代码格式可以优化、内容也可进一步压缩
    
    4、edge浏览器查看不到API获取的数据，显示404或是0,目前还没有解决，火狐和chrome没有问题
    
    5、因本人目前知识有限，可能解释的不全，后期如发现错误再来更新
