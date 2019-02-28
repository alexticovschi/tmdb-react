import React from "react";

import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";

const Toolbar = props => (
  <header className="toolbar">
    <div className="toolbar-wrapper">
      <nav className="toolbar__navigation"
        data-aos="fade-in"
        data-aos-delay="0"
        data-aos-duration="200"
        data-aos-easing="ease-in-out"
        data-aos-anchor-placement="bottom"
      >
        <div className="toolbar__logo">
          <a href="/">
            <img src="https://www.themoviedb.org/assets/1/v4/logos/powered-by-rectangle-green-dcada16968ed648d5eb3b36bbcfdd8cdf804f723dcca775c8f2bf4cea025aad6.svg" alt=""/>
          </a>
        </div>
        <div className="spacer" />
        <div className="toolbar_navigation-items">
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/movies/now-playing">Movies</a>
            </li>
            <li>
              <a href="/tv-shows">TV Shows</a>
            </li>
            <li>
              <a href="/genres/80">Genres</a>
            </li>
            <li>
              <a href="https://www.themoviedb.org/login?language=en-US">Login </a>
            </li>
          </ul>
        </div>
        <div className="toolbar__toggle-button">
          <DrawerToggleButton isOpen={props.isOpen} click={props.drawerClickHandler} />
        </div>
      </nav>
    </div>
  </header>
);

export default Toolbar;
