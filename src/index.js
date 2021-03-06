import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import 'normalize.css/normalize.css';

import styles from './index.module.css';

const Index = React.lazy(() => import('./Index/Index'));
const App = React.lazy(() => import('./App/App'));
const Editor = React.lazy(() => import('./Editor/Editor'));
const rootEl = document.getElementById('root');

firebase.initializeApp();


const CodecraftorApp = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const isEditor = urlParams.get('_frame');
  let cn = styles.app;
  if (isEditor === 'true') {
    cn = `${styles.app} ${styles.editor}`;
  }
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className={cn}>
          <Switch>
            <Route path="/" exact render={props => <Index {...props} />} />
            <Route
              path="/craft/:craftId"
              render={props => <App {...props} />}
            />
            <Route path="/editor" render={props => <Editor {...props} />} />
          </Switch>
        </div>
      </React.Suspense>
    </Router>
  );
};

ReactDOM.render(<CodecraftorApp />, rootEl);

serviceWorker.unregister();
