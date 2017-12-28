/*******************************************************************************
				1.实现了点击开始，可以出现随机的16张图片，
				2.实现了16张图片中两两相等的效果;
				3.重新布局后的图片信息复制给新数组，实现了图片的比较	
				4.实现了翻开图片的效果
				5.实现了重置时图片重新隐藏
				6.实现了两个图片的比较，相等时提示"good job";
				7.实现了两次点击同一图片时，显示提示信息"图片已经匹配"
				8.实现了两次图片不匹配时，隐藏图片，以便再次选择;
				9.实现已匹配图片不能再次点击;
				10.实现未刷新时，提示刷新后开始游戏
				11.实现了时间显示;且60s内没有完成任务，则提示游戏结束，点击图片提示超时，需要刷新
				12.实现了reset时，时间清零并重新计数;
				13.实现显示步数;并在reset时重新显示和计数
				14.实现等级的显示和更新,有2对匹配即得一颗星
				15.实现了在规定时间里完成任务时,时间暂停，显示已用步数和星星个数
				16.实现暂停按钮;点击暂停按钮更换图片;
				17.实现暂停按钮，计时暂停，再次启动计时时，累计计时;
				18.实现暂停时,点击图片提示暂停提示，需点击开始按钮;
***************************************************************************/
//暂停函数，暂停时，计数停止，图标变化，点击图片显示暂停中
var pauseflg=0;//记录是否暂停,暂停为0;播放为1;
var pauseNum=0;//记录暂停的次数;
function pausehandle(obj){
	pauseNum++;
	//修改该输入按钮的背景图片;
	var pnode=obj.id;
	//记录是否暂停,暂停为0;播放为1;
	if(!(pauseNum%2)){
		obj.id="playbutton";
		pauseflg=1;
		console.log(savetime);
		showTime();
		timetag1=1;
	}else{
		obj.id="pausebutton";
		pauseflg=0;
		stoptime();
		timetag1=2;//为了时间能重新计时,
		pausetime=savetime-0;//保存暂停的值，实现再起开播时累计计时
	}
}
function stoptime(){
	clearTimeout(gameovertime);//重置
}
var pausetime=0;//用来保存暂停时的时间
var timetag=0;//记录是否超时,若超时设置为1;
var timetag1=0;//记录是否是重置，若是标志设为1；只在时间函数中使用;
var timestartcount=0;//记录第一次点击时的时间，用于比较
var gameovertime=0;//用于在规定时间内完成任务时，暂停计时;
var savetime=0;//用来存储转换后的时间,以便暂停后实现保存		
function showTime(){
	
	var startTime=new Date();
	var s=startTime.getSeconds();
	if(!timetag){	//未超时时，正常显示;
	savetime=checkTime(s);
	displayTime(savetime);//document.getElementById("starttime").innerHTML=savetime+'s';
	gameovertime=setTimeout("showTime()",200);//为了方便后边暂停计时
	}
}	
function displayTime(savetime1){
	document.getElementById("starttime").innerHTML=savetime1+'s';
}
function checkTime(i){
	var timecount=0;
	if(timetag1===1){//用于记录第一次的时间，以便获得时间差,非第一次时为1，第一次为0
		if((i-timestartcount+pausetime)<0){
			timecount=60+i-timestartcount+pausetime;
		}else{
			timecount=i-timestartcount+pausetime;
		}
		if(timecount<10){
			timecount='0'+timecount;
		}else if(timecount>=59){
			alert("game over!");
			timetag=1;//记录是否超时
		}
		return timecount;
	}else if(timetag1===2){//实现暂停后，再次启动计时可以连续计时
			timestartcount=i;
			var tempausetime=pausetime;
			if(tempausetime<10){
				tempausetime='0'+tempausetime;
			}
			return tempausetime;
	}else{
			timetag1=1;
			timestartcount=i;
			return '00';
	}
}
//显示等级函数
function showStars(obj,scoreNum){
	var imgChange=obj.parentNode;
		imgChange=imgChange.parentNode;
		imgChange=imgChange.parentNode;//找到frm的id;
		imgChange=imgChange.getElementsByClassName("score");
	//var imgChange=imgChange.getElementsByTagId("img");
	for(var i=0;i<(Math.floor(scoreNum/2));i++){
		(function(i){
			imgChange[i].src="images/cards/starb.png";
		})(i);
	}
	if(Math.floor(scoreNum/2)==4){
		stoptime();//clearTimeout(gameovertime);
		alert("Congratulation!You won!"+"\n"+"With "+stepNum+"Moves"+" and "+Math.floor(scoreNum/2)+" Stars."+"\n");	
	}
}
var fnameArray=new Array();//用于存放随机布局后的图片分布信息
//设置初始化函数;
function init(){
	//初始化设置
		mouseclickNum=0;//鼠标点击的次数
		flg=0;//用于标记是否点击的是同一图片;
		stepNum=0;//记录步数
		scoreNum=0;//记录分数,2对匹配得一颗星，
		//以下是重新计数需要的
		timetag1=0;//重新计时
		timetag=0;
		timestartcount=0;
		pauseNum=0;
		pausetime=0;//表示reset时，暂停记录清零
		pauseflg=1//表示播放状态，为1时，表示播放,0表示不播放
		//savetime=0;
		showTime();
		step(stepNum);
}
function resethandle(obj){
		init();//初始化函数;
		//.getElementsByClassName("stepnumc").innerHTML=stepNum; 
//--------实现重置时等级归零----------------
		var fnod=obj.parentNode;
		var sfnod1=fnod.getElementsByClassName("score");
		for(var i=0;i<sfnod1.length;i++){
			(function(i){
				sfnod1[i].src="images/cards/starw.jpg";
			})(i);
		}
//-----------实现刷新时，显示暂停按钮的图片------------------
		var pfnod=fnod.getElementsByTagName("input");	
			pfnod[1].style.display="block";
			pfnod[1].id="playbutton";
			
//------------实现重置时隐藏图片----------------
		fnod=fnod.parentNode;
		fnod=fnod.parentNode;
		var flist=fnod.getElementsByClassName("ldivimg");
		for(var x=0;x<flist.length;x++){
			(function(x){
				flist[x].style.display="none";
				imgMatchArray[x]=0;
			})(x);
		}
		//reset时,将其清零，重新计数；
		var bgdivId=document.getElementById("bgdiv");
		var list=bgdivId.getElementsByTagName("li");
	//定义一个数组用来存储1-16这16个数；然后用随机的方法实现从数组中任选一个数，并将这个数作为图片的序数传给li，
	//然后删除该数组，得到新的数组；新的数组将继续按上述的方法进行处理，从而实现随机分配--------
	//用于图片的名字*
		var fruitsName=['apple','grape','kiwiberry','lemon','pear','persimmon','strawberry','watermelon','apple','grape','kiwiberry','lemon','pear','persimmon','strawberry','watermelon'];
		
		var listlen=list.length;
			
		for(var i=0;i<listlen;i++){
			var prob=listlen-i;//计算概率
			//随机数 使用floor函数，向下取整数,基数从0开始；与上述图片的地址匹配
			var randomNum=Math.floor(Math.random()*prob);
			(function(i){
			//imgIdNum指li里的id名称，用于储存图片放置的id地址
			 	var imgIdNum ="imgid"+i;
				var imgName=fruitsName[randomNum];//得到随机图片地址
				var text ='<img src="images/cards/'+imgName+'.jpg" >';
				//console.log(imgName);
				document.getElementById(imgIdNum).innerHTML=text;
				
				//之前的错误，是在Id的命名处出错了，因为我之前一直是用"imgIdNum"的，这是字符串，
				//document识别的只是这个字符串，不是该字符串对应的字符串，去掉"",则表示该字符串对应的字符串；
				fnameArray[i]=imgName;
			})(i);
			//删除数组中对于的元素,用splice函数实现.splice(index,len,[item]),
			//该方法会改变原始数组的长度，其中index:数组开始下标;len:替换/删除的长度
			//item:替换的值，删除操作的话，item为空;
			fruitsName.splice(randomNum,1);
		}
		console.log(fnameArray);//用于查看随机的结果;		
}
var mouseclickNum=0;//用于记录鼠标点击的次数，用于判断是否选择了2张图片
var compArray=new Array();//用于存储两次点击的数组,以便比较;
var flg=0;//用于标记是否点击的是同一图片;
var imgMatchArray=new Array();//16个零;用来实现已匹配的图片不能再次点击计算，，已匹配的设置为1，未匹配的为0;
var stepNum=0;//记录步数
var scoreNum=0;//记录分数,2对匹配得一颗星，
//实现步数的显示即清空
function step(stepNum){
	document.getElementById("stepnum").innerHTML=stepNum; 	
}

function onclickhandle(obj){
	//用于当两个图片不等时，将两个图片隐藏
	var lilist=obj.parentNode;
		lilist=lilist.parentNode;//找到id为bgdiv的div标签；
		list=lilist.getElementsByTagName("li");
	//获得是当前div里的id名称，然后使用正则表达式实现转换成数字，即可得到数组的序数，即可知道数组里的值，以便比较是否相等
	var idName=obj.firstChild.id;
	var idIntNum=idName.replace(/imgid/i,"")-0;//已转成数字
	//判断图片是否已匹配，未匹配则进行以下操作;且已经点击刷新并且超时后，点击不了;
	if((!imgMatchArray[idIntNum])&&(fnameArray[idIntNum]!==undefined)&&(!timetag)&&(timetag1!==2)){
		var divlist=obj.getElementsByTagName("div");
		divlist[0].style.display="block";
			mouseclickNum+=1;
			//console.log(mouseclickNum);
  			flg+=idIntNum;
			//判断是否选择了2张图片
 		if(mouseclickNum%2==0){
			//显示步数，同时显示不同的两张图片时(一张图片点击两次不算)，算一步;
			stepNum++;	
			step(stepNum);//显示步数
			compArray[1]=fnameArray[idIntNum];
		//判断是否两次点击的是同一图片,若是，提示操作有误需要重新选一张图片
			if((flg-idIntNum)==idIntNum)
			{
				//alert("操作有误！请再选择一张图片")
			//算第一次操作，
				flg=idIntNum;
				mouseclickNum=1;
			}else{
				if(compArray[0]==compArray[1]){
					alert("good job!");
					scoreNum++;
					
					//用来实现已匹配的图片不能再次点击计算，已匹配的设置为1，未匹配的为0；
					imgMatchArray[idIntNum]=1;
					imgMatchArray[flg-idIntNum]=1;
					showStars(obj,scoreNum);//显示星星等级;
				}else{
					alert("图片不匹配");
					list[flg-idIntNum].firstChild.style.display="none";
					list[idIntNum].firstChild.style.display="none";
							//实现当两个图片不匹配时，隐藏图片;					
				}
				flg=0;//清除标签;
			}
		 }else{
	 		compArray[0]=fnameArray[idIntNum];
			console.log(compArray[0]);
	 	}/*	*/
	}else if(fnameArray[idIntNum]===undefined){
		alert("请点击刷新按钮开始游戏！");
	}else if(timetag){
		alert("已超时，请重新开始！");
	}else if(timetag1===2){
		alert("已暂停，请点击开始！");
	}else{
		//alert("此图片已经匹配！");
	}
}