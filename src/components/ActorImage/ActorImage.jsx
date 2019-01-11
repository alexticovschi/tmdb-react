import React from 'react';
import './ActorImage.css';
import ImageZoom from 'react-medium-image-zoom';

const ActorImage = ({img_path}) => {
    const base_url = 'https://image.tmdb.org/t/p/w185';    
    const base_url2 = 'https://image.tmdb.org/t/p/original';

    return (
        <div className="actor-img-card">
            <ImageZoom
                image={{
                    src: `${base_url + img_path}`,
                    alt: 'actor profile image small',
                    className: 'actor-imgs',
                    style: { maxWidth: '12em', padding: '4px' }
                }}
                zoomImage={{
                    src: `${base_url2 + img_path}`,
                    alt: 'actor profile image original'
                }}
            />        
        </div>         
    );
};

export default ActorImage;