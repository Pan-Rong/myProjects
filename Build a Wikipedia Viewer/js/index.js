var jq=$.noConflict();//避免发生冲突
jq(document).ready(function(){ 
  jq(".searchbutton").delegate(".fa-search","click",function(){
    jq(".searchbp").css({"display":"none"});
       displayTextFrm();
  });
  jq(".searchbutton").delegate(".fa-search","mouseover",function(){
       jq(".searchbp").css({"display":"block"});
  });
  jq(".searchbutton").delegate(".fa-search","mouseout",function(){
       jq(".searchbp").css({"display":"none"});
  });
  //以下为给动态添加的DOM绑定事件
  jq(".searchfrm").delegate(".form-control","keydown",function(event){
      if(event.keyCode===13){
         jq(".searchoutput").html("");//清空内容，便于存放新数据
        var temCont=jq("#searchText").val();
        displaySreachContent(temCont);
      }
  });
   jq(".searchfrm").delegate(".fa-close","click",function(){
       jq(".searchoutput").html("");
        hiddenTextFrm();
   });
});
function displayTextFrm(){
  // jq(".fa-search").animate({});
     jq(".fa-search").remove();
     jq(".searchfrm").css({"display":"block"});
     jq(".searchfrm").animate({"width":"210px"},500,function(){
        var backIcon=`<div class="input-group"><input type="text" class="form-control" id="searchText" placeholder="search"><i class="fa fa-close"></i></div>`; 
        jq(".searchfrm").append(backIcon);
    });
 }
function hiddenTextFrm(){
  jq(".searchfrm").animate({"width":"46px"},500,function(){
     jq(".searchfrm").css({"display":"none"});
    jq(".searchfrm").html("");
     var searchIcon=`<i class="fa fa-search"></i>`;
   jq(".searchbutton").append(searchIcon);
    
  });
}
function displaySreachContent(temCont){
    jq.ajax({
        url:"https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&generator=search&prop=pageimages|extracts&exintro&explaintext&exsentences=1&exlimit=max",
        data:{"gsrsearch":temCont},
        success:function(json){
         // alert("Hello");
          var searchResult=json.query.pages;
 //json.query.pages该对象中的key是数字，用以下的方法实现各key的提取
          for(var sR in searchResult){
            //此处有两种实现维基百科页面的显示方法
            //第一种：https://en.wikipedia.org/?curid="pageid"；
            //第二种：https://en.wikipedia.org/wiki/"title"
            var searchReHtml=`<div class="searchoutputInner container"><a href="https://en.wikipedia.org/?curid= ${searchResult[sR].pageid}" target="_blank">
                              <p>${searchResult[sR].title}</p>
                              <p>${searchResult[sR].extract}</p>
                            </a></div>`;
            jq(".searchoutput").append(searchReHtml);
          }
        }
      });
 }
