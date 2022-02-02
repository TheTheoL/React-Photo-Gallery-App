import React, {Component} from 'react';



//this displays the li and img elements on the page.

export default class Photo extends Component {
  render () {
    const { photos, isLoading } = this.props;
      return (
          <div className="photo-container">
          <h2>Results</h2>
          <ul>
            {
              photos.map(photo => (
                <li>
                  <img src={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
                </li>
              )
            )}
          </ul>
        </div>
      );
  }
}