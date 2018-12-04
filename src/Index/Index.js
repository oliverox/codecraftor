import React from 'react';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import { H1, H6 } from '@blueprintjs/core';
import SpinnerOverlay from '../appComponents/SpinnerOverlay/SpinnerOverlay';

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
        actions: [],
        config: {}
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
            Made with <span className="app-made-heart">❤</span> in{' '}
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
                developers can publish on the platform.
              </p>
            </div>
            {/* <div className="index-main-content-section">
              <h2>
                How is it different from other web site builders out there?
              </h2>
              <p>
                There isn't really a good middle-ground tool between visual
                design and code. Codecraftor aims to become that tool. With
                Codecraftor, users will not only be able to visually compose
                their site, but also pick their web framework of choice (React,
                Angular, etc), choose a UI toolkit, and eventually pushed the
                site to a domain or even download the complete source code. The
                idea is that all this should be able to be done via an easy
                conversational user interface.
              </p>
            </div>
            <div className="index-main-content-section">
              <h2>
                What are some encouraging feedback received from other Pioneer
                participants?
              </h2>
              <Blockquote>
                "could be useful for developers." - arstore
              </Blockquote>
              <Blockquote>"I like the practicality. - merlin</Blockquote>
              <Blockquote>
                "It would be amazing to have a product on the middle ground of
                wysiwyg and real code - it's amazing you have the necessary
                background and expierence to build such product" - tbs
              </Blockquote>
              <Blockquote>
                "I would use the heck out of this" - sunshowerlisa
              </Blockquote>
              <Blockquote>
                "I love it and can see it transforming the world. " - King
              </Blockquote>
              <Blockquote>
                "This is a great idea. I have done html coding for about 14
                years and a bit of wix that is an in between for the developer
                and the amateur would be great. Up against a tough one... :-/" -
                hermione-204981
              </Blockquote>
              <Blockquote>
                "i like its applicability" - engithumbihjames123-3577
              </Blockquote>
              <Blockquote>
                "Now this is great. It will go a long way to help even Young
                Minds in achieving an easy way of coding. Weldone " - MidasTORCH
              </Blockquote>
            </div> */}
            <div className="index-main-content-section">
              <h2>How do I get started?</h2>
              <p>
                Codecraftor is still a work in progress. I tried to build a very
                basic prototype to convey the idea. Bear in mind that for
                Codecraftor to really be successful, this prototype will need
                evolve greatly. But stay tuned as I am working hard on it and
                listening to all the feedback I'm getting from other Pioneer
                participants!
              </p>
            </div>
            <div className="index-main-content-section cta">
              <Button
                large
                disabled={process.env.NODE_ENV === 'production'}
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
