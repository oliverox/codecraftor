export default siteMeta => {
  let pageImports = '';
  let routes = '';
  siteMeta.pages.forEach((page, index) => {
    if (index === 0) {
      pageImports += `const IndexPage = React.lazy(() => import('./pages/Index/Index'));`
      routes += `<Route path="/" exact render={props => <IndexPage {...props} theme={theme} />} /> `
    } else {
      pageImports += `\nconst Page${index} = React.lazy(() => import('./pages/Page${index}/Page${index}'));`
      routes += `\n<Route path="/page${index}" exact render={props => <Page${index} {...props} theme={theme} />} /> `
    }
  });
  return`import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import WebFontLoader from 'webfontloader';
import 'normalize.css/normalize.css';

${pageImports}

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
            ${routes}
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
serviceWorker.unregister();`
};