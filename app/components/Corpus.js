import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grabCurrSong, getCurrTrackMood } from '../reducers'

class Corpus extends Component {
  render() {
    return (
      <div id="corpusBlock">
          <h4>Live in the moment</h4>
           <div className="buttonContainer">
            <button
              className="btn btn-success"
              onClick={this.props.grabCurrentSong}
            >
              Grab my current song
          </button>
          <button
              className="btn btn-success"
              onClick={this.props.getCurrentTrackMood}
            >
              Set the Mood
          </button>
         </div > 
          <div onClick={this.props.getCurrTrackMood}>
            <iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZEVXcH9yipLsAeeL" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    currSong: store.currSong,
    currArtist: store.currArtist,
    corpus: store.corpus
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  grabCurrentSong: (evt) => {
    evt.preventDefault()
    dispatch(grabCurrSong(ownProps.access))
  }, 
  getCurrentTrackMood: (evt) => {
    evt.preventDefault()
    dispatch(getCurrTrackMood(ownProps.access))
  }, 
})

export default connect(mapStateToProps, mapDispatchToProps)(Corpus)