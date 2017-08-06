import React, { Component } from 'react'

// const spotifyClientId = process.env.SPOTIFY_CLIENT_ID.replace(/"/g, '') || require('../../secrets.js').spotifyClientId
const spotifyClientId = require('../../secrets.js').spotifyClientId

// const spotifyRedirectURI = require('../../secrets.js').spotifyRedirectURI
const spotifyRedirectURI = require('../../secrets.js').spotifyRedirectURI

export default class LoginSpotify extends Component {
  constructor() {
    super()
    this.generateRandomString = this.generateRandomString.bind(this)
    this.handleSpotifyLogin = this.handleSpotifyLogin.bind(this)
  }
  render() {
    return (
      <div id="loginBlock" className="flexcontainer-vertical">
        <h3 id="start">START</h3>
        <div className="login-button-container flexcontainer-vertical">
          <button
            id="login-button"
            className="btn btn-success"
            onClick={this.handleSpotifyLogin}
          >
            Log in with Spotify
        </button>
        </div>
      </div>
    )
  }
  generateRandomString(length) {
    let text = '',
      possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
  }
  handleSpotifyLogin(evt) {
    evt.preventDefault()
    window.localStorage['spotifyAuthKey'] = this.generateRandomString(16)
    // const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(spotifyClientId)}&redirect_uri=${encodeURIComponent(spotifyRedirectURI)}&state=${encodeURIComponent(localStorage['spotifyAuthKey'])}`
    const url = `https://accounts.spotify.com/authorize?response_type=token&client_id=${encodeURIComponent(spotifyClientId)}&scope=${encodeURIComponent('user-read-currently-playing')}&redirect_uri=${encodeURIComponent(spotifyRedirectURI)}&state=${encodeURIComponent(localStorage['spotifyAuthKey'])}`
    window.location = url
    console.log(url)
  }
}