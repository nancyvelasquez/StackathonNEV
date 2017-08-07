import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPop } from '../reducers'
import { SideNav, SideNavItem, Button } from 'react-materialize';


class Corpus extends Component {
  render() {
    return (
        <SideNavItem>
            <iframe src="https://open.spotify.com/embed?uri=spotify:user:nevelasquez113:playlist:1zuxXxA6bpGDLqdg6jD4ri" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>
        </SideNavItem> 
    )
  }
}

export default Corpus