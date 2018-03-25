import React from 'react';
import { Grid, Row, Col,Thumbnail,Label,Modal} from 'react-bootstrap';
import FilmIntro from '../containers/FilmIntro';
import PropTypes from 'prop-types';    

class FilmsList extends React.Component{
    static propTypes = {
        datas: PropTypes.array.isRequired
    }
    state = {
        showModal: false,
        images: '',
        title: '',
        director:'',
        casts: '',
        rating: '',
        id: '',
        year: '',
        date: ''
    }
    close(){
        this.setState({showModal: false})
    }
    open(data){
        let tempTime = new Date();
        this.setState({
            showModal: true,
            images: data.images,
            title: data.title,
            directors:data.directors,
            casts: data.casts,
            rating: data.rating.average,
            id:  data.id,
            year: data.year,
            date: tempTime.toLocaleString() 
        });
    }
    
    render(){
        const { datas } = this.props
        return (
            <div>
            <Grid>
                <Row className="margin-bottom65px">
                { 
                    datas.map((data, i) =>
                        <Col key={i} xs={4} md={3}>
                            <Thumbnail src={data.images.small ? data.images.small : '/images/replacePicture.jpg'} style={{height:"430px",width:"240px"}} alt="图片无法加载">
                                <div className="margin-left10px">
                                <h4  className="cursor-pointer" onClick={()=>this.open( data ) }>{data.title}</h4>
                                {
                                    data.genres.map(function(genre ,j){
                                        return <Label className="margin-left3px" key={j}>{genre}</Label>
                                    })
                                }
                                </div>
                            </Thumbnail>
                        </Col>)
                    }
                </Row>
            </Grid>
            <Modal show={ this.state.showModal } onHide={()=>this.close()}>
                <FilmIntro films ={ this.state } />
            </Modal>       
            </div>
        )
    }
}

export default FilmsList;