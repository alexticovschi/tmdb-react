import React from 'react';
import './ActorImage.css';

const ActorImage = ({img_path}) => {
    const base_url = 'https://image.tmdb.org/t/p/w342';

    return (
        <div className="actor_img_card">

            <img 
                className="actor_img" 
                src={img_path === null ? 
                'https://www.matajikesarwala.com/wp-content/uploads/2018/05/man-dummy.jpg' 
            : base_url + img_path} alt={"img card"} />

        </div>         
    );
};

export default ActorImage;