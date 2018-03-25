import React from 'react';
import My from '../pages/My';
import Coming from '../pages/Coming';
import Popular from '../pages/Popular';
import Favorite from '../pages/Favorite';
import Collect from '../containers/Collect';
import History from '../containers/History';
import Search from '../containers/Search';

const My1 = ({routes}) => ( <My routes={routes}/> )
const MyHistory = () => ( <History /> )
const MyCollect = () => ( <Collect /> )
const MySearch = () => ( <Search /> )
//
const Coming1 = ({routes}) => ( <Coming routes={routes}/> )
const Popular1 = ({routes}) => ( <Popular routes={routes}/> )
const Favorite1 = ({routes}) => ( <Favorite routes={routes}/> )


export const routes = [   
    {
        path: "/popular",
        title: "热映",
        routes: [],
        component: Popular1,
        imageSrc_active:"/images/popular_active_icon.png"
    },
    {
        path: "/coming",
        title: "待映",
        routes: [],
        component: Coming1,
        imageSrc_active:"/images/coming_active_icon.png"
    },
    {
        path: "/favorite",
        title: "口碑",
        routes: [],
        component: Favorite1,
        imageSrc_active:"/images/top_active_icon.png"
    } ,
    {
        path: "/search",
        title: "搜 索",
        component: MySearch,
        routes: [],
        imageSrc_active:"/images/search_active_icon.png"
    },
    {
        path: "/my",
        data_path:"",
        exact: true,
        title: "我 的",
        component: My1,
        routes: [
            {
                path: "/my/history",
                component: MyHistory,
                title: "浏览记录"
            },
            {
                path: "/my/collect",
                component: MyCollect,
                title: "收藏"
            },
        ],
        imageSrc_active:"/images/my_active_icon.png"
    }
];

export const hotKeyWords = [
    "功夫熊猫","厉害了，我的国","红海行动","水形物语", "捉妖记2","千与千寻","红色恋人","海上钢琴师"
]

//bannerList: 首页（热映页）轮播图列表列表
var url = 'https://static.sesine.com/wechat-weapp-movie'

export  const  bannerList = [
    {type:'film', id: '26683290', imgUrl: url + '/images/banner_1.jpg'},
    {type:'film', id: '25793398', imgUrl: url + '/images/banner_2.jpg'},
    {type:'film', id: '26630781', imgUrl: url + '/images/banner_3.jpg'},
    {type:'film', id: '26415200', imgUrl: url + '/images/banner_4.jpg'},
    {type:'film', id: '3025375', imgUrl: url + '/images/banner_5.jpg'}
]