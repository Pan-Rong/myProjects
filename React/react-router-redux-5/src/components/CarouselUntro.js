import React from 'react';
import {  Carousel  } from 'react-bootstrap';
import { bannerList } from '../routes';

    function CarouselUntro( ){

        return (
            <div>
                <Carousel interval= { 2000 } className="margin-top-40px" >
                    {
                        bannerList.map(( data,i )=>{
                            if( i < 4 ){
                                return (
                                <Carousel.Item key={i}>
                                    <img  className="bannerList-class" style={{height:'200px'}} alt="图片无法加载" src={ data.imgUrl }/>
                                </Carousel.Item>
                                )
                            }
                            return ''
                        })
                    }
                </Carousel>
            </div>
        )
    }
    

export default CarouselUntro;   
