import React from 'react';
import styles from './BeersList.module.scss';
import BeerCard from "../BeerCard/BeerCard";

const BeersList = (props) => {
    const beers = props.beers.map((beer) => {
        return <BeerCard key={beer.id} beer={beer}/>
    });
    
    return <div className={styles.beerList}>{beers}</div>
};

export default BeersList;