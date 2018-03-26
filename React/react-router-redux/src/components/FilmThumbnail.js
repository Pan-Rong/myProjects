import React from 'react';
import { Thumbnail } from 'react-bootstrap';
import PropTypes from 'prop-types';


function FilmThumbnail({films}){

    const { 
        title, 
        images, 
        casts,
        directors,
        rating,
        year} = films
    return(
        <div  className="display-align-justify-center">
            <Thumbnail src = { images.small ? images.small : '/images/replacePicture.jpg'}  style={{width:"150px",height:"220px"}}alt=" 图片无法加载 "/>
            <div className="margin-left10px width-200px">
                <h4>{ title }</h4>
                <p>演员：{ 
                    casts instanceof Array ? (
                        casts.map((cast,j) => <span key={j} className="margin-left10px">{ cast.name}</span>)
                    ) : <span >暂无演员</span>
                    }
                </p>
                <p>导演：{ 
                    directors instanceof Array ? (
                        directors.map((director,j) => <span key={j} className="margin-left10px">{ director.name }</span>)
                    ) : <span >暂无导演</span>
                    }
                </p>    
                <p>豆瓣评分：{ rating ? rating.average ? <span>{ rating.average }{'分'}</span> : <span>0 分 </span> : <span >暂无评分</span> }</p>
                <p>上映年份：<span>{ year }</span></p>
            </div>
        </div>            
    )
}

FilmThumbnail.propTypes = {
    films: PropTypes.shape({
        title: PropTypes.string.isRequired,
        images:  PropTypes.object.isRequired,
        casts: PropTypes.array.isRequired,
        directors: PropTypes.array.isRequired,
        year: PropTypes.string.isRequired    
    }).isRequired
}
export default FilmThumbnail