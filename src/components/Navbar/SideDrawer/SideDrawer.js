import React from "react";

import "./SideDrawer.css";

const SideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a href="/">Home</a>
          <hr className="sidedrawer-separator"/>
        </li>
        <li>
          <a href="/movies/now-playing">Movies</a>
          <hr className="sidedrawer-separator"/>
        </li>
        <li>
          <a href="/tv-shows">TV Shows</a>
          <hr className="sidedrawer-separator"/>
        </li>
        <li>
          <a href="/genres/80">Genres</a>
          <hr className="sidedrawer-separator"/>
        </li>
        <li>
          <a href="https://www.themoviedb.org/login?language=en-US">Login</a>
          <hr className="sidedrawer-separator"/>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;