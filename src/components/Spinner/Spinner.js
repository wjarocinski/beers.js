import React from 'react';
import styles from './Spinner.module.scss';
import spinner from '../../spinner.svg';

const Spinner = props => (
    <div className={styles.Spinner_Container}>
        <div className={styles.Loading}>
            <img className={styles.Animation} src={spinner} alt="logo" />
        </div>
    </div>
);

export default Spinner;