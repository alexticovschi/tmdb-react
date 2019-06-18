import React from 'react';

import './Footer.css';

const Footer = () => {
    return (
        <footer>
                <div className="f-logo">
                    <a href="https://developers.themoviedb.org/3/getting-started/introduction" target="_blank">
                        <img className="footer-logo" src="https://www.themoviedb.org/assets/1/v4/logos/powered-by-square-green-11c0c7f8e03c4f44aa54d5e91d9531aa9860a9161c49f5fa741b730c5b21a1f2.svg" alt="tmdb logo"/>
                    </a>
                </div>
                <div className="social-media">
                    <a href="https://www.freecodecamp.org/alexticovschi" className="fa fa-free-code-camp"></a>
                    <a href="https://codepen.io/AlexTicovschi" className="fa fa-codepen"></a>
                    <a href="https://github.com/alexticovschi/tmdb-react" className="fa fa-github"></a>
                    <a href="https://www.linkedin.com/in/alex-ticovschi-4b3832134/" className="fa fa-linkedin"></a>
                </div>
        </footer>
    );
};

export default Footer;