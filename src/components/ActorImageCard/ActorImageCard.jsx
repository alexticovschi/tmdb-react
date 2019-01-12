import React from 'react';
import './ActorImageCard.css';
import { Link } from 'react-router-dom';

const ActorImageCard = ({actor}) => {
    const base_url = 'https://image.tmdb.org/t/p/w342';

    return (
        <Link 
            to={`/cast/actor-profile-info/${actor.id}`} 
            className="actor-card"
            data-aos="fade-in"
            data-aos-delay="50"
            data-aos-duration="500"
            data-aos-easing="ease-in-out"
            data-aos-anchor-placement="bottom"
        >
            <div className="img-wrapper">
                <img 
                    className="actor-img" 
                    src={actor.profile_path === null ? 
                    '/images/person_placeholder.jpeg' 
                : base_url + actor.profile_path} alt={"img card"} />
                </div>
            <div className="actor_name">{actor.name}</div>

            {/* <div className="actor_character">{actor.character}</div> */}
        </Link>   
    );
};

export default ActorImageCard;