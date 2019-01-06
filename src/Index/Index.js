import React from 'react';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import { H1, H6 } from '@blueprintjs/core';
import SpinnerOverlay from '../appComponents/SpinnerOverlay/SpinnerOverlay';
import { BlankPage } from '../templates';

import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import './Index.scss';
import logo from '../images/logo.png';

class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      isRedirecting: false
    };
    this.handleRedirect = this.handleRedirect.bind(this);
  }

  handleRedirect() {
    const db = firebase.firestore();
    const { history } = this.props;
    this.setState({
      isRedirecting: true
    });
    window.gtag('event', 'click', {
      send_to: process.env.REACT_APP_GA_TRACKING_ID,
      event_category: 'Button',
      event_label: 'New Craft'
    });
    db.settings({ timestampsInSnapshots: true });
    db.collection(process.env.REACT_APP_CRAFTS_COLLECTION)
      .add({
        created: Date.now(),
        siteMeta: BlankPage
      })
      .then(docRef => {
        history.push(`/craft/${docRef.id}`);
      });
  }

  render() {
    return (
      <div className="index-container">
        <SpinnerOverlay isOpen={this.state.isRedirecting} />
        <div className="index-header">
          <div className="index-header-content">
            <div className="index-header-logo">
              <img src={logo} alt="codecraftor" width={55} />
            </div>
            <div>
              <H1 className="app-title">Codecraftor</H1>
              <H6 className="app-subtitle">Rethinking web development</H6>
            </div>
          </div>
          <p className="app-made">
            Built with <span className="app-made-heart">❤</span> in{' '}
            <a
              href="https://goo.gl/fvEda5"
              rel="noopener noreferrer"
              target="_blank"
            >
              Mauritius
            </a>
          </p>
        </div>
        <div className="index-main">
          <div className="index-main-content">
            <div className="index-main-content-section">
              <h2>What is Codecraftor?</h2>
              <p>
                Codecraftor is a visual web builder platform with a component
                marketplace and the ability to easily download and deploy your
                website. Codecraftor aims to simplify web development by
                composing fully functional websites visually with simple and
                complex reusable components. What this means is that Codecraftor
                is a web site creation tool in between WYSIWYG and coding from
                scratch.
              </p>
            </div>
            <div className="index-main-content-section">
              <h2>Why Codecraftor?</h2>
              <p>
                Unlike Wix, Squarespace and other big players, there are no
                lock-ins with Codecraftor. You can download your website,
                customize and deploy it wherever you want. On top of that, you
                get to use community-built components in your apps which
                developers can publish on the platform in the form of templates.
              </p>
            </div>
            <div className="index-main-content-section">
              <h2>How do I get started?</h2>
              <p>
                Codecraftor is currently a work in progress at a
                proof-of-concept stage. Stay tuned as hard work is being
                put into it while listening to all the feedback from other
                Pioneer participants! Feel free to click on the button below to
                get started on a new web craft.
              </p>
            </div>
            <div className="index-main-content-section cta">
              <Button
                large
                // disabled={process.env.NODE_ENV === 'production'}
                intent={Intent.PRIMARY}
                onClick={this.handleRedirect}
              >
                Start a new Craft
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
