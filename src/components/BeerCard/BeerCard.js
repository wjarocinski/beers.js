import React from 'react';
import styles from './BeerCard.module.scss';
import { Link } from 'react-router-dom';

const BeerCard = (props) => {
    return (
        <div className={styles.beerContainer}>
            <Link to={'/details/' + props.beer.id}>
                <img
                src={props.beer.image_url}
                alt={props.beer.description}/>
                <div className={styles.beerName}>
                    {props.beer.name}
                </div>
            </Link>
            <div className={styles.beerDescription}>
                {props.beer.tagline}
            </div>
        </div>
    );
}
export default BeerCard;