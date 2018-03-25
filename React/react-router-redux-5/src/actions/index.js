export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT';
export const SEARCH_FILMDETAIL = 'SEARCH_FILMDETAIL';
export const SEARCH_BYKEYWORD = 'SEARCH_BYKEYWORD';
export const ADDTO_COLLECT = 'ADDTO_COLLECT';
export const BROWSING_HISTORY = 'BROWSING_HISTORY';
export const REQUEST_POSTS = 'REQUEST_POSTS';
export const RECEIVE_POSTS = 'RECEIVE_POSTS';

export const selectSubreddit = subreddit => ({
    type: SELECT_SUBREDDIT,
    subreddit
})
//电影详情
export const searchFilmDetail = subreddit =>({
    type: SEARCH_FILMDETAIL,
    subreddit
})
//关键字搜索电影
export const searchByKeyword = subreddit =>({
    type: SEARCH_BYKEYWORD,
    subreddit
})
// 添加至收藏夹
export const addToCollect = (subreddit)=>({
    type: ADDTO_COLLECT,
    films:  subreddit
})
// 浏览记录
export const browsingHistory = (subreddit) =>({
    type: BROWSING_HISTORY,
    films: subreddit
})

export const requestPosts = subreddit => ({
    type: REQUEST_POSTS,
    subreddit
})
  
export const receivePosts = (subreddit, json) => ({
    type: RECEIVE_POSTS,
    subreddit,
    posts: json.subjects
})
const fetchPosts = subreddit => dispatch => {
    dispatch(requestPosts(subreddit))
    return ( fetch( `https://cors-anywhere.herokuapp.com/https://api.douban.com/v2/movie/${subreddit}`)
        .then(response => response.json())
        .then(json =>
           dispatch(receivePosts(subreddit, json)))
    )
}
/////
const fetchFilmsDetail = subreddit => dispatch => {
    dispatch(requestPosts(subreddit))
    return ( fetch( `https://cors-anywhere.herokuapp.com/https://api.douban.com/v2/movie/${subreddit}`)
        .then(response => response.json())
        .then(json =>
           dispatch(receiveFilmsDetail(subreddit, json)))
    )
}
export const receiveFilmsDetail = (subreddit, json) => ({
    type: RECEIVE_POSTS,
    subreddit,
    posts: json
})
////////
const shouldFetchPosts = (state, subreddit) => {
    const posts = state.postsBySubreddit[subreddit] || undefined
    if (!posts) {
      return true
    }
    if (posts.isFetching) {
      return false
    }
    return false
}

export const fetchFilmsDetailIfNeeded = subreddit => (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchFilmsDetail(subreddit))
    }
}

export const fetchPostsIfNeeded = subreddit => (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
}