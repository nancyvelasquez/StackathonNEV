import React from 'react';
import { NavLink } from 'react-router-dom';
import { Slider, Slide, Carousel, NavItem, Icon, Navbar, Footer } from 'react-materialize';

const FooterSection = () => {
  return (
    <div>
        <Footer moreLinks={
            <a className="grey-text text-lighten-4 right" href="#!"></a>
            }
            id="footer-section"
            >
            <p className="white-text">Project by Nancy Velasquez</p>
            <p className="white-text photocred">Photo by h heyerlein on Unsplash</p>
        </Footer>;
    </div>
    );
};

export default FooterSection;