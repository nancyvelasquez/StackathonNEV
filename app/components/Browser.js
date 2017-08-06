import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { NavLink, Router, Route, IndexRedirect, browserHistory } from 'react-router-dom';
import Viewer from './Viewer';

import LoginSpotify from './LoginSpotify'
import Corpus from './Corpus'
import Planets from './Planets/index';
import Ball from './Ball/index'

const examples = [
  { 
    name: 'Planets',
    component: Planets,
    url: 'Planets/index',
    slug: 'webgl_planets',
  }, { 
    name: 'Ball',
    component: Ball,
    url: 'Ball/index',
    slug: 'webgl_ball',
  },
];

// const Browser = ({ match }) => {
class Browser extends Component {
  constructor(props) {
    super(props) 
    this.getHashParams = this.getHashParams.bind(this)
  }

  render() {
    const { params } = this.props.match;
    const activeExample = params.slug && examples.find(example => example.slug === params.slug);
    console.log('This is the active example', activeExample)
      return (
        <div>
          <div id="panel" className="collapsed">
            <h1>Discover Now</h1>
            <div>
              {examples.map((example, index) => {
              if (example.separator) {
                return (<h2 key={index}>{example.name}</h2>);
              }
              return (<NavLink
                to={`/${example.slug}`}
                key={index}
                className="link"
                activeClassName="selected"
              >
                {example.name}
              </NavLink>);
            })}
            </div>
            <div>
                  { this.props.isLoggedIntoSpotify ? (
                    <div id="appBlock" className="flexcontainer-horizontal">
                      <div className="col-md-4">
                        <Corpus access={this.props.access_token} />
                      </div>
                    </div>
                  ) : (
                      <LoginSpotify />
                  ) }
            </div>
          </div>
          <Viewer example={activeExample} />
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