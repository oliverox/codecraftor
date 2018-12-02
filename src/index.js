import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { FocusStyleManager } from '@blueprintjs/core';
import 'typeface-montserrat';
import App from './App';

FocusStyleManager.onlyShowFocusOnTabs();
const rootEl = document.getElementById('root');

ReactDOM.render(<App />, rootEl);

serviceWorker.unregister();
