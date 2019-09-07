import React from "react";
import { Link } from "react-router-dom";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";
import "./Toolbar.scss";

const Toolbar = props => (
  <header className="toolbar">
    <div className="toolbar-wrapper">
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/movies/now-playing">Movies</Link>
            </li>
            <li>
              <Link to="/tv-shows">TV Shows</Link>
            </li>
            <li>
              <Link to="/genres/80">Genres</Link>
            </li>
            <li>
              <a href="https://www.themoviedb.org/login?language=en-US">Login</a>
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
