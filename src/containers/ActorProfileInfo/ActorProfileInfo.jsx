import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';

import './ActorProfileInfo.css';

class ActorProfileInfo extends Component {
    state = {
        actorProfileInfo: []
    }

    componentDidMount() {
        const { actor_id } = this.props.match.params;
        this.getActorProfileInfo(actor_id);
    }

    getActorProfileInfo = async (ID) => {
        const APIKEY = '9baa3cbfd9b62ea4f97966abadf41653';
        const resp = await fetch(`https://api.themoviedb.org/3/person/${ID}?api_key=${APIKEY}&language=en-US`);

        const actorProfileInfo = await resp.json();
        this.setState({ actorProfileInfo });
        console.log('[ACTOR PROFILE]', actorProfileInfo);
    }

    render() {
        const base_url = 'https://image.tmdb.org/t/p/w500';
        const actor = this.state.actorProfileInfo;
        return (   
            <div>        
                <div className="container">

                    <div className="row">
                        <div className="side">
                            <img 
                                className="actor_profile_img"
                                src={actor.profile_path === null ? 
                                    'https://www.matajikesarwala.com/wp-content/uploads/2018/05/man-dummy.jpg' 
                                : base_url + actor.profile_path} alt={"img card"} />
                        </div>
                        <div className="main">
                            <div className="inner_main">
                                <h1>{actor.name}</h1>
                                <h2 className="bio_title">Biography</h2>
                                <div className="bio_content">
                                    <p>{actor.biography}</p>
                                </div>
                            </div>
                            <button 
                                className="bio_btn" 
                                onClick={() => this.props.history.goBack()}>Back To Movie Info</button>

                        </div>
                    </div>

                </div>

                <Loader/>
            </div> 
        )
    }

}

export default ActorProfileInfo;