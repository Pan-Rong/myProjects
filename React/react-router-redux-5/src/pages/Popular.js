import React from 'react';
import { PageHeader,} from 'react-bootstrap';
import FilmsList from '../components/FilmsList'
import { selectSubreddit, fetchPostsIfNeeded } from '../actions';
import CarouselUntro from '../components/CarouselUntro';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

   class Popular extends React.Component{
    static propTypes = {
        selectedSubreddit: PropTypes.string.isRequired,
        films: PropTypes.array.isRequired,
        isFetching: PropTypes.bool.isRequired,
        dispatch: PropTypes.func.isRequired,
        routes: PropTypes.array.isRequired
      }
      componentDidMount(){
        const { dispatch, selectedSubreddit } = this.props
        dispatch(selectSubreddit("in_theaters"))
        dispatch(fetchPostsIfNeeded(selectedSubreddit)) 
      }
      componentWillReceiveProps(nextProps) {
        if (nextProps.selectedSubreddit !== this.props.selectedSubreddit) {
          const { dispatch, selectedSubreddit } = nextProps
          dispatch(fetchPostsIfNeeded(selectedSubreddit))
        }
      }
    
      render(){
          const { routes , films ,isFetching} = this.props
          const isEmpty = films.length === 0
        return (
            <div>
                <PageHeader  className="page-header-top">正在热映...</PageHeader>
                {
                    isEmpty ? (isFetching ? <h2 className="display-justify-center"> Loading... </h2> : <h2>Empty.</h2>)
                    :  
                    (
                    <div>
                        <CarouselUntro datas={ films }/>
                        <FilmsList routes={ routes } datas={ films }/>
                    </div>
                    )
                }
            </div>
        )
      } 
   }
    const mapStateToProps = state => {
        const { selectedSubreddit,postsBySubreddit} = state;
        const {items: films, isFetching} = postsBySubreddit[selectedSubreddit] ||{ items:[], isFetching:true }
        return {
            selectedSubreddit,
            films, 
            isFetching
        }
    }

    export default connect(mapStateToProps)(Popular);   