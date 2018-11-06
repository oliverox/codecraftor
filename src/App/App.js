import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import '../../node_modules/normalize.css/normalize.css';
import '../../node_modules/@blueprintjs/icons/lib/css/blueprint-icons.css';
import '../../node_modules/@blueprintjs/core/lib/css/blueprint.css';
import './App.scss';
import {
  Alignment,
  Button,
  Classes,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading
  /* Radio, RadioGroup */
} from '@blueprintjs/core';
import Index from '../Index/Index';
import MainFrame from '../MainFrame/MainFrame';

/* MainFrame App */

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
        <div className="app">
          <header className="app-header">
            <Navbar>
              <NavbarGroup align={Alignment.LEFT}>
                <NavbarHeading className="navbar-heading">Codecraftor</NavbarHeading>
                <NavbarDivider />
                <Button className={Classes.MINIMAL} icon="home" text="Home" />
                <Button
                  className={Classes.MINIMAL}
                  icon="document"
                  text="Files"
                />
              </NavbarGroup>
            </Navbar>
          </header>
          <Route path="/" exact component={Index} />
          <Route path="/new/:craftId" component={MainFrame} />
        </div>
      </Router>
    );
  }
}

export default App;
