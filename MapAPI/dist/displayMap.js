var tempNemMakers = [];//用于存放标记，以便比较是否需要隐藏；
var map,infoWindow ;
 // 创建默认标记样式和高亮标记样式
var defaultIcon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_b.png';
var highlightedIcon = 'http://webapi.amap.com/theme/v1.3/markers/n/mark_r.png';

function init(){
    // 创建地图对象，默认显示位置
    map = new AMap.Map('map', {
        center: [116.397428, 39.90923],
        zoom: 11
    });

    map.plugin(["AMap.ToolBar"], function() {
        // 添加 工具条
        map.addControl(new AMap.ToolBar());
    });
    // 创建 默认信息窗体
    infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});

    // 为地图添加标记
    var tempCoordinates = listContentThis.showLocationList();
    tempCoordinates.forEach(function(coordinate){
        var newMarker = new AMap.Marker({
            icon: defaultIcon,
            position: coordinate.position,
            map: map,
            title: coordinate.title,
            offset: new AMap.Pixel(-12,-36)
        }); 
        newMarker.content =  coordinate.title + ' \n 地址：' + coordinate.address + ' \n 了解所在城市当天的天气情况，请单击marker;  \n ';

       // 设置鼠标移入和移出标记的图标状态, 并显示景点地址信息；
       newMarker.on('mouseover', function(event) {
            this.setIcon(highlightedIcon);

            event.target.content =  coordinate.title + ' \n 地址：' + coordinate.address + ' \n 了解所在城市当天的天气情况，请单击marker;  \n ';
            
            infoWindow.setContent(event.target.content);

            infoWindow.open(map, event.target.getPosition());
        });
        newMarker.on('mouseout', function() {
            this.setIcon(defaultIcon);
        });

       // 查询当前所在城市的天气
        var tempCity = coordinate.city;
        newMarker.on('click', function(event){
            getWeather(tempCity,event.target);
        });
        newMarker.setAnimation('AMAP_ANIMATION_DROP');
        tempNemMakers.push(newMarker);
    });
    console.log(tempNemMakers);
}
// 显示当地天气的API(聚合数据)
function getWeather(city,thisMarker){
    $.ajax({
        url:"http://v.juhe.cn/weather/index?format=2",
        //以下是不写data时的表达行形式
        //encodeURIComponent()将字符串转换成URL编码形式
        //url:"http://v.juhe.cn/weather/index?format=2&cityname="+encodeURIComponent(city)+"&key=8dbd540174f81df029f099521c07207b",
        type: "get",
        async: true,
        data:{
                "cityname": city,
                "key":"8dbd540174f81df029f099521c07207b"
            },
        dataType: "jsonp",
        jsonp: "callback",
        jsonpCallback:"cityWeather",
        success: function(json){
            var weaPic=json.result.today;
            //当前天气
           // console.log(json.result);
            var currentW=`当前城市：${weaPic.city} &nbsp;&nbsp;气温： ${weaPic.temperature} &nbsp;&nbsp;&nbsp;&nbsp;更新时间：${weaPic.date_y} &nbsp;&nbsp; ${json.result.sk.time}`;
            thisMarker.content = currentW ;
            infoWindow.setContent(thisMarker.content);
            infoWindow.open(map, thisMarker.getPosition());
        },
        error: function(XMLHttpRequest, textStatus, errorThrown){ 
            alert(XMLHttpRequest.status);
        }
    });
}
//显示筛选的景点marker信息
function showMarkers(tempLocation) {
    for(var i = 0;i < tempNemMakers.length;i++ ) {
        tempNemMakers[i].setMap(null);
        for(var j = 0;j< tempLocation.length;j++ ){
            if(tempNemMakers[i].Uh.title == tempLocation[j].title){
                tempNemMakers[i].setMap(map);
            }
        } 
    }
    map.setFitView();
}
//绑定输入框的实时监听事件，筛选与输入内容相符合的marker
$(function(){
    $('input[type="text"]').bind("input",function(event){
        showMarkers(listContentThis.showLocationList());
    });
    //绑定列表点击事件，实现点击时，marker随之变化
    $(document).delegate("li","click",function(event){//动态绑定li的点击事件
        $("li").css({color: "white"});
        var tempContent = [{title:event.target.innerHTML}];
        showMarkers(tempContent);
        $(event.target).css({color: "red"});
    });
});