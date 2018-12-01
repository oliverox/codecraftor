import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'normalize.css/normalize.css';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import Index from '../Index/Index';
import EditorLayout from './components/EditorLayout/EditorLayout';

import styles from './App.module.css';

class App extends Component {
  componentWillMount() {
    firebase.initializeApp({
      apiKey: 'AIzaSyCZP85JmQhLbQG9GFoUFqbHApONOkoGZ5M',
      authDomain: 'codecraftor-e8efe.firebaseapp.com',
      databaseURL: 'https://codecraftor-e8efe.firebaseio.com',
      projectId: 'codecraftor-e8efe',
      storageBucket: 'codecraftor-e8efe.appspot.com',
      messagingSenderId: '495590234980'
    });
  }

  render() {
    console.log('rendering App');
    return (
      <Router>
        <div className={styles.app}>
          <Route path="/" exact component={Index} />
          <Route
            path="/craft/:craftId"
            render={props => <EditorLayout {...props} />}
          />
        </div>
      </Router>
    );
  }
}

export default App;