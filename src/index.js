import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import asyncComponent from './appComponents/AsyncComponent/AsyncComponent';
import 'normalize.css/normalize.css';

import styles from './index.module.css';

const rootEl = document.getElementById('root');

const CodecraftorApp = () => {
  const Index = asyncComponent(() =>
    import('./Index/Index').then(module => module.default)
  );
  const App = asyncComponent(() =>
    import('./App/App').then(module => module.default)
  );
  const Editor = asyncComponent(() =>
    import('./Editor/Editor').then(module => module.default)
  );
  return (
    <Router>
      <div className={styles.app}>
        <Route path="/" exact component={Index} />
        <Route path="/craft/:craftId" component={App} />
        <Route path="/editor" component={Editor} />
      </div>
    </Router>
  );
};

ReactDOM.render(<CodecraftorApp />, rootEl);

serviceWorker.unregister();
