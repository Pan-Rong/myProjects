$(document).ready(function() {
    showQuoteContent();
    $("button").on("click",showQuoteContent);
    $("#twitterId").on("click", function() {
        $("#twitterId").attr("href","https://twitter.com/intent/tweet?hashtags=quotes&text="+encodeURIComponent("\""+currentQuoteContent+"\""+currentQuoteAuthor));
        openURL("https://twitter.com/intent/tweet?hashtags=quotes&text="+encodeURIComponent("\""+currentQuoteContent+"\""+currentQuoteAuthor));
    });
    $("#tumblrId").on("click", function() {
      //encodeURIComponent() 函数可把字符串作为 URI 组件进行编码;
      //attr() 方法设置或返回被选元素的属性值;
        $("#tumblrId").attr("href","https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="+encodeURIComponent(currentQuoteAuthor)+"&content="+encodeURIComponent(currentQuoteContent)+"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button");
        openURL("https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption="+encodeURIComponent(currentQuoteAuthor)+"&content="+encodeURIComponent(currentQuoteContent)+"&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button");
    });
  });
  var currentQuoteContent="";//用于传递给其他网站
  var currentQuoteAuthor="";//用于传递给其他网站
  function showQuoteContent(){
      $(".bgroundset").fadeTo("slow",0.8);//背景变色
      $("blockquote").fadeTo("slow",0.2,function(){//引言变色
      var getRanColor=getRandomColor();
      var getRanQuote=getRandomQuote();//得到随机颜色
        currentQuoteContent=getRanQuote.quoteContent;
        currentQuoteAuthor=getRanQuote.quoteAuthor;
      $("blockquote").html('<b>"</b>'+getRanQuote.quoteContent+'<small class="quotesetcolor"></small>');
      $("small").html(getRanQuote.quoteAuthor);
      $(".quotesetcolor").css("color",getRanColor);
      $(".bgroundset").css("background",getRanColor);
  
       $(".bgroundset").fadeTo("slow",1);
       $("blockquote").fadeTo("slow",1); 
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
  function getRandomQuote(){
    var getRandom=quote.length-1;
    if(getRandom>=0){
      getRandom=Math.floor(Math.random()*getRandom);
      return quote[getRandom];
    }
  }
  var quote=[
      {"quoteContent":"Borlaug's persistence and scientific vision can make to human.",
    "quoteAuthor":"Indian Manmohan"},
      {"quoteContent":"Audacity, more audacity, always audacity.",
       "quoteAuthor":"Georges Danton"},
      {"quoteContent":"The signs of outstanding leadership appear primarily among the followers.",
       "quoteAuthor":"Max De Pree"},
      {"quoteContent":"It is much simpler to buy books than to read them and easier to read them than to absorb their contents.",
       "quoteAuthor":"William Osler"},
      {"quoteContent":"It is no use saying, 'We are doing our best.' You have got to succeed in doing what is necessary.",
       "quoteAuthor":"Winston Churchill"},
      {"quoteContent":"More gold has been mined from the thoughts of men than has been taken from the earth.",
       "quoteAuthor":"Napoleon Hill"},
      {"quoteContent":"Trust yourself. You know more than you think you do.",
       "quoteAuthor":"Benjamin Spock"},
      {"quoteContent":"Pursue something so important that even if you fail, the world is better off with you having tried.",
       "quoteAuthor":"Tim O’Reilly"},
      {"quoteContent":"Do something wonderful, people may imitate it.",
       "quoteAuthor":"Albert Schweitzer"},
      {"quoteContent":"If you realized how powerful your thoughts are, you would never think a negative thought.",
       "quoteAuthor":"Peace Pilgrim"},
      {"quoteContent":"Look yourself in the mirror and ask yourself, what do I want to do everyday for the rest of my life … Do that.",
       "quoteAuthor":"Gary Vaynerchuk"},
      {"quoteContent":"Our freedom to discipline ourselves is a freedom we can lose if we don’t use it.",
       "quoteAuthor":"Cullen Hightower"},
      {"quoteContent":"The difference between impossible and possible is a willing heart.",
       "quoteAuthor":"Lolly Daskal"},
      {"quoteContent":"I’m going to a special place when I die, but I want to make sure my life is special while I’m here.",
       "quoteAuthor":"Payne Stewart"},
      {"quoteContent":"Those who bring sunshine into the lives of others, cannot keep it from themselves.",
       "quoteAuthor":"J. M. Barrie"}
    ]