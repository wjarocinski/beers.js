import React from 'react';
import axios from 'axios';
import styles from './Details.module.scss';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

class Details extends React.Component {
    constructor(){
        super();
        this.state = {
            selectedBeer: [],
            similarBeers: [],
            isLoaded: false
        }
    }

    onClose = () => this.props.history.push('/');

    getBeer = (id) => {
        axios.get(`https://api.punkapi.com/v2/beers/${id}`
        ).then(response => {
            this.setState({
                    selectedBeer: [
                        ...this.state.selectedBeer,
                        ...response.data
                    ],
                    isLoaded: true
                })
                console.log('state after api call', this.state)
        });
    };
    
    componentWillMount(){
        this.getBeer(this.props.match.params.id);
    };

    // shouldComponentUpdate(nextProps){
    //     if(this.props.match.params.id !== nextProps.match.params.id){
    //         return true;
    //     }
    //     return false;
    // };

    componentDidUpdate(nextProps) {
        if(this.props.match.params.id !== nextProps.match.params.id){
            this.getBeer(this.props.match.params.id)
        }
    }

    componentWillUnmount(){
        this.setState({
            selectedBeer: null,
            similarBeers: []
        })
    };



    render(){
        if(this.state.selectedBeer.length === 0){
            return <Spinner />
        }
        return (
            <div className={styles.detailContainer}>
                <div className={styles.modalContainer}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <div className={styles.beerTitle}>
                                <h1>{this.state.selectedBeer[0].name}</h1>
                            </div>
                            <i onClick={this.onClose} className="fas fa-times"></i>
                        </div>
                        <div className={styles.modalBody}>
                            <div className={styles.beerImage}>
                                <img src={this.state.selectedBeer[0].image_url}/>
                            </div>
                            <div className={styles.beerMeta}>
                                <div className={styles.shortInfo}>
                                    <p>IBU: {this.state.selectedBeer[0].ibu}</p>
                                </div>
                                <div className={styles.shortInfo}>
                                    <p>ABV: {this.state.selectedBeer[0].abv} %</p>
                                </div>
                                <div className={styles.shortInfo}>
                                    <p>EBC: {this.state.selectedBeer[0].ebc}</p>
                                </div>
                            </div>
                            <div className={styles.beerDescription}>
                                <p>{this.state.selectedBeer[0].description}</p>
                            </div>
                            <div className={styles.beerSuggestion}>
                                <h3>Best served with:</h3>
                                <p>{this.state.selectedBeer[0].food_pairing[0]}</p>
                                <p>{this.state.selectedBeer[0].food_pairing[1]}</p>
                                <p>{this.state.selectedBeer[0].food_pairing[2]}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    };
    
}

export default Details;
