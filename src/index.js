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

firebase.initializeApp({
  apiKey: 'AIzaSyCZP85JmQhLbQG9GFoUFqbHApONOkoGZ5M',
  authDomain: 'codecraftor-e8efe.firebaseapp.com',
  databaseURL: 'https://codecraftor-e8efe.firebaseio.com',
  projectId: 'codecraftor-e8efe',
  storageBucket: 'codecraftor-e8efe.appspot.com',
  messagingSenderId: '495590234980'
});


const CodecraftorApp = () => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div className={styles.app}>
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
