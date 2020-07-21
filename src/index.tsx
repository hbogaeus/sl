import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './css/index.css';
import './css/inter.css';
import App from './App';
import { Settings } from 'luxon';

Settings.defaultLocale = 'sv-SE';

ReactDOM.render(
  <App />,
  document.getElementById('root')
)