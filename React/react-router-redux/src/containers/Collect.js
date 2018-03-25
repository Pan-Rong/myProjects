import React from 'react';
import { Grid,Row,Col} from 'react-bootstrap';
import FilmThumbnail from '../components/FilmThumbnail';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


function Collect(props){
    const { openOrCollectFilms } = props
    const length = openOrCollectFilms.collectFilms.length
    return (
        <Grid>
            <Row>
            { length ? (
                openOrCollectFilms.collectFilms.map((films, i) =>(
                <Col key={i} xs={6} md={4}>
                    <FilmThumbnail films = { films }/>
                </Col>  ))
            ) : (
                <div className="hot-keywords">
                    <h4>目前还没有收藏，记得喜欢要收藏哦~</h4>
                </div>
            )
            }
            </Row>
        </Grid>
    )
} 
const mapStateToProps = state => {
    const {  openOrCollectFilms } = state;
    return {
        openOrCollectFilms
    }
}
Collect.propTypes = {
    openOrCollectFilms: PropTypes.shape({
        collectFilms: PropTypes.array.isRequired
     }).isRequired
  }
export default connect(mapStateToProps)(Collect);
