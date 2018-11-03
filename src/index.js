import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { FocusStyleManager } from '@blueprintjs/core';
const App = React.lazy(() => import('./App/App'));

FocusStyleManager.onlyShowFocusOnTabs();
const rootEl = document.getElementById('root');

ReactDOM.render(<React.Suspense fallback={<div>Loading...</div>}>
  <App />
</React.Suspense>, rootEl);

serviceWorker.unregister();
