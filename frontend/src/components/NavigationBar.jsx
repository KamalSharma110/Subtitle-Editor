import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
  return (
    <header className={classes.header}>
      <nav>
        <span>Subtitle Editor</span>
      </nav>
    </header>
  );
};

export default NavigationBar;
