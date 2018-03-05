//显示MapAPI加载出错时的提示
function mapErrorHandler(){
    var tempMessage = $("<h2>Sorry, the mapAPI is not loaded...Please check the Network.</h2>");
    $(tempMessage).css({ width:"100%",textAlign:"center"})
    $("#map").html(tempMessage);
}