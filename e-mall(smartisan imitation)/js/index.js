var jq=$.noConflict();//避免和模板字面量发生冲突   
var scrollImageArr=["ofo.png","500xd.png","Fch.png","Pro2.png","wy.png"];
var scrollImageArrlen=scrollImageArr.length;
var scrollFlag=0;//用于图片的循环
var itemsArr=[{iteminfo:"空",itemunitprice:"0",itemcolor:"",itemtotalprices:"0"}];//存储已添加的商品的信息
var clearTimeFlgArr=["",""];//用于清除定时器
var userAccAndPw=[];//登记用户信息userAccAndPw=[{user:"",password:""}]
var lazyImages={
    lazyImgArr:jq("img"),
    currentImgId:"0"
};//用于存放当前已加载的最后一张图片的Id,再次加载从这里开始
var throttleLazyAddImg=throttle(()=>{lazyAddImages();},400);//采用节流的优化方法懒加载图片
jq(function(){ 
    setInterval(changeScrolllImage,5000);
    jq(".mainpage1-icobox div").on("click",function(){
        jq(".mainpage1-icobox div").attr("class","");//清除原class
        scrollFlag=jq(event.target).data("imageiconnum");
        jq(event.target).attr("class","active");
        ScrollImageFade();
    });
    lazyAddImages();//懒加载图片
    document.onscroll=function(){
        //实现滚轮合适的位置固定
        var tempnav=jq("#smallnavbar");
        var tempScrollTop=jq(document).scrollTop();
        //实现加入购物车的商标信息框随导航变化
        var tempfrm=jq("#additemstocartshowfrm");
        if(tempScrollTop>=100){
            tempnav.addClass("navbar-fixed-top");
            jq("#smallnavbarright").css({display:"block"});
            tempfrm.css({top:"0"});
            jq(".setsmallnavoverflowhidden").css({height:"60px"});//实现smallnav导航在窗口缩小时溢出隐藏
            jq(".userlogoutFrm").css({top:"0",right:"80px"});
        }else{
            tempnav.removeClass("navbar-fixed-top");
            jq("#smallnavbarright").css({display:"none"});
            tempfrm.css({top:"-85px"});
            jq(".userlogoutFrm").css({top:"-85px",right:"100px"});
            jq(".setsmallnavoverflowhidden").css({height:"85px"});
        }
        throttleLazyAddImg();//节流模式懒加载
    }
    //当鼠标移动到“手机上时显示”图片;
    jq("#smallnavbar-li-show,.smallnavbar-li-show,.smallnavbar-li-show-iphone").hover(function(){
        var tempShowIphonefram=jq(".smallnavbar-li-show-iphone");
        tempShowIphonefram.css({ height:"300px", width:"100%"});
        var tempShowIphone=jq(".smallnavbar-li-show-iphone div");
            tempShowIphone.css({display:"block"});
    },function(){
        var tempShowIphone=jq(".smallnavbar-li-show-iphone div");
        tempShowIphone.css({display:"none"});
        var tempShowIphonefram=jq(".smallnavbar-li-show-iphone");
        tempShowIphonefram.css({height:"0"});
    });
    //可添加商品提示信息
    jq(".addshoppingcart").hover(function(){
        jq(event.target).next().css({display:"block"});//获取下一个节点
    },function(){
        jq(event.target).next().css({display:"none"});
    });
    //加入购物车时显示信息
    jq(".addshoppingcart").on("click",function(event){//用于显示加入购物车的信息
        var itemsArrLen=itemsArr.length;
        var tempHotgoods=jq(event.target).prev(".hotgoods");
        var tempItemInfo=tempHotgoods.children(".itemtitle").children().text();
        var tempItemUnitPrice=tempHotgoods.children(".hotgoodslist-price").children().children().text();
        //此处不能有.val()获取value的值，因为其得到的只能是数字.
        var tempItemColor=tempHotgoods.children(".selecticonbox").children().children(".selected").attr("value");
        var tempTotalPrices=parseInt(tempItemUnitPrice)+parseInt(itemsArr[itemsArrLen-1].itemtotalprices);
        var tempItem={iteminfo:`${tempItemInfo}`,itemunitprice:`${tempItemUnitPrice}`,itemcolor:`${tempItemColor}`,itemtotalprices:`${tempTotalPrices}`};
            tempItem.id=itemsArrLen;
            itemsArr.push(tempItem);
            showAddShoppingCart(itemsArr);
    })
    //点击购物车里的删除时，删除最新添加的商品,此处的定时器用clearTimeFlgArr[1]
    jq("#cartdeletebtn").on("click",function(){
        clearTimeout(clearTimeFlgArr[1]);//防止删除按钮点击过快
        var tempItemsArrLen=itemsArr.length;
        if(tempItemsArrLen>1){
            jq(".cartshowfrmbody").css({color:"red"});
            jq(".cartshowfrmheader strong").text("已删商品信息:");
            clearTimeFlgArr[1]=setTimeout(function(){
                itemsArr.splice(-1,1);//删除最新添加的商品
                //恢复原始显示样式；
                jq(".cartshowfrmbody").css({color:"black"});
                jq(".cartshowfrmheader strong").text("最新添加商品信息:");
                showAddShoppingCart(itemsArr);
            },500);
        } 
    });
    //鼠标移动至购物车时，显示购物车信息
    jq(".hovershowcartfrm,#additemstocartshowfrm").hover(function(){
        clearTimeout(clearTimeFlgArr[0]);
        jq("#additemstocartshowfrm").css({height:"200px",border:"1px solid #aaa"});
        jq(".additemstocartshowtohidden").css({display:"block"});
    },function(){
        jq("#additemstocartshowfrm").css({height:"0",border:"0"});
        jq(".additemstocartshowtohidden").css({display:"none"});
    });
    //商品颜色的选择
    jq(".selecticonbox li").on("click",function(event){
        jq(event.target).siblings().removeClass("selected");
        jq(event.target).addClass("selected");
    });
    //关闭登陆或创建账户窗口
    jq(".loginbtn button[type='close']").on("click",function(){
        jq(".usercreateaccountfrm").css({display:"none"});
        jq(".userloginfrm").css({display:"none"});
    });
    //显示登陆窗口
    jq(".userloginlogo").on("click",function(){
        jq(".userloginfrm").css({display:"block"});
        jq(".usercreateaccountfrm").css({display:"none"});
        jq(".useraccount input").val("");
        jq(".userpassword input").val("");
        jq(".useraccount input").css({background:"#fff"});
        jq(".userpassword input").css({background:"#fff"});
    });
    //显示创建账户窗口
    jq("#createnewaccount").on("click",function(){
        jq(".userloginfrm").css({display:"none"});
        jq(".usercreateaccountfrm").css({display:"block"});
        jq(".useraccount input").val("");
        jq(".userpassword input").val("");
        jq(".userpasswordcheck input").val("");
        jq(".useraccount input").css({background:"#fff"});
        jq(".userpassword input").css({background:"#fff"});
        jq(".userpasswordcheck input").css({background:"#fff"});
    });
    jq(".loginbtn button[type='submit']").on("click",function(event){
        var userFrm=jq(event.target).parent().parent();
        var newAccout=userFrm.children(".useraccount").children("input").val();
        var newPassword=userFrm.children(".userpassword").children("input").val();
        var curEventParentClas=userFrm.attr("class");
        var tempArrLen=userAccAndPw.length;
        var tempLoginPassword="";//判断登陆密码和输入密码是否相等
        var userOrder=0;//用于显示第几个用户登陆，看注册的顺序为准
        var loginFlag=false;
        var createFlag=false;
        var equalFlg=false;
        //console.log(userAccAndPw);
        if(tempArrLen>0){
            for(var index in userAccAndPw){
                equalFlg=(newAccout==userAccAndPw[index].user); 
               if(equalFlg){//说明用户存在
                    createFlag=false;
                    loginFlag=true;
                    tempLoginPassword=userAccAndPw[index].password;
                    userOrder=index-0+1;
                    break;//特别重要；
               }else{
                    loginFlag=false;
                    createFlag=true;
               }
            }
        }else{
            if(curEventParentClas=="userloginfrm"){ //没有注册用户名
                jq(".useraccount input").css({background:"#f3a9a9"});
                jq(".useraccount input").val(`请先注册账户`);
            }
        }
        if(!equalFlg&&(curEventParentClas=="userloginfrm")){//用户名不存在
            jq(".useraccount input").css({background:"#f3a9a9"});
            jq(".useraccount input").val(`用户名不存在`);
        }
        if((curEventParentClas=="userloginfrm")&&loginFlag){
            if(tempLoginPassword==newPassword){//登陆成功，显示客户注册顺序
                jq(".userloginlogo").attr("title",` Welcome ${newAccout} \n 你是第${userOrder}位注册用户`);
                jq(".useroder").text(userOrder);
                //关闭登陆界面;
                jq(".userloginfrm").css({display:"none"});
                //出现“退出按钮”
                jq("#userlogout").html("退出");
            }else{
                jq(".userpassword input").css({background:"#f3a9a9"});
            }
        }
        if((curEventParentClas=="usercreateaccountfrm")&&(createFlag||(tempArrLen==0))){
            var newPasswordCheck=userFrm.children(".userpasswordcheck").children("input").val();
            if((newPassword==newPasswordCheck)&&newPassword&&newAccout){
                //注册成功并显示登陆界面
                // var userAccAndPw=[{user:"",password:""}];//登记用户信息
                var tempUserObj={user:`${newAccout}`,password:`${newPassword}`};
                tempUserObj.id=tempArrLen;
                userAccAndPw.push(tempUserObj);
                jq(".userloginfrm").css({display:"block"});
                jq(".usercreateaccountfrm").css({display:"none"});
                jq(".useraccount input").val("");
            }else if(!newAccout){
                jq(".useraccount input").css({background:"#f3a9a9"});
                jq(".useraccount input").val(`请填写账户信息`);
            }else if(!newPassword){
                jq(".userpassword input").css({background:"#f3a9a9"});
            }else{
                jq(".userpasswordcheck input").css({background:"#f3a9a9"});
            }
        }else if((curEventParentClas=="usercreateaccountfrm")&&!createFlag){
            jq(".useraccount input").css({background:"#f3a9a9"});
            jq(".useraccount input").val(`该账户已注册,请重新登陆`);
            jq(".userpassword input").val("");
            jq(".userpasswordcheck input").val("");
        }
    });
    //清除背景颜色警告
    jq(".useraccount input,.userpassword input,.userpasswordcheck input").on("focus",function(){
        jq(".userpasswordcheck input").css({background:"#fff"});
        jq(".useraccount input").css({background:"#fff"});
        jq(".userpassword input").css({background:"#fff"});
    });
    //点击退出账户
    jq("#userlogout").on("click",function(){
        jq(".userloginlogo").attr("title",` 点击登陆`);
        jq(".useroder").text("0");
        jq("#userlogout").html("请点击图标登陆");
    });
    //登陆后，鼠标移动至userlog上时，显示退出按钮
    jq(".userloginlogo,.userlogoutFrm").hover(function(){
        jq(".userlogoutFrm").css({display:"block"});
    },function(){
        jq(".userlogoutFrm").css({display:"none"});
    });
});
function showAddShoppingCart(itemsArr){
    var tempArrIndex=itemsArr.length-1;//数组索引
    jq("#iteminfo").text(`${itemsArr[tempArrIndex].iteminfo} --- ${itemsArr[tempArrIndex].itemcolor}`);
    jq("#itemunitprice").text(`单价:\n ￥${itemsArr[tempArrIndex].itemunitprice}`);
    jq(".cartitemnum").text(tempArrIndex);
    jq("#itemtotalnum strong").text(tempArrIndex);
    jq("#itemtotalprices strong").text(itemsArr[tempArrIndex].itemtotalprices);
    showCartFrm();
}
function showCartFrm(){
    clearTimeout(clearTimeFlgArr[0]);//防止多个定时器冲突
    jq("#additemstocartshowfrm").css({height:"200px",border:"1px solid #aaa"});
    jq(".additemstocartshowtohidden").css({display:"block"});
    clearTimeFlgArr[0]=setTimeout(function(){
        jq("#additemstocartshowfrm").css({height:"0",border:"0"});
        jq(".additemstocartshowtohidden").css({display:"none"});
    },2000);
} 
function ScrollImageFade(){
    var srcrollImgId=jq("#mainpage1-scrollset");
    srcrollImgId.css({backgroundImage:`url(images/scrollimages/${scrollImageArr[scrollFlag]})`,opacity:"0.1"});
    srcrollImgId.fadeTo(1000,1);//背景变色
}
function changeScrolllImage(){
    ScrollImageFade();
    //关联图片和按钮,通过ID设置
    jq(".mainpage1-icobox div").attr("class","");//清除原class
    var temp=jq(`.mainpage1-icobox #scrollimagenum${scrollFlag}`);
    temp.attr("class","active");
    scrollFlag++;
    if(scrollFlag>=scrollImageArrlen){
        scrollFlag=0;
    }
}
function throttle(lazyAddImgs,waitTime){
    var lastTime=new Date();
    var clearTimeFlg=null;//清除定时器，后面可和之前的数组实现统一定义
    return function(){
        var that=this;
        var currentTime=new Date();
        if(currentTime-lastTime>waitTime){
            if(clearTimeFlg){
                clearTimeout(clearTimeFlg);
                clearTimeFlg=null;
            }
            lazyAddImgs.apply(that,arguments);//把arguments参数传到当前函数中；
            lastTime=currentTime;
            //console.log("doing...");
        }else if(!clearTimeFlg){
            clearTimeFlg=setTimeout(()=>{
                lazyAddImgs.apply(that,arguments);//改变执行上下文的环境
            },waitTime);
        }
    }
}
//图片懒加载;
function lazyAddImages(){
    var lazyImgNums=lazyImages.lazyImgArr.length;
    var tempScrollTop=jq(document).scrollTop();
    var tempWinHeight=tempScrollTop+jq(window).height();
    for(var i=lazyImages.currentImgId;i<lazyImgNums;i++){
        var imgToTop=jq(lazyImages.lazyImgArr[i]).offset().top;
        var tempSrc=jq(lazyImages.lazyImgArr[i]).data("src");
        if(imgToTop<=tempWinHeight){
            jq(lazyImages.lazyImgArr[i]).attr("src",tempSrc);
            console.log(tempSrc);
            lazyImages.currentImgId=lazyImages.currentImgId-0+1;
        }
    }
}