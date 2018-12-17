import React, { Component } from "react";
import Slider from "react-slick";
import './SlickSlider.css';

import { Link } from 'react-router-dom';


export default class SlickSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 4500,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 1,
      adaptiveHeight: true,
      responsive: [
        {
          breakpoint: 1380,
          settings: {
            arrows: false
          }
        },
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            arrows: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            arrows: false
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false
          }
        }
      ]
    };

    const base_url = 'https://image.tmdb.org/t/p/w342';

    return (
      <div className="slider_container">
        <Slider {...settings}>
            {this.props.items.map(item => (
                 <Link key={item.id} to={`/tv-show-info/${item.id}`} onClick={() => this.props.history.push(`/tv-show-info/${item.id}`)}>
                    <img className="slider_slick_img" alt="poster" src={base_url + item.poster_path} />
                </Link>
            ))}
        </Slider>
      </div>
    );
  }
}