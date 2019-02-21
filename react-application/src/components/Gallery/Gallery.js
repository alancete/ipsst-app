import React from 'react';
import Slider from 'react-slick';
/*
import Banner1 from '../../images/banners/banner1.jpg';
import Banner2 from '../../images/banners/banner2.jpg';
import Banner3 from '../../images/banners/banner3.jpg';
*/
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false,
  fade: true,
  autoplay: true,
  autoplaySpeed: 10000,
  draggable: true,
};

const Gallery = () => (
  <Slider {...settings} className="gallery">
    <div className="banner banner1">
      <a href="http://www.google.com/"><span /></a>
    </div>
    <div className="banner banner2">
      <a href="http://www.microsoft.com/"><span /></a>
    </div>
    <div className="banner banner3">
      <a href="http://www.sodastereo.com/"><span /></a>
    </div>
  </Slider>
);

export default Gallery;
