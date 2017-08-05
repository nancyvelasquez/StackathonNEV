// import { combineReducers } from 'redux'

// const rootReducer = combineReducers({
//   auth: require('./auth').default,
// })

// export default rootReducer

import axios from 'axios'

const googleKey = process.env.GOOGLE_KEY.replace(/"/g, '') || require('../../secrets.js').googleKey

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT = 'SET_CURRENT'
const SET_TOKEN = 'SET_TOKEN'
const SET_CORPUS = 'SET_CORPUS'
const SET_CHART_DATA = 'SET_CHART_DATA'


/* ------------   ACTION CREATORS     ------------------ */

const setCurr = (artist, song) => {
  song = song.indexOf(' - ') > -1 ?
    song.slice(0, song.indexOf(' - ')) :
    song
  return {
    type: SET_CURRENT,
    artist,
    song
  }
}

const setToken = token => ({ type: SET_TOKEN, token })

const setCorpus = corpus => {
  corpus = corpus.replace(/\n\n/g, '\n')
    .replace(/\n/g, '.\n')
  return {
    type: SET_CORPUS,
    corpus
  }
}

// const parseSentences = arr => {
//   return arr.map(obj => {
//     return {
//       x: obj.text.beginOffset,
//       y: obj.sentiment.score,
//       sentence: obj.text.content || 'No text'
//     }
//   })
// }

// const setChartData = serverResponse => {
//   return {
//     type: SET_CHART_DATA,
//     data: {
//       documentSentiment: serverResponse.documentSentiment,
//       sentences: parseSentences(serverResponse.sentences)
//     }
//   }
// }

/* ------------       REDUCER     ------------------ */

export default (state = {
  data: {},
  isLoading: false,
  isLoggedIntoSpotify: false,
  currSong: '',
  currArtist: '',
  corpus: '',
  access_token: ''
}, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case SET_CURRENT:
      newState.currSong = action.song
      newState.currArtist = action.artist
      break

    case SET_TOKEN:
      newState.isLoggedIntoSpotify = true
      newState.access_token = action.token
      break

    // case SET_CORPUS:
    //   newState.corpus = action.corpus
    //   break

    // case SET_CHART_DATA:
    //   newState.data = action.data
    //   break

    default:
      return state
  }
  return newState
}

/* ------------       DISPATCHERS     ------------------ */

export const storeToken = token => (dispatch) => {
  return dispatch(setToken(token))
}
