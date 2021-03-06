import React from "react";

import "./SideDrawer.scss";

const SideDrawer = props => {
  let drawerClasses = "side-drawer";
  if (props.show) {
    drawerClasses = "side-drawer open";
  }

  return (
    <nav className={drawerClasses}>
      <ul>
        <li>
          <a className="btn ripple" href="/">Home</a>
        </li>
        <li>
          <a className="btn ripple" href="/movies/now-playing">Movies</a>
        </li>
        <li>
          <a className="btn ripple" href="/tv-shows">TV Shows</a>
        </li>
        <li>
          <a className="btn ripple" href="/genres/80">Genres</a>
        </li>
        <li>
          <a className="btn ripple" href="https://www.themoviedb.org/login?language=en-US">Login</a>
        </li>
      </ul>
    </nav>
  );
};

export default SideDrawer;