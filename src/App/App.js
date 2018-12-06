import React from 'react';
import shortid from 'shortid';
import firebase from 'firebase/app';
import { FocusStyleManager } from '@blueprintjs/core';

import NavbarHeader from '../appComponents/NavbarHeader/NavbarHeader';
import Sidebar from '../appComponents/Sidebar/Sidebar';
import Iframe from '../appComponents/Iframe/Iframe';
import { BlankPage } from '../templates';

import 'typeface-montserrat';
import '@blueprintjs/icons/lib/css/blueprint-icons.css';
import '@blueprintjs/core/lib/css/blueprint.css';
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
    this.setIframeRef = this.setIframeRef.bind(this);
    this.handleMsgRcvd = this.handleMsgRcvd.bind(this);
    this.updateSiteMeta = this.updateSiteMeta.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.sendPageMetaToFrame = this.sendPageMetaToFrame.bind(this);
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

  componentDidUpdate() {
    // TODO: Should we do this at every update or check when to sendPageMetaToFrame() ?
    this.sendPageMetaToFrame();
  }

  handleTabChange(nextTab) {
    console.log('changing tab to:', nextTab);
    this.setState({
      currentTab: nextTab
    });
  }

  handleMsgRcvd({ origin, data }) {
    if (origin !== window.location.origin) {
      return;
    }
    console.log('Mainframe msg rcvd from:', origin, data);
    if (data && data.componentModule && data.target && data.page) {
      this.updateSiteMeta(data);
    }
  }

  updateSiteMeta(params) {
    const { page, target, componentModule } = params;
    const { siteMeta } = this.state;
    const id = shortid.generate();
    const newComponent = { id, componentModule };
    siteMeta.updated = Date.now();
    if (target === 'root') {
      if (siteMeta.pages[page].imports.indexOf(componentModule) < 0) {
        siteMeta.pages[page].imports.push(componentModule);
      }
      siteMeta.pages[page].root.childrenComponents.push(id);
      siteMeta.pages[page].nonRootComponents.push(newComponent);
    }
    console.log('updated siteMeta=', siteMeta);
    this.setState({
      siteMeta
    });
    this.docRef.set({
      siteMeta
    });
  }

  sendPageMetaToFrame() {
    console.log('sendPageMetaToFrame...');
    if (this.iframeRef) {
      this.iframeRef.contentWindow.postMessage(
        {
          page: 'index',
          siteMeta: this.state.siteMeta
        },
        '*'
      );
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
