import React from 'react';
import { Link } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  return (
    <header className={classes.header}>
      <Link to='quotes' className={classes.logo}>
        명언 제조기
      </Link>
      <nav className={classes.nav}>
        <ul>
          <li>
            <Link to='/quotes' className={classes.active}>
              모든 명언 보기
            </Link>
            <Link to='/new-quote' className={classes.active}>
              명언 제조하기
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
