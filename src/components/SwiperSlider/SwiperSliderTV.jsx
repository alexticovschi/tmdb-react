import React, { Component } from "react";
import Swiper from "react-id-swiper";
import { Link } from "react-router-dom";
import "./SwiperSlider.css";

class SwiperSlider extends Component {
  render() {
    const params = {
      speed: 500,
      parallax: true,
      parallaxEl: {
        el: ".parallax-bg",
        value: "-23%"
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        hide: true
      },
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      loop: true,
      grabCursor: true,
      spaceBetween: 30,
      slidesPerView: 5,
      slidesPerGroup: 5,
      breakpoints: {
        480: {
          slidesPerView: 3,
          spaceBetween: 20
        },
        360: {
          slidesPerView: 3,
          spaceBetween: 20
        }
      }
    };

    const base_url = "https://image.tmdb.org/t/p/w342";

    return (
      <div className="slider-container">
        <Swiper {...params}>
          {this.props.items.map(item => (
            <Link
              key={item.id}
              to={`/movie-info/${item.id}`}
              onClick={() => this.props.history.push(`/movie-info/${item.id}`)}
            >
              <img
                className="swiper-img card"
                alt="poster"
                src={base_url + item.poster_path}
              />
            </Link>
          ))}
        </Swiper>
      </div>
    );
  }
}

export default SwiperSlider;
