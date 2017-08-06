import axios from 'axios'


const initialState = {
  data: {},
  isLoading: false,
  isLoggedIntoSpotify: false,
  currSong: '',
  currSongId: '',
  corpus: '',
  access_token: ''
}

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT = 'SET_CURRENT'
const SET_TOKEN = 'SET_TOKEN'
const SET_CORPUS = 'SET_CORPUS'
const SET_CHART_DATA = 'SET_CHART_DATA'

/* ------------   ACTION CREATORS     ------------------ */

const setCurr = (id, song) => {
  song = song.indexOf(' - ') > -1 ?
    song.slice(0, song.indexOf(' - ')) :
    song
  return {
    type: SET_CURRENT,
    id,
    song
  }
}

const setToken = token => ({ type: SET_TOKEN, token })

/* ------------       REDUCER     ------------------ */

export default (state = initialState, action) => {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case SET_CURRENT:
      newState.currSong = action.song
      newState.currSongId = action.currSongId
      break

    case SET_TOKEN:
      newState.isLoggedIntoSpotify = true
      newState.access_token = action.token
      break

    default:
      return state
  }
  return newState
}

/* ------------       DISPATCHERS     ------------------ */

export const storeToken = token => (dispatch) => {
  return dispatch(setToken(token))
}


export const grabCurrSong = token => (dispatch, getState) => {
  return axios.get('https://api.spotify.com/v1/me/player/currently-playing', { headers: { 'Authorization': `Bearer ${token}` } })
    .then(res => {
      const apiId = res.data.item.external_urls.id,
        apiSong = res.data.item.name
      if (apiId !== getState().currSongId || apiSong !== getState().currSong) {
        dispatch(setCurr(apiId, apiSong))
      }
    })
    .catch(err => console.error(`Error loading song`, err))
}

// export const getCurrTrackMood = token => (dispatch, getState) => {
//   return axios.get(`https://api.spotify.com/v1/tracks/${id}`, { headers: { 'Authorization': `Bearer ${token}` } })
//     .then(res => {
//       console.log('this is the data', res.data)
//       dispatch(setMood(res.data))
//     })
//     .catch(err => console.error(`Error loading track features`, err))
// }
  
