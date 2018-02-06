
import _ from 'lodash';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';

ReactDOM.render(<App />, document.getElementById('root'));

/*
function component() {
      var element = document.createElement('div');

     // Lodash, currently included via a script, is required for this line to work
     // Lodash, now imported by this script
     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

      return element;
    }

  document.body.appendChild(component());
  */
