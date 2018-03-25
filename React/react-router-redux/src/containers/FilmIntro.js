import React from 'react';
import { Panel,Modal, Button,Glyphicon,Well} from 'react-bootstrap';
import FilmThumbnail from '../components/FilmThumbnail'
import { connect } from 'react-redux';
import { searchFilmDetail,
         fetchFilmsDetailIfNeeded,
         addToCollect,
         browsingHistory } from '../actions';
import PropTypes from 'prop-types';      
         

class FilmIntro extends React.Component{
    static propTypes = {
        selectedFilmsDetailSubreddit: PropTypes.string.isRequired,
        openOrCollectFilms: PropTypes.shape({
            collectFilms: PropTypes.array.isRequired
        }).isRequired,
        films: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired
    }
    state = {
        selected: ''
    }
    componentDidMount(){
        const { dispatch ,selectedFilmsDetailSubreddit,films,openOrCollectFilms} = this.props;
        dispatch(searchFilmDetail(films.id))
        dispatch(fetchFilmsDetailIfNeeded(selectedFilmsDetailSubreddit)) 
        dispatch(browsingHistory(films))
        const that = this
        if(openOrCollectFilms.collectFilms.length){
            openOrCollectFilms.collectFilms.filter(function(item){
                if(item.id === films.id){
                    that.setState({selected:"orange"})
                }
                return ''
            })
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps){
            const { dispatch, selectedFilmsDetailSubreddit } = nextProps
            console.log("next----"+ selectedFilmsDetailSubreddit)
            dispatch(fetchFilmsDetailIfNeeded(selectedFilmsDetailSubreddit))
        }
    }
    pushCollectFls ( ){
        const { dispatch ,openOrCollectFilms,filmDetail} = this.props;
        if(openOrCollectFilms.collectFilms.length){
            let temp = openOrCollectFilms.collectFilms.filter((item)=>(item.id === filmDetail.id))
            if(!temp.length){
                dispatch(addToCollect(filmDetail));
            }
        }else{
            dispatch(addToCollect(filmDetail));   
        }
       this.setState({selected:"orange"})
    }
    render(){
        const { filmDetail } = this.props
        const selected = this.state.selected
        const isEmpty = filmDetail.title || ''
        return(
               <div>
                    <Modal.Header closeButton>
                        <Modal.Title>{ filmDetail.title }</Modal.Title>
                    </Modal.Header>  
                   {
                    !isEmpty ? ( <h2 className="display-justify-center"> Loading... </h2>)
                    :( 
                    <Modal.Body>
                        <Well  className="well-class">
                            <FilmThumbnail films={ filmDetail } />
                            <Button className="margin-left23"  
                                    style={{ background : selected }} 
                                    onClick={()=>this.pushCollectFls()} >
                                    <Glyphicon glyph="star" /> 收藏</Button>
                        </Well>
                        <div className="display-space-around">
                            <div>
                                <p>{ filmDetail.comments_count }</p>
                                <p>评论人数</p>
                            </div>
                            <div>
                                <p>{ filmDetail.wish_count }</p>
                                <p>想看人数</p>
                            </div>
                            <div>
                                <p>{ filmDetail.ratings_count }</p>
                                <p>评分人数</p>
                            </div>
                        </div>
                            <Panel>
                                <div className="margin-left10px">
                                    <h2>剧情介绍</h2>
                                    <p>{ filmDetail.summary ? filmDetail.summary : " 暂无介绍 "  }</p>
                                </div>
                            </Panel>
                    </Modal.Body>
                    )
                   }
                    
               </div>     
        )
    }  
}

const mapStateToProps = state => {
    const { selectedFilmsDetailSubreddit, openOrCollectFilms,postsBySubreddit} = state;
    const { items: filmDetail } = postsBySubreddit[selectedFilmsDetailSubreddit] ||{ items:[] }
    return {
        selectedFilmsDetailSubreddit,
        filmDetail,
        openOrCollectFilms,
    }
}


export default connect(mapStateToProps)(FilmIntro);