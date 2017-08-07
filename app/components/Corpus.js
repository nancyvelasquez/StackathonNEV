import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grabCurrSong, getPop } from '../reducers'

class Corpus extends Component {
  render() {
    return (
      <div id="corpusBlock">
          <h4>Live in the moment</h4>
           {/* <div className="buttonContainer">
             <button
              className="btn btn-success"
              onClick={this.props.grabCurrentSong}
            >
              Grab my current song
          </button>  */}
          {/* <button
              className="btn btn-success"
              onClick={this.props.getCurrPop}
            >
              Who Is Here
          </button> */}
          <div>
            <iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZEVXcH9yipLsAeeL" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
          </div>
      </div>
    )
  }
}

const mapStateToProps = (store) => {
  return {
    currPop: store.today,
    tomorrowPop: store.tomorrow
  }
}
const mapDispatchToProps = (dispatch, ownProps) => ({
  grabCurrentSong: (evt) => {
    evt.preventDefault()
    dispatch(grabCurrSong(ownProps.access))
  }, 
  getCurrPop: (evt) => {
    evt.preventDefault()
    dispatch(getPop())
  }, 
})

export default connect(mapStateToProps, mapDispatchToProps)(Corpus)