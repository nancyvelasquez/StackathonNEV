import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grabCurrSong } from '../reducers'

class Corpus extends Component {
  render() {
    return (
      <div id="corpusBlock">
          <h2>Discover Now</h2>
          <h4>Live in the moment</h4>
            <iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZEVXcH9yipLsAeeL" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Corpus)