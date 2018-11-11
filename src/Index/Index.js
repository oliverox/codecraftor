import React from 'react';
import firebase from 'firebase/app';
import { withRouter } from 'react-router-dom';
import { Button, Intent } from '@blueprintjs/core';
import { SpinnerOverlay } from '../components';
import { H1, H6, Blockquote } from '@blueprintjs/core';

import './Index.scss';

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
        history.push(`/new/${docRef.id}`);
      });
  }

  render() {
    return (
      <div className="index-container">
        <SpinnerOverlay isOpen={this.state.isRedirecting} />
        <div className="index-header">
          <div className="index-header-content">
            <H1 className="app-title">Codecraftor</H1>
            <H6 className="app-subtitle">
              The future of web development.
              <br />
              <span style={{ color: 'orange', fontSize: '10px' }}>
                * a work in progress * <br />* not mobile-friendly yet *
              </span>
            </H6>
          </div>
        </div>
        <div className="index-main">
          <div className="index-main-content">
            <div className="index-main-content-section">
              <h2>What is Codecraftor?</h2>
              <p>
                Codecraftor aims to simplify web development by composing fully
                functional web apps visually with simple and complex reusable
                components. What this means is that Codecraftor is a web site
                creation tool in between WYSIWYG and coding from scratch. With
                the advent of componentization of the web, we can now look at a
                web site as a composition of simple and complex components.
                Codecraftor aims to become a tool to allow web developers (or
                anyone), to lay down web components on a page and allow their
                complete customizations. Even though this idea had been
                lingering in my head for the past three years, Codecraftor was
                only started as part of the{' '}
                <a href="https://pioneer.app">
                  Pioneer October 2018 Tournament
                </a>{' '}
                for fun.
              </p>
            </div>
            <div className="index-main-content-section">
              <h2>Why Codecraftor?</h2>
              <p>
                As a freelance web developer who does not do much UX, I often
                find myself browsing through various ready-made themes online to
                eventually purchase one to use for the current project I'm
                working on. These themes always have to be customized and
                restructured to meet my needs and working style (directory
                structure, code quality, web framework, etc). I end up having to
                copy a lot of what I have built before in previous projects in
                order customize the purchased theme. So it made me think:{' '}
                <strong>
                  what if there was a tool that would let me choose the kind of
                  configurations I want and allow me to download the theme based
                  on those settings?
                </strong>{' '}
                Codecraftor is my attempt to solve this question.
              </p>
            </div>
            <div className="index-main-content-section">
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
            </div>
            <div className="index-main-content-section">
              <h2>How do I get started?</h2>
              <p>
                The work is still really a work in progress. I tried to build a
                very basic prototype to convey the idea behind Codecraftor. Bear
                in mind that for Codecraftor to really be successful, this
                prototype will need evolve greatly. But stay tuned as I am
                working hard on it and listening to all the feedback I'm getting
                from other Pioneer participants!
              </p>
            </div>
            <div className="index-main-content-section cta">
              <Button
                large
                intent={Intent.SUCCESS}
                onClick={this.handleRedirect}
              >
                Enought talk, I want to start a New Craft now!
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
