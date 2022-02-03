import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import apiKey from './config.js';

//Imported components
import SearchBar from './Components/SearchBar';
import Nav from './Components/Nav';
import Photo from './Components/Photo';
import NotFound from './Components/NotFound';

export default class App extends Component {

//set the initial state with an empty query
constructor() {
  super();
  this.state = {
    photos: [],
    cats: [],
    dogs: [],
    birds: [],
    loading: true,
    query: ''
  };
} 

updateQuery = (query) => {
  this.setState({
    query 
  })
}

//this inserts into the DOM tree the needed search components
componentDidMount() {
  this.performSearch();
  this.performSearch('cats');
  this.performSearch('dogs');
  this.performSearch('birds');
}

//this performs the search as well as makes the nav links work.

performSearch = (query ) => {
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
    } if (query === 'cats') {
      this.setState({ cats: response.data.photos.photo })
    } if (query === 'dogs') {
      this.setState({ dogs: response.data.photos.photo })
    } if (query === 'birds') {
      this.setState({ birds: response.data.photos.photo })
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
            <Route path="/cats" render={() => <Photo photos={this.state.cats} isLoading={this.state.isLoading} />} />
            
            <Route path="/dogs" render={() => <Photo photos={this.state.dogs} isLoading={this.state.isLoading} />} />
            
            <Route path="/birds" render={() => <Photo photos={this.state.birds} isLoading={this.state.isLoading} />} />
            
            <Route path="/" render={() => <Photo query="cats" performSearch={this.performSearch} photos={this.state.photos} isLoading={this.state.isLoading} /> } />
            
            <Route component={NotFound}/>
        </Switch>
        

        </div>
        </BrowserRouter>
  );

}

}