import Particles from 'react-particles-js';
import React, { Component } from 'react';


const ParticlesWrap = () => {

return(<Particles
  params={{
      "particles": {
          "line_linked": {
                      "color":"#FFFFFF"
                      },
          "number": {
              "value": 15
          },
          "size": {
              "value": 8
          }
      },
      "interactivity": {
          "events": {
              "onhover": {
                  "enable": true,
                  "mode": "repulse"
              }
          }
      }
  }}
style={{
        width: '100%',
        background: `rgba(50, 20, 20, .2)` 
 }}
/>

  )

}
export default ParticlesWrap;



