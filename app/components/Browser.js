import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { NavLink, Router, Route, IndexRedirect, browserHistory } from 'react-router-dom';
import Viewer from './Viewer';
import { SideNav, SideNavItem, Button } from 'react-materialize';

// import LoginSpotify from './LoginSpotify'
import Corpus from './Corpus'
import Planets from './Planets/index';
import Ball from './Ball/index'
import BouncingBalls from './BouncingBalls/index'

const examples = [
  { 
    name: 'Planets',
    component: Planets,
    url: 'Planets/index',
    slug: 'webgl_planets',
  }, { 
    name: 'Earth',
    component: Ball,
    url: 'Ball/index',
    slug: 'webgl_earth',
  }, {
    name: 'Random',
    component: BouncingBalls,
    url: 'BouncingBalls/index',
    slug: 'webgl_random'
  }
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
    return (
      <div>
        <SideNav
          id="sidebar"
          trigger={<Button>LINKS</Button>}
          options={{ closeOnClick: true }}
        >
          <SideNavItem subheader>Pages</SideNavItem>
          <SideNavItem id="page" waves href='#webgl_planets'>Planets</SideNavItem>
          <SideNavItem id="page" waves href='webgl_earth'>Earth</SideNavItem>
          <SideNavItem id="page" waves href='webgl_random'>Random</SideNavItem>
          <br></br>
          {/* <SideNavItem>
            { this.props.isLoggedIntoSpotify ? (
              <Corpus access={this.props.access_token} />
            ) : (
              // <LoginSpotify />
            ) }
          </SideNavItem> */}
        </SideNav>
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