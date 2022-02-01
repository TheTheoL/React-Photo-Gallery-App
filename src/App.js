import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import apiKey from './config.js';

//Imported components
import SearchBar from './Components/SearchBar';
import Nav from './Components/Nav';
import Photo from './Components/Photo';

export default class App extends Component {

//set the initial state with an empty query
constructor() {
  super();
  this.state = {
    photos: [],
    loading: true,
    query: ''
  };
} 

updateQuery = (query) => {
  this.setState({
    query 
  })
}


componentDidMount() {
  this.performSearch();
}

performSearch = (query) => {
  this.setState({
    isLoading: true,
    query
  })
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
    if (response) {
      this.setState({
        photos: response.data.photos.photo,
        isLoading: false
      })
    }
})
  .catch(error => {
    console.log('Error fetching and parsing data', error);
  });

}


  

render() { 
    
  return (
      <BrowserRouter>
        <div className="container">
          <h1>Photo Gallery Using React.js and Flickr</h1>
        <SearchBar onSearch={this.performSearch}/>
        <Nav />
        <Switch>
            <Route path="/cats" render={() => <Photo query="cats" performSearch={this.performSearch} photos={this.state.photos} isLoading={this.state.isLoading} /> } />
            <Route path="/dogs" render={() => <Photo query="dogs" performSearch={this.performSearch} photos={this.state.photos} isLoading={this.state.isLoading} /> } />
            <Route path="/birds" render={() => <Photo query="birds" performSearch={this.performSearch} photos={this.state.photos} isLoading={this.state.isLoading} /> } />
            <Route path="/" render={() => <Photo query="cats" performSearch={this.performSearch} photos={this.state.photos} isLoading={this.state.isLoading} /> } />
        </Switch>
        

        </div>
        </BrowserRouter>
  );

}

}