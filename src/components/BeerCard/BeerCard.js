import React from 'react';
import styles from './BeerCard.module.scss'

class BeerCard extends React.Component {
    render() {
        return (
            <div className={styles.beerContainer}>
                <img
                    src={this.props.beer.image_url}
                    alt={this.props.beer.description}
                />
                <div className={styles.beerName}>
                    {this.props.beer.name}
                </div>
                <div className={styles.beerDescription}>
                    {this.props.beer.tagline}
                </div>
            </div>
        )
    }
}
export default BeerCard;