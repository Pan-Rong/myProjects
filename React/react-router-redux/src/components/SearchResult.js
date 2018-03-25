import React from 'react';
import {Grid, Row, Col } from 'react-bootstrap';
import FilmThumbnail from './FilmThumbnail';
import PropTypes from 'prop-types';


const SearchResult = ({ datas }) => {
    return( 
        <Grid>
            <Row >
            {  
                datas.map((data, i) =>
                <Col key={i} xs={6} md={6} className="searchResult-Class">
                    <FilmThumbnail  films={ data } />
                </Col>
                )
            }
            </Row>
        </Grid>
    )
}

SearchResult.propTypes = {
    datas: PropTypes.array.isRequired
  }
export default SearchResult