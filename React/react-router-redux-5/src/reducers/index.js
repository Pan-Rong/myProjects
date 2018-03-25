import { combineReducers } from 'redux';
import {
  SELECT_SUBREDDIT, 
  REQUEST_POSTS, RECEIVE_POSTS,
  SEARCH_FILMDETAIL,
  SEARCH_BYKEYWORD,
  BROWSING_HISTORY,
  ADDTO_COLLECT
} from '../actions';


const openOrCollectFilms = (state = {
  openFilms : [],
  collectFilms : []
},action) => {
  switch (action.type) {
    case BROWSING_HISTORY:
      state.openFilms.unshift(action.films)
      return  {
        ...state,
        openFilms : state.openFilms
      }
    case ADDTO_COLLECT:
      state.collectFilms.unshift(action.films)
      return {
        ...state,
        collectFilms : state.collectFilms
      }
    default:
      return state
  }
}
const selectedFilmsKeyword =  (state = " ", action) => {
  switch (action.type) {
    case SEARCH_BYKEYWORD:
      return `search?tag=${action.subreddit}` 
    default:
      return state
  }
}  

const selectedSubreddit = (state = "in_theaters", action) => {
    switch (action.type) {
      case SELECT_SUBREDDIT:
        return action.subreddit
      default:
        return state
    }
  }  
const selectedFilmsDetailSubreddit = (state = "", action)=>{
  switch (action.type) {
      case SEARCH_FILMDETAIL:
        return `subject/${action.subreddit}`
      default:
        return state
    }
}
const posts = (state = {
    isFetching: false,
    items: []
  }, action) => {
    switch (action.type) {
      case REQUEST_POSTS:
        return {
          ...state,
          isFetching: true,
        }
      case RECEIVE_POSTS:
        return {
          ...state,
          isFetching: false,
          items: action.posts,
        }
      default:
        return state
    }
}
  
const postsBySubreddit = (state = { }, action) => {
    switch (action.type) {
      case RECEIVE_POSTS:
      case REQUEST_POSTS:
        return {
          ...state,
          [action.subreddit]: posts(state[action.subreddit], action)
        }
      default:
        return state
    }
}
  
const rootReducer = combineReducers({
    postsBySubreddit,
    selectedSubreddit,
    selectedFilmsDetailSubreddit,
    openOrCollectFilms,
    selectedFilmsKeyword
})
  
export default rootReducer
