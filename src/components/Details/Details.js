import React from 'react';
import axios from 'axios';
import styles from './Details.module.scss';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

class Details extends React.Component {
    constructor(){
        super();
        this.state = {
            similarBeers: [],
            selectedBeer: [],
            isLoaded: false
        }
    }

    onClose = () => this.props.history.push('/');

    getBeer = (id) => {
        axios.get(`https://api.punkapi.com/v2/beers/${id}`
        ).then(response => {
            this.setState({
                    selectedBeer: response.data,
                    isLoaded: true
                })
        });
    };

    getSimilarBeers = async () => {
        const similarBeers = await Promise.all([
            axios.get('https://api.punkapi.com/v2/beers/random'),
            axios.get('https://api.punkapi.com/v2/beers/random'),
            axios.get('https://api.punkapi.com/v2/beers/random')
        ]);
        this.setState({similarBeers: []})
        
        similarBeers.map(similarBeer => {
            let simBeer = similarBeer.data[0]
            this.setState({
                similarBeers: [
                    ...this.state.similarBeers,
                    simBeer
                ]
            });
            console.log(this.state.similarBeers)
        });
    };
    componentWillUpdate(){
        if(this.props.history.location.pathname.split("/")[2] !== this.props.match.params.id){
            this.getBeer(this.props.history.location.pathname.split("/")[2]);
            this.getSimilarBeers();
        }
    }
    
    componentDidMount(){
        this.getBeer(this.props.match.params.id);
        this.getSimilarBeers();
    };

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
        if(this.state.selectedBeer.length === 0 || this.state.similarBeers.length !== 3){
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
                            <div className={styles.imgContainer}>
                                <img src={this.state.selectedBeer[0].image_url}/>
                            </div>
                            <div className={styles.beerDetails}>
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
                                    <ul>
                                        <li>{this.state.selectedBeer[0].food_pairing[0]}</li>
                                        <li>{this.state.selectedBeer[0].food_pairing[1]}</li>
                                        <li>{this.state.selectedBeer[0].food_pairing[2]}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className={styles.similarContainer}>
                            <div className={styles.label}><h3>You might also like:</h3></div>
                                <div className={styles.similarBeers}>
                                    {
                                        this.state.similarBeers.map(function(beer){
                                            return (
                                                <Link key={beer.id} to={'/details/' + beer.id}>
                                                    <div className={styles.simBeer}>
                                                        <h4>{beer.name}</h4>
                                                        <img src={beer.image_url}></img>
                                                    </div>
                                                </Link>
                                            )
                                        })
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        ); 
    };
    
}

export default Details;
