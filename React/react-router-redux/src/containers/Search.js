import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { searchByKeyword,fetchFilmsDetailIfNeeded } from '../actions';
import { Button ,PageHeader,Label,Panel} from 'react-bootstrap';
import SearchResult from '../components/SearchResult';
import { hotKeyWords } from '../routes';

class SearchFrm  extends React.Component{
  static propTypes = {
    title: PropTypes.string,
    count: PropTypes.number,
    selectedFilmsKeyword: PropTypes.string.isRequired,
    films: PropTypes.array,
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }
    state = {
      showModal: false,
    }
    open(){
      this.setState({
        showModal: true
      })
    }
    close(){
      this.setState({
        showModal: false
      })
    }
 
  componentWillReceiveProps(nextProps){
      if(nextProps){
          const { dispatch, selectedFilmsKeyword } = nextProps
          dispatch(fetchFilmsDetailIfNeeded(selectedFilmsKeyword))
      }
  }
  render(){
    let input = ''
    const { dispatch,isFetching,films,title, count } = this.props
    const isEmpty = films ? films.length === 0 : true

    return (
      <div>
        <PageHeader className="page-header-top">搜索界面</PageHeader>,
          <div className="searchfrm-class">
            <form onSubmit={e => {
                e.preventDefault();
                if(!input.value.trim()){
                    this.setState({ showModal: false })
                  return
                }
                dispatch(searchByKeyword(input.value))
              } } className="search-form-class">
              <input type="text"className="input-class" placeholder="请输入关键字搜索" ref={ node => { input = node }} />
              <Button style={{width:'25%'}} type="submit" onClick={()=>this.open()} > 搜 索 </Button>
            </form>
          </div> 
          { this.state.showModal ? (
                isEmpty ? (isFetching ? <h2 className="display-justify-center"> Loading... </h2> : <h2>Empty.</h2>)
                    :( <div>
                            <h2 className="display-justify-center">{ title } ，显示条目数：{count} </h2>
                            <SearchResult datas={ films }/>   
                      </div>
                    )
              ) : (
                <Panel className="hot-keywords">
                    <h3>热门搜索</h3>
                    <div>
                    {
                      hotKeyWords.map((hotKeyWord,j)=>{
                        return <Label className="margin-left3px" key={j}>{hotKeyWord}</Label>
                      })
                    }
                    </div>
                </Panel>
              )
          }
      
    </div>  
    )
  }
}
const mapStateToProps = state => {
  const { selectedFilmsKeyword, postsBySubreddit} = state;
  const { items: {subjects:films,title,count},isFetching } = postsBySubreddit[selectedFilmsKeyword] ||{ items:{subjects: [] } , isFetching:true}
  return {
      films,
      title,
      count,
      selectedFilmsKeyword,
      isFetching
  }

}
export default connect(mapStateToProps)(SearchFrm)   