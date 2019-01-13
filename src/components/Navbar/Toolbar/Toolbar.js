import React from "react";

import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";

const Toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
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
            <a href="/genres">Genres</a>
          </li>
          <li>
            <a href="/login">Login </a>
          </li>
        </ul>
      </div>
      <div className="toolbar__toggle-button">
        <DrawerToggleButton isOpen={props.isOpen} click={props.drawerClickHandler} />
      </div>
    </nav>
  </header>
);

export default Toolbar;
