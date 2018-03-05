var listContentThis;
var ListConent = function() {
    this.iconListCss = ko.observableArray([{iconList: true},{iconList: true},{iconList: true}]);
    this.searchListHidden = ko.observable(false);
    this.location = ko.observable("可选景点列表");
    this.showLocationList = ko.observableArray(coordinates);
    this.selectLocation = ko.observable();
    //this.clicked = ko.observable(true);
    listContentThis = this;
}
var ViewModel = function() {
    this.currentList = ko.observable(new ListConent());//显示当前列表信息
    //切换菜单
    this.toggleMenu = function(event) {
            var state;
            if(listContentThis.searchListHidden()) {
                $("#map").css({left:'0'});
                state = false;
            }else {
                $("#map").css({left:'200px'});
                state = true;
            }
            listContentThis.searchListHidden(state);
    };
    //搜索处理，显示匹配的列表信息
    this.selectHandler = ko.computed(function() {
        $("li").css({color: "white"});
        var tempSelect = listContentThis.selectLocation();//获取输入框的信息
        var tempList = coordinates;
        if(tempSelect){
            //有搜索内容时，显示相应列表信息
            tempList = coordinates.filter(function(coordinate) {
                    return coordinate.title.match(tempSelect);
                });
        }
        return listContentThis.showLocationList(tempList);
    } ,listContentThis);
    
}
ko.applyBindings(new ViewModel());
