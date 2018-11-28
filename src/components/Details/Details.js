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
    
    componentDidMount(){
        this.getBeer(this.props.match.params.id);
    };

    shouldComponentUpdate(nextProps){
        if(this.props.match.params.id !== nextProps.match.params.id){
            return true;
        }
        return false;
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
        console.log(this.state.selectedBeer.length)
        if(this.state.selectedBeer.length === 0){
            return <Spinner />
        }
        return (
            <div className={styles.DetailContainer}>
                <div>hello</div>
            </div>
        ); 
    };
    
}

export default Details;
