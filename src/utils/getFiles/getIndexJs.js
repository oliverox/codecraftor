export default siteMeta => `
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import WebFontLoader from 'webfontloader';
import 'normalize.css/normalize.css';

const IndexPage = React.lazy(() => import('./pages/Index/Index'));

WebFontLoader.load({
  google: {
    families: ${JSON.stringify(siteMeta.theme.font.family)}
  }
});

const theme = ${JSON.stringify(siteMeta.theme)};

const App = () => {
  return (
    <Router>
      <React.Suspense fallback={<div>Loading...</div>}>
        <div>
          <Switch>
            <Route path="/" exact render={props => <IndexPage {...props} theme={theme} />} />
          </Switch>
        </div>
      </React.Suspense>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();`;
