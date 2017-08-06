import React from 'react';

import PureRenderMixin from 'react/lib/ReactComponentWithPureRenderMixin';
// import TrackballControls from '../../ref/trackball';

import * as THREE from 'three';
import Stats from 'stats.js';
import React3 from 'react-three-renderer';
import Base from '../Base';

class Geometries extends Base {
  constructor(props, context) {
    super(props, context);
    this.directionalLightPosition = new THREE.Vector3(0, 1, 0);
    this.scenePosition = new THREE.Vector3(0, 0, 0);

  this.objectPositions = [{ // sun
      name: "Main",
      coords: new THREE.Vector3(0, 10, 0),
      spin: 0,
      radius: 400,
      resourceUrl: "./images/ishan-seefromthesky-192925.jpg",
    } ];
    
    this.state = {
      ...this.state,
      timer: Date.now() * 0.0001,
    };

  }

    // this function allows for 3D animation to be responsive on window size change WITHOUT reloading/restarting the 3D animation
  updateCanvasSize() {
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

    this.setState({ width, height});
  }

  componentWillMount() {
    this.updateCanvasSize();
  }

  componentDidMount() {
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = '0px';
    this.refs.container.appendChild(this.stats.domElement);
  }

  componentWillUnmount() {
    delete this.stats;
  }

  _onAnimate = () => {
    this._onAnimateInternal();
  };

  _onAnimateInternal() {
    const timer = Date.now() * 0.0001;
    this.setState({
      timer,
    });
    this.stats.update();
  }

  render() {
    const {
      width,
      height,
    } = this.props;

    const {
      timer,
    } = this.state;

    return (
    <div ref="container">
      <React3
        width={width}
        height={height}
        antialias
        pixelRatio={window.devicePixelRatio}
        mainCamera="mainCamera"
        onAnimate={this._onAnimate}
      >
          {
            this.objectPositions.map(({ resourceUrl }, i) => 
              <resources>
                <texture
                  resourceId={`texture-${i}`}
                  url={resourceUrl}
                  wrapS={THREE.MirroredRepeat}
                  wrapT={THREE.RepeatWrapping}
                  anisotropy={16}
                />
                <meshPhongMaterial
                  resourceId={`material-${i}`}
                  side={THREE.DoubleSide}
                >
                  <textureResource
                    resourceId={`texture-${i}`}
                  />
                </meshPhongMaterial>
              </resources>
            )
          }
        <scene>
          <perspectiveCamera
            fov={100}
            aspect={width / height}
            near={5}
            far={3000}
            lookAt={this.scenePosition}
            name="mainCamera"
            position={new THREE.Vector3(
              Math.cos(timer) * 400,
              400,
              Math.sin(timer) * 800
            )}
          />
          <ambientLight
            color={0x000000}
          />
          <directionalLight
            color={0xffffff}
            position={this.directionalLightPosition}
            lookAt={this.scenePosition}
          />

    {
      this.objectPositions.map((planet, i) => 
        <mesh key={planet.name} position={planet.coords} rotation={
          (new THREE.Euler(
            timer * 0,
            timer * planet.spin,
            0
          ))}>
          <sphereGeometry radius={planet.radius} widthSegments={20} heightSegments={20} />
          <materialResource resourceId={`material-${i}`} />
        </mesh>
        )
    }

        </scene>
      </React3>
    </div>);
  }
}

export default Geometries;
