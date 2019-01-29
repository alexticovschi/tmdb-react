import React from 'react';
import './ActorImage.css';
import ImageZoom from 'react-medium-image-zoom';

const ActorImage = ({img_path}) => {
    const base_url = 'https://image.tmdb.org/t/p/w185';    
    const base_url2 = 'https://image.tmdb.org/t/p/original';

    return (
        <div className="actor-card">
            <div 
                className="img-wrapper"
                data-aos="fade-in"
                data-aos-delay="50"
                data-aos-duration="500"
                data-aos-easing="ease-in-out"
                data-aos-anchor-placement="bottom">
                <ImageZoom
                    image={{
                        src: `${base_url + img_path}`,
                        alt: 'actor profile image small',
                        className: 'actor-img-profile',
                        // style: { maxWidth: '5em', padding: '4px' }
                    }}
                    zoomImage={{
                        src: `${base_url2 + img_path}`,
                        alt: 'actor profile image original'
                    }}
                />    
            </div>    
        </div>         
    );
};

export default ActorImage;