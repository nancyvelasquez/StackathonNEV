import React from 'react';
import { NavLink } from 'react-router-dom';
import { Slider, Slide, Carousel, NavItem, Icon, Footer, Navbar } from 'react-materialize';

const NavbarSection = () => {
  return (
    <div>
        <Navbar brand='' right>
            <NavItem href='webgl_planets'>Open Your Eyes</NavItem>
        </Navbar>
    </div>
    );
};

export default NavbarSection;