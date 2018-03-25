import React from 'react';
import { Grid,Row,Col} from 'react-bootstrap';
import FilmThumbnail from '../components/FilmThumbnail';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


function History( props ){
    const { openOrCollectFilms } = props
    const length = openOrCollectFilms.openFilms.length
    return (
        <Grid>
            <Row>
            { length ? (
                openOrCollectFilms.openFilms.map((films, i) =>(
                    films.id ? (<Col key={i} xs={6} md={4}>
                    <p>{films.date}</p>
                    <FilmThumbnail films = { films }/>
                </Col>) : ''
                  ))
            ): (
                <div className="hot-keywords">
                    <h4>目前还没有浏览记录，赶紧去逛逛吧~</h4>
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
History.propTypes = {
    openOrCollectFilms: PropTypes.shape({
        collectFilms: PropTypes.array.isRequired
    }).isRequired
}
export default connect(mapStateToProps)(History);