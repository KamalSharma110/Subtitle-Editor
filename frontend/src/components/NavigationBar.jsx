import { NavLink } from "react-router-dom";

import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <header className={classes.header}>
      <nav>
        <span>Subtitle Editor</span>
        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? classes.active : "")}
            >
              History
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default NavigationBar;
