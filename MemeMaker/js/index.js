//object.oninput，实现文本输入的实时监控，或使用添加监听器事件如下：
document.querySelector("#bottomText").addEventListener("input",textChangeListener,false);
document.querySelector("#topText").addEventListener("input",textChangeListener,false);
document.getElementById("file").addEventListener("change",imageChangeHandle,false);
document.querySelector("#savefile").addEventListener("click",btnHandleSave,false);
document.getElementById("cleartext").addEventListener("click",btnHandleClear,false);
var glTopText="",glBottomText="";//用于存放输入值，以便后续处理
var glImage=null;//保存图片，以便动态显示
function textChangeListener(evt){
    var tempId=this.id;//效果同 var tempId=evt.target.id
    var tempText=this.value;
        if(tempId=="topText"){
            glTopText=tempText;
        }else{
            glBottomText=tempText;
        }
        redrawMeme(glImage,glTopText,glBottomText);
}
function redrawMeme(Img,tText,bText){
    var c=document.getElementById("canv");
    var ctx=c.getContext("2d");//返回一个用于在画布上绘画的环境
        ctx.clearRect(0,0,c.width,c.height);//实现文本不重叠
        if(Img!=null){//判断文本是否存在
            ctx.drawImage(Img,0,0,c.width,c.height);
            ctx.font="26pt Impact";
            ctx.textAlign="center";
            ctx.fillStyle="white";
            if(tText!=null){
                ctx.strokeStyle=getColor("topTxt");
                ctx.fillText(tText,c.width/2,40);
                ctx.strokeText(tText,c.width/2,40);
            }
            if(bText!=null){
                ctx.strokeStyle=getColor("bottomTxt");
                ctx.fillText(bText,c.width/2,c.height-20);
                ctx.strokeText(bText,c.width/2,c.height-20);
            }
        } 
}
//图片改变时的处理函数；
function imageChangeHandle(){
    var c=document.getElementById("canv");
    var ctx=c.getContext("2d");
        ctx.clearRect(0,0,c.width,c.height);//先清空画布
    var tempFile=document.getElementById("file").files[0];//获取当前文件
        if(tempFile){
        //确保“file.name”是符合我们要求的扩展名
            if(/\.(jpe?g|png|gif)$/i.test(tempFile.name)){
                var reader=new FileReader();
                    reader.onload=function(){
                    var image=new Image();
                        image.src=reader.result;//获取图片内容
                        image.onload=function(){
                            glImage=image;
                            redrawMeme(image,null,null); //初次或换图显示在屏幕上
                        }
                    }
                    //该方法会读取指定的Blob或file对象，读取完成时，readyState会变成已完成(DONE)，
                    //并触发loadend事件，同时result属性将包含一个data：URL格式的字符串以表示所读取文件的内容
                    reader.readAsDataURL(tempFile);
                }    
        }
}
var descriptionText=[
    "利用canvas实现简易表情包的制作",
    "实现对加载文件的筛选,只可显示图片",
    "可实时显示文本",
    "文本颜色有8种可选",
    "点击Save，可保存制作的表情包(火狐浏览器)",
    "点击Clear，可清除图片上及输入框里的文本"
];
//实现JS加载颜色+功能说明
var colors=["Red","Orange","Yellow","green","blue","Indigo","Purple"];
(function renderSelect(){
    var tempTopColorSelect=document.getElementById("toptext-color");
    var tempBottomColorSelect=document.getElementById("bottomtext-color");
    for(var color in colors){
        var tempTopOption=document.createElement("option");
        var tempBottomOption=document.createElement("option");
            tempTopOption.text=colors[color];
            tempBottomOption.text=colors[color];
            tempTopColorSelect.append(tempTopOption);
            tempBottomColorSelect.append(tempBottomOption);
    }
    //以下显示功能说明；
    var tempField=document.getElementById("description-display-text");
    var tempOl=document.createElement("ol");
    for(var desText of descriptionText){
        var tempLi=document.createElement("li");
            tempLi.innerHTML=desText;
            tempOl.append(tempLi); 
    }
    tempField.append(tempOl);/**/
})();//立刻执行函数
//点击保存时的处理函数
function btnHandleSave(){
    window.open(document.getElementById("canv").toDataURL());
}
function btnHandleClear(){
//用于清空输入框和图片上的信息
    document.querySelector("#bottomText").value="";
    document.querySelector("#topText").value="";
    glTopText="";
    glBottomText="";
    textChangeListener();
}
function getColor(str){//获得文字外框颜色
    var tempSelect="";
    if(str=="topTxt"){
        tempSelect=document.getElementById("toptext-color");  
    }else if(str=="bottomTxt"){
        tempSelect=document.getElementById("bottomtext-color");
    }
    var tempIndex=tempSelect.selectedIndex;
    var tempText=tempSelect.options[tempIndex].text;
    return tempText;
}