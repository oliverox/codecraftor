import React from 'react';
import firebase from 'firebase/app';
import NavbarHeader from './NavbarHeader/NavbarHeader';
import Sidebar from './Sidebar/Sidebar';
import Iframe from '../Iframe/Iframe';

import styles from './EditorLayout.module.css';
import blankPage from './blankPage';

class MainFrame extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTab: 'home'
    };
    this.iframeRef = false;
    this.handleMsgRcvd = this.handleMsgRcvd.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.setIframeRef = this.setIframeRef.bind(this);
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
        const { siteMeta = blankPage } = doc.data();
        this.setState({
          siteMeta
        });
      } else {
        console.log('siteMeta=', blankPage);
        this.setState({
          siteMeta: blankPage
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
      this.iframeRef.contentWindow.postMessage(
        {
          page: 'index',
          siteMeta: this.state.siteMeta
        },
        process.env.REACT_APP_CRAFT_FRAME_URL
      );
    }
  }

  setIframeRef(ref) {
    console.log('setting iframe ref in mainframe:', ref);
    this.iframeRef = ref.current;
  }

  render() {
    const { match } = this.props;
    const { currentTab } = this.state;
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
            sendPageMetaToFrame={this.sendPageMetaToFrame}
          />
          <Iframe
            craftId={match.params.craftId}
            setIframeRef={this.setIframeRef}
          />
        </main>
      </>
    );
  }
}

export default MainFrame;
