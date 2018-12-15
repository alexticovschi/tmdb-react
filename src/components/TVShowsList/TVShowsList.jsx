import React from 'react';
import TVShowItem from '../TVShowItem/TVShowItem';


const TVShowsList = ({ tvShowList, getTVShowById }) => {
    const base_url = 'https://image.tmdb.org/t/p/w342';
    const not_available_poster = "https://dummyimage.com/243x350/7b8a91/ffffff&text=Poster+Not+Available";
    const tv_shows_list = tvShowList && tvShowList.map((tvShow,idx) => (
        <TVShowItem
            key={idx}
            getTVShowById={getTVShowById}
            id={tvShow.id}
            poster={ tvShow.poster_path === null ? not_available_poster : base_url + tvShow.poster_path }
        />
    ));
    return (
        <div className="container">
            <main className="main-content">
                {tv_shows_list}
            </main>
        </div>
    );
}

export default TVShowsList;