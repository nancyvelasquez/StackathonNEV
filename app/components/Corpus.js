import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPop } from '../reducers'
import { SideNav, SideNavItem, Button } from 'react-materialize';


class Corpus extends Component {
  render() {
    return (
        <SideNavItem>
            <iframe src="https://open.spotify.com/embed?uri=spotify:user:spotify:playlist:37i9dQZEVXcH9yipLsAeeL&theme=white" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
        </SideNavItem>
    )
  }
}

export default Corpus