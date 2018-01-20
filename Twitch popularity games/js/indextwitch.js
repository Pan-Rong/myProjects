 var jq=$.noConflict();//避免和模板字面量发生冲突
jq(document).ready(function() {
   getGameList();
    jq(".ranklist").on("click",function(){
        jq(".ranklist").animate({"width":"80px"},500,function(){
            jq(".ranklist span").html("The Chart");
            });
        rankInitalfirst();
        rankInitalsecond();
        getGameList();
    });
    jq(".rankfirst").on("click",function(){
        jq(".rankfirst").animate({"width":"80px"},500,function(){
            jq(".rankfirst span").html("First");
            });
        rankInitallist();
        rankInitalsecond();
        getBroadcasterList(getGlobalJson[0],1);
    });
    jq(".ranksecond").on("click",function(){
        jq(".ranksecond").animate({"width":"80px"},500,function(){
            jq(".ranksecond span").html("Second");
            //jq(".naroff").css("clear","right");
        });
        rankInitallist();
        rankInitalfirst();
        getBroadcasterList(getGlobalJson[1],2);
    });
});
function rankInitallist(){
    jq(".ranklist").animate({"width":"20px"},200);
    jq(".ranklist span").html("");
}
function rankInitalfirst(){
    jq(".rankfirst").animate({"width":"20px"},200);
    jq(".rankfirst span").html("");
}
function rankInitalsecond(){
    jq(".ranksecond").animate({"width":"20px"},200);
    jq(".ranksecond span").html("");
}
var getGlobalJson=null;//用于存放得到的排行对象信息
function getGameList(){
    jq.ajax({
        headers:{
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID":"4qmm1mr43yfbpc3u06yau8e1mp1x87"
            },
      url:"https://api.twitch.tv/kraken/games/top?limit=3",
        type: "get",
        async: false,//同步获取，
        success: function(json){
            jq(".contentlistfrm").html("");
            jq(".contentlistplayfrm").html("");//清空，以便显示新信息
            var jsonTop=json.top;
            console.log(json);
            getGlobalJson=jsonTop;//用于后期显示
               for(let i=0;i<jsonTop.length;i++){
                    showTheContentList(jsonTop[i],i+1);
                   }
            },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
            alert(XMLHttpRequest.status);
            }
        }); 
}
function getBroadcasterList(obj,num){
    jq.ajax({   
        beforeSend: function (json) {
            json.setRequestHeader('Client-ID', '4qmm1mr43yfbpc3u06yau8e1mp1x87');
            json.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
        },
        //获得该游戏
        url:`https://api.twitch.tv/kraken/videos/top?game=${obj.game.name}&limit=3`,
       // url:`https://api.twitch.tv/kraken/clips/top?limit=3&game=${obj.game.name}&trending=true`,
        async: true,//异步获取，所以要等获取完成后才可以赋值给全局变量
        success: function(json){
            jq(".contentlistfrm").html("");
                showTheContentList(obj,num);//显示该排行信息
            jq(".contentlistplayfrm").html("");//清空，以便显示新信息
            var jsonVods=json.vods;
                 console.log(json);
               for(let i=0;i<jsonVods.length;i++){
                     var contentListOnline=`<div class="contentlistli"><span>${i+1}</span><img src="${jsonVods[i].preview.medium}">               
                                        <a href="${jsonVods[i].url}" target="_blank" title="Click to open the video.">
                                        <p class="slugp listset">BroadcastType: ${jsonVods[i].broadcast_type}</p></a>
                                        <p class="namep listset">Channel: ${jsonVods[i].channel.display_name}&nbsp;&nbsp;Views: ${jsonVods[i].views}</p>
                                        </div>`
                    jq(".contentlistplayfrm").append(contentListOnline);  
                   }
            },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
            alert(XMLHttpRequest.status);
            }
        }); 
}
function  showTheContentList(obj,num){
    var contentListOnline=`<div class="contentlistul"><span>${num}</span><img src="${obj.game.box.medium}">               
                            <p class="slugp listset">Popularity: ${obj.game.popularity}&nbsp;&nbsp; Viewers: ${obj.viewers}</p>
                            <a href="#" title="Click the top button to show the broadcasters list."> <p class="namep listset">${obj.game.name}</p></a>
                            </div>`   
        jq(".contentlistfrm").append(contentListOnline);  
}
/*function getVideoList(){
        // jquery的ajax中添加header的两种方式
       // 1、headers:{
       //    Accept: "application/json; charset=utf-8"
        //}
       // 2、beforeSend:function(request) {
        //    request.setRequestHeader("Test", "Chenxizhang");
       // },
    
     jq.ajax({
        headers:{
            "Accept": "application/vnd.twitchtv.v5+json",
            "Client-ID":"4qmm1mr43yfbpc3u06yau8e1mp1x87"
            },
    //beforeSend: function (json) {
     //   json.setRequestHeader('Client-ID', '4qmm1mr43yfbpc3u06yau8e1mp1x87');
     //   json.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json');
   // },
     //url:"https://api.twitch.tv/kraken/clips/top?limit=3&game=Overwatch&trending=true",
      url:"https://api.twitch.tv/kraken/games/top?limit=3",
        type: "get",
        //此处出现的问题，twitch文档说该API移除了jsonp端口，所以不能用jsonp端口，
        //但是不知道在未设置orign的情况下是怎么实现跨域的。
        //dataType: "jsonp",
        //jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        //jsonpCallback:"callback",
        async: true,//异步获取，所以要等获取完成后才可以赋值给全局变量
        success: function(json){
            jq(".contentlistonfrm").html("");
            var jsonClips=json.clips;
            console.log(json);
            
               for(let i=0;i<jsonClips.length;i++){
                     var contentListOnline=`<div class="contentliston"><img src="${jsonClips[i].broadcaster.logo}">               
                                        <a href="${jsonClips[i].url}" target="_blank" title="Click to open the new window.">
                                        <p class="slugp listset">${jsonClips[i].slug}</p></a>
                                        <a href="#" onclick="${emdedWindow(jsonClips[i])}" title="Click to open the embed window.">
                                        <p class="namep listset">${jsonClips[i].broadcaster.display_name}</p></a>
                                        </div>`
                    jq(".contentlistonfrm").append(contentListOnline);  
                   }
                    jq("#embeddisplay").html(""); //防止为点击就加载
            },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
            alert(XMLHttpRequest.status);
            }
       
        }); 
}
function  emdedWindow(obj){
    jq("#embeddisplay").html("");
     jq("#embeddisplay").html(obj.embed_html);
}
   /*

/*xml原生码实现跨域获取数据的方式 */
     /* var httpRequest=new XMLHttpRequest();
    httpRequest.addEventListener('load',getVideoList);
    httpRequest.open('GET','https://api.twitch.tv/kraken/clips/top?limit=3&game=Overwatch&trending=true');
    httpRequest.setRequestHeader('Client-ID','4qmm1mr43yfbpc3u06yau8e1mp1x87');
    httpRequest.setRequestHeader('Accept','application/vnd.twitchtv.v5+json');
    httpRequest.send();

    function getVideoList(){
        var clipsDisplay=document.getElementById('clips-display');
        clipList=JSON.parse(httpRequest.responseText);
        clipList.clips.forEach(function(clip,index,array){
          clipItem=document.createElement('div');
          clipItem.innerHTML=clip.embed_html;
          clipsDisplay.appendChild(clipItem);
        });
}*/  