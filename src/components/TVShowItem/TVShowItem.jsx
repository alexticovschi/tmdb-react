import React from 'react';
import { Link } from 'react-router-dom';

const TVShowItem = ({poster, id}) => {
    const _id = id.toString();

    return (
        <Link to={`/tv-show-info/${id}`} onClick={() => this.props.history.push(`/tv-show-info/${_id}`)} className="card">
            <img src={poster} alt="film poster"/>
        </Link>
    );
};

export default TVShowItem;