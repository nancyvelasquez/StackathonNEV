import React from 'react';
import ReactDOM, { render } from 'react-dom';
import { NavLink, Router, Route, IndexRedirect, browserHistory } from 'react-router-dom';
import Viewer from './Viewer';

import Planets from './Planets/index';

const examples = [
  { 
    name: 'Planets',
    component: Planets,
    url: 'Planets/index',
    slug: 'webgl_planets',
  },
];

const Browser = ({ match }) => {
  const { params } = match;
  const activeExample = params.slug && examples.find(example => example.slug === params.slug);
  return (
    <div>
      <Viewer example={activeExample} />
    </div>
  );
};

Browser.propTypes = {
  match: React.PropTypes.object.isRequired,
};

export default Browser;
