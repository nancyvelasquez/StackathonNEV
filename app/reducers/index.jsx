import axios from 'axios'

const initialState = {
  data: {},
  isLoading: false,
  isLoggedIntoSpotify: false,
  currSong: '',
  currSongId: '',
  corpus: '',
  access_token: '',
  today: {},
  tomorrow: {},
}

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT = 'SET_CURRENT'
const SET_TOKEN = 'SET_TOKEN'
const SET_POPS = 'SET_POPS'

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

const setPops = ({total_population}) => {
  console.log(total_population)
  const today = total_population[0]
  const tomorrow = total_population[1]
  return {
    type: SET_POPS,
    today,
    tomorrow
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

    case SET_POPS: 
      newState.today = action.today
      newState.tomorrow = action.tomorrow
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
      console.log('This is the res.data', res.data)
      const apiId = res.data.item.external_urls.id,
        apiSong = res.data.item.name
      if (apiId !== getState().currSongId || apiSong !== getState().currSong) {
        dispatch(setCurr(apiId, apiSong))
      }
    })
    .catch(err => console.error(`Error loading song`, err))
}

export const getPop = () => (dispatch, getState) => {
  return axios.get('http://api.population.io:80/1.0/population/United%20States/today-and-tomorrow/')
  .then(res => res.data)
  .then(obj => {
    dispatch(setPops(obj))
  })
  .catch(err => console.error(`Error loading song`, err))
}

