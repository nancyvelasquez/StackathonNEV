import React from 'react';
import { NavLink } from 'react-router-dom';
import { Slider, Slide, Carousel, NavItem, Icon } from 'react-materialize';

import Viewer from './Viewer';

const Home = () => {
  return (
    <div>
        <button id="button-black" className="waves-effect waves-light btn"><a href="/webgl_planets">Open Your Mind</a></button>
        <Carousel
            options={{ fullWidth: true }}
            images={[
                'https://images.unsplash.com/photo-1485795959911-ea5ebf41b6ae?dpr=1&auto=format&fit=crop&w=1080&h=711&q=80&cs=tinysrgb&crop=',
            ]}
        />
    </div>
    );
};

export default Home;