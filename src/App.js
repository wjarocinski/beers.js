import React from 'react';
import axios from 'axios';
import Header from './components/Header/Header';
import BeersList from './components/BeersList/BeersList';
import Spinner from './components/Spinner/Spinner';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1,
            beers: [],
            isLoaded: false
        };
    }

    isScrolledToBottom = () => {
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight || window.innerHeight;
        return Math.ceil(scrollTop + clientHeight) >= scrollHeight;
    };
    addBeersAndIncrementPage = (response) => {
        this.setState({
            page: this.state.page + 1,
            beers: [
                ...this.state.beers,
                ...response.data
            ],
            isLoaded: true
        })
    };
    getBeers = () => {
            window.removeEventListener('scroll', this.onScroll);
            axios.get(`https://api.punkapi.com/v2/beers?page=${this.state.page}&per_page=20`
            ).then(response => {
                this.addBeersAndIncrementPage(response);
                window.addEventListener('scroll', this.onScroll);
            });
    };

    onScroll = () => {
        if (this.isScrolledToBottom()) {
            this.setState({ isLoaded: false });
            this.getBeers();
        }
    };


    componentDidMount(){
        this.getBeers();
        window.addEventListener('scroll', this.onScroll);
    };

    render() {
        const spinner = !this.state.isLoaded ? <Spinner /> : null;
        return (
            <div className='AppContainer'>
                {spinner}
                <Header />
                <BeersList beers={this.state.beers}/>
            </div>
        );


    }
}
export default App;