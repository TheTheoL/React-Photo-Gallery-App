import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './App.css';
import apiKey from './config.js';

//Imported components
import SearchBar from './Components/SearchBar';
import Nav from './Components/Nav';

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

componentDidMount() {
  this.performSearch();
}

performSearch = (query = 'sunsets') => {
  axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
  .then(response => {
      this.setState({
        photos: response.data.data,
        loading: false
      });
  })

}


  

render() { 
    
  return (
      <BrowserRouter>
        <div className="container">
          <h1>Photo Gallery Using React.js and Flickr</h1>
        <SearchBar />
        <Nav />

        </div>
        </BrowserRouter>
  );

}

}