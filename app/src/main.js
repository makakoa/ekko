'use strict';

var rust = require('rust'),
    aframe = require('aframe-react'),
    Scene = aframe.Scene,
    Entity = aframe.Entity,
    Player = require('player'),
    logoProps;

require('components/analyser');
require('components/levels');
require('components/waveform');
require('components/volume-graph');
require('components/volume-light');
require('aframe-particle-system-component');
require('aframe-bmfont-text-component');
require('components/clickable');



module.exports = rust.o2([
  Scene,
  {antialias: true},

  [Entity,
   {primitive: 'a-assets'},
   ['img', {
     id: 'logo',
     src: 'images/ekko.png'
   }]
  ],

  [Player],

  [
    Entity,
    {
      position: '3 2 -4'
    },

    ['a-animation', {
      attribute: 'rotation',
      dur: '10000',
      repeat: 'indefinite',
      to: '0 360 0',
      easing: 'linear'
    }],

    [Entity, logoProps = {
      geometry: {
        primitive: 'plane',
        height: 1,
        width: 2
      },
      material: {
        src: '#logo',
        opacity: '0.99'
      }
    }],

    // Backside of logo
    [Entity, {
      rotation: '0 180 0'
    }, logoProps]
  ],

  [Entity, {
    id: 'analyser',
    audioanalyser: {src: '#song'}
  }],

  // [Entity, {
  //   position: '-4 -1.5 0',
  //   rotation: '0 60 0',
  //   levels: {analyserEl: '#analyser'}
  // }],

  [Entity, {
    position: '0 -5 0',
    waveform: {analyserEl: '#analyser'}
  }],

  // [Entity, {
  //   position: '-5 -1 4',
  //   rotation: '0 90 0',
  //   'volume-graph': {analyserEl: '#analyser'}
  // }],

  // [Entity, {
  //   position: '0 0 0',
  //   'volume-light': {analyserEl: '#analyser'}
  // }],

  [Entity, {
    rotation: '0 0 180',
    'particle-system': {
      preset: 'snow',
      color: '#ff007f'
    }
    // 'excite-particles': {analyserEl: '#analyser'}
  },
   ['a-animation', {
     attribute: 'rotation',
     dur: '60000',
     repeat: 'indefinite',
     to: '0 360 0',
     easing: 'linear'
   }]
  ],



  ['a-sky', {color: '#222222'}],
  // ['a-sky', {src: '#bg'}]

  [
    Entity,
    {
      // position: '-3.8 1.6 -3.7',
      // rotation: '1.5 -19.6 0'
      camera: true,
      'wasd-controls': '',
      'look-controls': ''
    },

    [Entity, {
      position: '0 0 -1', // always in front of camera
      geometry: {
        primitive: 'ring',
        radiusInner: 0.0085,
        radiusOuter: 0.015
      },
      material: {
        opacity: 0.5,
        color: '#888888',
        shader: 'flat'
      },
      raycaster: {
        objects: '.clickable'
      },
      'update-raycaster': '',
      clicker: '',
      cursor: {}
    }]

  ]

]);
