import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { NavLink, Router, Route, IndexRedirect, browserHistory } from 'react-router-dom';
import Viewer from './Viewer';

import Planets from './Planets/index';
import LoginSpotify from './LoginSpotify'

const examples = [
  { 
    name: 'Planets',
    component: Planets,
    url: 'Planets/index',
    slug: 'webgl_planets',
  },
];

// const Browser = ({ match }) => {
class Browser extends Component {
  constructor(props) {
    super(props) 
    this.getHashParams = this.getHashParams.bind(this)
  }

  render() {
    // const match = React.PropTypes.object.isRequired
    // const { params } = match;
    // const activeExample = params.slug && examples.find(example => example.slug === params.slug);
      return (
        <div>
          <div id="panel" className="collapsed">
            <h1><a href="https://github.com/toxicFork/react-three-renderer/">react-three-renderer</a> / examples</h1>
            <div id="content">
              <div>
                <h2>webgl</h2>
                  <div>
                  { this.props.isLoggedIntoSpotify ? (
                    <div id="appBlock" className="flexcontainer-horizontal">
                    </div>
                  ) : (
                      <LoginSpotify />
                  ) }
                  </div>
              </div>
            </div>
          </div>
          <Viewer example={examples[0]} />
        </div>
      );
    };

  componentDidMount() {
    const params = this.getHashParams(),
      access_token = params.access_token,
      state = params.state,
      storedSpotifyState = window.localStorage['spotifyAuthKey']
    if (!access_token && (state == null || state !== storedSpotifyState)) {
      console.log('There was an error during Spotify authentication :(')
    } else {
      return this.props.saveToken(access_token)
    }
  }
  getHashParams() {
    let hashParams = {},
      e,
      regQuery = /([^&;=]+)=?([^&;]*)/g,
      query = window.location.hash.substring(1)
    while (e = regQuery.exec(query)) {
      hashParams[e[1]] = decodeURIComponent(e[2])
    }
    return hashParams
  }
}

Browser.propTypes = {
  match: React.PropTypes.object.isRequired,
};

// export default Browser;

/* ----- IMPORT CONTAINER DEPENDENCIES ----- */

import { connect } from 'react-redux'
import { storeToken } from '../reducers'

/* ----- CONTAINER ----- */

const mapStateToProps = (store, ownProps) => {
  return {
    isLoggedIntoSpotify: store.isLoggedIntoSpotify,
    access_token: store.access_token
  }
}

const mapDispatchToProps = (dispatch, getState) => ({
  saveToken: (token) => {
    dispatch(storeToken(token))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Browser)