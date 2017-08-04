'use strict'

/**
 * `babel-preset-env` converts this general import into a selection of specific
 * imports needed to polyfill the currently-supported environment (as specified
 * in `.babelrc`). As of 2017-06-04, this is primarily to support async/await.
 */
import 'babel-polyfill'

import React from 'react'
import {render} from 'react-dom'
import {Provider, connect} from 'react-redux'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import Perf from 'react-addons-perf';

import Home from './components/Home'
import Browser from './components/Browser'
import NavbarSection from './components/Navbar'
import FooterSection from './components/Footer'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'

window.Perf = Perf;

const Planets = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
    <div>
      {/* <nav>
        {user ? <WhoAmI/> : <Login/>}
      </nav> */}
      <main>
        <NavbarSection />
        <Switch>
          <Route exact path="/" component={Home} />
           <Route exact path="/:slug?" component={Browser} /> 
          <Route component={NotFound} />
        </Switch>
        <FooterSection />
      </main>
    </div>
)

render(
  <Provider store={store}>
    <Router>
      <Planets />
    </Router>
  </Provider>,
  document.getElementById('content')
)



// const LVR = ({ user, children }) => (
//   <div>
//     <Navbar />

//     <Routes />

//     <Footer />
//   </div>
// )

// render(
//   <Provider store={store}>
//     <Router>
//       <LVR />
//     </Router>
//   </Provider>,
//   document.getElementById('main')
// )