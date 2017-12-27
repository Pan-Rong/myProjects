$(document).ready(function() {
    $(".top1").on("click",function(){
      messageHandle();
      $("#contenttext").val("");
    });
    $(document).keydown(function(event){
      if(event.keyCode==13){
        $(".top1").click();
      }
    });
    $(".top2").on("click",function(){
          $(".content1 .row p").remove();
          $(".content1 .row").empty();
          numarr=-1;
          narr=[];
          numarrvertival=0;
          oTop = 0;
          lenObj = 0;
        clearTimeout(timeCl);
    });
  });
var narr=[];//用于存放每次输入的值
var numarr=-1;//用于计算输入的次数
var numarrvertival=0;//用于随机显示已存在的数组
var timeCl=0;
function messageHandle(){
  if($("#contenttext").val()!==""){
    numarr++;
  narr[numarr]=$("#contenttext").val();//获得input里的值
  numarrvertival=numarr;
  setTimeout(scrollvertical,1000);
  }else{
    alert("请输入信息");
  }
 }
function scrollvertical(){
  var messageObj=$("<p></p>"); //创建p节点
  messageObj.text(narr[numarrvertival]);
    $(".content1 .row").append(messageObj);
  moveObj(messageObj);
  numarrvertival=Math.floor(Math.random()*numarr);
  var time1=5000+5000*Math.random();
  if((numarr-5)>0){
  time1*=(numarr-5);
  }
  timeCl=setTimeout(scrollvertical,time1);
}
var oTop = 0;
var lenObj = 0;
function moveObj(obj){
    /*此处问题点描述：
        1、之前将offset()的值在全局赋值给变量，在函数中调用变量，显示没有定义
        换成在函数内赋值就没有问题；暂时还不知道原因，希望大神可以指点一二
    */
  var toMin = $(".content1 .row").offset().top;  
  var toMax = $(".content1 .row").height()-toMin; 
  //var oTopNum = toMin;
    //alert($(".content1 .row").height());
    if((oTop===0)||(oTop >=toMax)){
        oTop=toMin;
    }else{
        oTop= oTop+20;
    }
 // alert(parseInt(0xffffff,10));//16777215
   obj.css({right:"10%",top:oTop,color:getRandomColor()
    });
   var time1=5000+5000*Math.random();
    lenObj=obj.text().length*14*2;//用于字符串移动到左边正常溢出用
   obj.animate({right:"100%",width:lenObj+"px"},time1,function(){
     obj.remove();//
   });
  
 }
function getRandomColor(){
   //alert(parseInt(0xffffff,10));//16777215
   var getRandom=Math.floor(Math.random()*16777215);
    getRandom=parseInt(getRandom).toString(16);
    if(getRandom.length<6){
      var lenRandom=getRandom.length;
      var tenRandom="";
      for(var i=0;i<6-lenRandom;i++){
           tenRandom+="0";
      }
      getRandom=tenRandom+getRandom;
    }
  return "#"+getRandom;
}