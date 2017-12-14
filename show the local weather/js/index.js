var jq=$.noConflict();//避免和模板字面量发生冲突
var temCity="";//存放当前城市
jq(document).ready(function() {
    getWeather();
  jq("#submitcity").on("click",function(){
         getWeather();
    });
    jq("#currentweatherid").mouseover(function(){
       jq(".todayfrm").css("display","block");   
          jq(".todayfrm").animate({top:"100px"},500,function(){
              //回弹效果，暂时没有更好的方法
           jq(".todayfrm").animate({top:"90px"},200);
            jq(".todayfrm").animate({top:"110px"},200);
            jq(".todayfrm").animate({top:"100px"},200);
        });
    });
    /*jq(".currentweather").mouseout(function(){
      jq(".todayfrm").animate({top:"0px"},500,function(){
            // jq(".todayfrm").slideUp("slow");
             //alert("Hello");
             jq(".todayfrm").css("display","none"); 
         });   
     });*/
});
function getWeather(){
    temCity=jq("#cityselect option:selected").text(); //显示选中的城市
    jq.ajax({
        url:"http://v.juhe.cn/weather/index?format=2",
        //以下是不写data时的表达行形式
        //encodeURIComponent()将字符串转换成URL编码形式
        //url:"http://v.juhe.cn/weather/index?format=2&cityname="+encodeURIComponent(temCity)+"&key=8dbd540174f81df029f099521c07207b",
        type: "get",
        async: true,
        data:{
                "cityname":temCity,
                "key":"8dbd540174f81df029f099521c07207b"
            },
        dataType: "jsonp",
/* 问题点汇总：
1、之前在这里了XMLHttpRequest.status=0的状态，说明没有send(),
 经查证原因：该题为跨域调用数据，需要将dataType设置成“jsonp”,同时设置jsonpCallback:"回调函数名";
 才可以实现跨域设置;        
2、改了dataType后，再次出现XMLHttpRequest.status=404状态(edge浏览器)，换了火狐之后，
显示XMLHttpRequest.status=200状态，但是没有进入success，说明请求的页面不存在；
经查证原因：url失效，需替换成有效的url;
*/
        jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
        jsonpCallback:"cityWeather",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
        success: function(json){
            jq(".currentweather div").html("");//清空，以便显示新数据
            var weaPic=json.result.today.weather;
            var currentW=`${json.result.sk.temp} ℃&nbsp;&nbsp;${getWeatherPic(weaPic,json.result.sk.time)}&nbsp;&nbsp;${json.result.sk.time}`;
            jq(".currentweather div").html(currentW);
            //获得今日的天气信息
            var currTdyWweather=json.result.today;
            getTodayWeather(currTdyWweather);

            cityPicture(temCity,json.result.sk.time);   
         //实现未来五天的天气简显
            jq(".futureweather").html("");//清空，以便显示新数据
                for(var i=0;i<5;i++){
                    (function(i){
                    var futureW=`<div class="futurebg"><p>${json.result.future[i].week}</p>
                    <p>${json.result.future[i].date}&nbsp;&nbsp;
                    ${json.result.future[i].temperature}</p>
                    </p>${json.result.future[i].weather}</p></div>`;
                    jq(".futureweather").append(futureW);
                })(i);
                } 
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
            alert(XMLHttpRequest.status);
        }
    });
}
function cityPicture(temCity,timeT){
    var dayTimeStr="";//用于设置早、中、晚图片
        switch(temCity){
            case "南京":temCity="nanjing";
            break;
            case "北京":temCity="beijing";
            break;
            case "深圳":temCity="shenzhen";
            break;
            case "上海":temCity="shanghai";
            break;
        }
        if(parseInt(timeT)>=6 && parseInt(timeT)<10){
            dayTimeStr="morning";
        }else if(parseInt(timeT)>=10 && parseInt(timeT)<16){
            dayTimeStr="daytime";
        }else if(parseInt(timeT)>=16&& parseInt(timeT)<20){
           dayTimeStr="sunset";
        }else{
            dayTimeStr="night";
        }
         //alert(temCity);
         //js中图片的引用问题，和html中相同的路径就可以了。但css要有所不同
         //背景变色
         jq("body").fadeTo("slow",0.2,function(){
            jq("body").attr("background",`images/backgroundpicture/${temCity}/${dayTimeStr}.jpg`);  
            jq("body").fadeTo("slow",0.8);
         });   
}
function getTodayWeather(todayW){
        jq(".todayfrm").html("");//清空，以便显示新数据
        var todayset=`<p>温度：${todayW.temperature}</p>
                      <p>${todayW.weather}</p>
                      <p>风力: ${todayW.wind}</p>
                      <p> ${todayW.date_y}&nbsp;&nbsp; ${todayW.city}</p>
                      <p>穿衣指数: ${todayW.dressing_index}</p>
                      <p>${todayW.dressing_advice}</p>`;
        jq(".todayfrm").append(todayset);
}
function getWeatherPic(weaPic,timeT){
    var flg=0;//实现部分天气显示图片(只看前3个字，其他的暂时没考虑)，部分显示文字
    var picTime="";//实现白天和晚上天气图标的变化
    if(weaPic.indexOf("多云")===0){weaPic="duoyun";flg=1;} 
    if(weaPic.indexOf("晴")===0){weaPic="qing";flg=1; }
    if(weaPic.indexOf("阴")===0){weaPic="yin";flg=1; }
    if(weaPic.indexOf("雨")!==-1){ weaPic="yu";flg=1; }
    if(weaPic.indexOf("雪")!==-1){ weaPic="xue";flg=1; }
    if(parseInt(timeT)>=6 && parseInt(timeT)<=18){
        picTime="day";
    }else{
        picTime="night";
    }
    if(flg===1){
    return  `<img src="images/weather_icon/g2/40x40/${picTime}/${weaPic}.png">`;
    }else{
        return  `&nbsp;${weaPic}`;
    }
   // jq(".currentweather div").append(picWeather);
}