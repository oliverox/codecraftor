import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
import { FocusStyleManager } from '@blueprintjs/core';

import NavbarHeader from '../appComponents/NavbarHeader/NavbarHeader';
import Sidebar from '../appComponents/Sidebar/Sidebar';
import Iframe from '../appComponents/Iframe/Iframe';
import { BlankPage } from '../templates';

import 'typeface-montserrat';
import styles from './App.module.css';

FocusStyleManager.onlyShowFocusOnTabs();

class MainFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      siteMeta: false,
      currentTab: 'home',
      currentPage: 'index'
    };
    this.iframeRef = false;
    this.initialRender = true;
    this.handleMsgRcvd = this.handleMsgRcvd.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.setIframeRef = this.setIframeRef.bind(this);
    this.sendPageMetaToFrame = this.sendPageMetaToFrame.bind(this);
  }

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

  componentDidMount() {
    const { match } = this.props;
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    this.docRef = db
      .collection(process.env.REACT_APP_CRAFTS_COLLECTION)
      .doc(match.params.craftId);
    this.docRef.get().then(doc => {
      if (doc.exists) {
        const { siteMeta = BlankPage } = doc.data();
        this.setState({
          siteMeta
        });
      } else {
        this.setState({
          siteMeta: BlankPage
        });
      }
    });

    window.addEventListener('message', this.handleMsgRcvd);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMsgRcvd);
  }

  handleTabChange(nextTab) {
    console.log('changing tab to:', nextTab);
    this.setState({
      currentTab: nextTab
    });
  }

  handleMsgRcvd(msg) {
    if (msg.origin !== process.env.REACT_APP_CRAFT_FRAME_URL) {
      return;
    }
    console.log('Mainframe msg rcvd:', msg.data);
  }

  sendPageMetaToFrame() {
    console.log('sendPageMetaToFrame...');
    if (this.iframeRef) {
      this.iframeRef.contentWindow.postMessage({
        page: 'index',
        siteMeta: this.state.siteMeta
      });
    }
  }

  setIframeRef(ref) {
    console.log('setting iframe ref in mainframe:', ref);
    this.iframeRef = ref.current;
  }

  render() {
    const { match } = this.props;
    const { currentTab, siteMeta, currentPage } = this.state;
    const currentPageTitle = siteMeta
      ? siteMeta.pages[currentPage].pageTitle
      : '';
    if (siteMeta && this.initialRender) {
      this.initialRender = false;
      this.sendPageMetaToFrame();
    }
    console.log('craft id =', match.params.craftId);
    return (
      <>
        <NavbarHeader
          selected={currentTab}
          handleTabChange={this.handleTabChange}
        />
        <main className={styles.mainframe}>
          <Sidebar
            currentTab={currentTab}
            siteMeta={siteMeta}
            currentPage={currentPage}
            sendPageMetaToFrame={this.sendPageMetaToFrame}
          />
          <Iframe
            craftId={match.params.craftId}
            setIframeRef={this.setIframeRef}
            currentPageTitle={currentPageTitle}
          />
        </main>
      </>
    );
  }
}

export default MainFrame;
