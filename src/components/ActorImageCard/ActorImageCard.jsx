import React from 'react';
import './ActorImageCard.css';

const ActorImageCard = ({actor}) => {
    const base_url = 'https://image.tmdb.org/t/p/w342';

    return (
        <article className="actor_card">
            <img className="img-profile" src={actor.profile_path === null ? 'https://www.matajikesarwala.com/wp-content/uploads/2018/05/man-dummy.jpg' :base_url + actor.profile_path} alt={"img card"} />
            <div className="actor_name">{actor.name}</div>
        </article>
    );
};

export default ActorImageCard;