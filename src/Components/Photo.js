import React, {Component} from 'react';


export default class Photo extends Component {
    render () {
        return (
            <div className="photo-container">
            <h2>Results</h2>
            <ul>
              <li>
                <img src={}/>
              </li>
              
              <li className="not-found">
                <h3>No Results Found</h3>
                <p>You search did not return any results. Please try again.</p>
              </li>
            </ul>
          </div>
        );
    }
}