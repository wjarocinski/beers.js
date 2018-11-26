import React from 'react';
import styles from './Header.module.scss';

const Header = props => (
    <header className={styles.header}>
        <h1>Beers.js</h1>
    </header>
);

export default Header;