import React from 'react';
import shortid from 'shortid';
import firebase from 'firebase/app';
import { FocusStyleManager } from '@blueprintjs/core';

import NavbarHeader from '../appComponents/NavbarHeader/NavbarHeader';
import Sidebar from '../appComponents/Sidebar/Sidebar';
import Iframe from '../appComponents/Iframe/Iframe';
import { BlankPage } from '../templates';
import getComponentObj from '../utils/getComponentObj';

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
      currentPage: 'index',
      currentComponentId: false
    };
    this.iframeRef = false;
    this.initialRender = true;
    this.download = this.download.bind(this);
    this.updateSite = this.updateSite.bind(this);
    this.updateTheme = this.updateTheme.bind(this);
    this.setIframeRef = this.setIframeRef.bind(this);
    this.handleMsgRcvd = this.handleMsgRcvd.bind(this);
    this.updateSiteMeta = this.updateSiteMeta.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.getImportsForPage = this.getImportsForPage.bind(this);
    this.sendPageMetaToFrame = this.sendPageMetaToFrame.bind(this);
    this.appendComponentToPage = this.appendComponentToPage.bind(this);
    this.updateComponentOnPage = this.updateComponentOnPage.bind(this);
    this.deleteComponentOnPage = this.deleteComponentOnPage.bind(this);
    this.insertComponentInPage = this.insertComponentInPage.bind(this);
    this.sanitizeChildrenComponents = this.sanitizeChildrenComponents.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    this.docRef = db
      .collection(process.env.REACT_APP_CRAFTS_COLLECTION)
      .doc(match.params.craftId);
    this.docRef.get().then(doc => {
      console.log('will check if doc exists in firestore...');
      if (doc.exists) {
        console.log('doc exists in firestore');
        const { siteMeta = BlankPage } = doc.data();
        this.setState({
          siteMeta
        });
      } else {
        console.log('doc does not exist in firestore');
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

    if (data && data.action === 'APPEND') {
      // New component added to page
      this.updateSite('APPEND', data);
    } else if (data && data.action === 'SELECT') {
      // Component was selected on page
      // therefore switch to Configurator tab
      this.setState({
        currentComponentId: data.componentId,
        currentPage: data.page,
        currentTab: 'configurator'
      });
    } else if (data && data.action === 'DELETE') {
      console.log('Delete component:', data.componentId);
      this.deleteComponentOnPage(data);
    } else if (data && data.action === 'INSERT') {
      this.updateSite('INSERT', data);
    } else if (data && data.action === 'READY') {
      this.sendPageMetaToFrame();
    }
  }

  updateSite(action, params) {
    switch (action) {
      case 'APPEND':
        this.appendComponentToPage(params);
        break;

      case 'INSERT': 
        this.insertComponentInPage(params);
        break;

      default:
        break;
    }
  }

  updateSiteMeta(siteMeta) {
    this.setState({
      siteMeta
    });
    this.docRef.set({
      siteMeta
    });
  }

  appendComponentToPage(params) {
    const { page, target, componentType } = params;
    const { siteMeta } = this.state;
    const id = shortid.generate();
    const newComponent = { id, componentType };
    siteMeta.updated = Date.now();
    if (target === 'root') {
      if (siteMeta.pages[page].imports.indexOf(componentType) < 0) {
        siteMeta.pages[page].imports.push(componentType);
      }
      siteMeta.pages[page].root.childrenComponents.push(id);
      siteMeta.pages[page].nonRootComponents.push(newComponent);
    }
    console.log('updated siteMeta=', siteMeta);
    this.updateSiteMeta(siteMeta);
  }

  insertComponentInPage(params) {
    const { page, target, componentType, insertBeforeId } = params;
    const { siteMeta } = this.state;
    const id = shortid.generate();
    const newComponent = { id, componentType };
    siteMeta.updated = Date.now();
    if (target === 'root') {
      if (siteMeta.pages[page].imports.indexOf(componentType) < 0) {
        siteMeta.pages[page].imports.push(componentType);
      }
      const newCC = [];
      for (let i=0; i<siteMeta.pages[page].root.childrenComponents.length; i++) {
        if (siteMeta.pages[page].root.childrenComponents[i] === insertBeforeId) {
          newCC.push(id, insertBeforeId);
        } else {
          newCC.push(siteMeta.pages[page].root.childrenComponents[i]);
        }
      }      
      siteMeta.pages[page].root.childrenComponents = newCC;
      siteMeta.pages[page].nonRootComponents.push(newComponent);
    }
    console.log('updated siteMeta=', siteMeta);
    this.updateSiteMeta(siteMeta);
  }

  deleteComponentOnPage(params) {
    const { page, componentId } = params;
    const { siteMeta } = this.state;
    const nonRootComponents = siteMeta.pages[page].nonRootComponents.slice();
    let componentIndexToRemove = -1;
    for (let i=0; i<nonRootComponents.length; i++) {
      if (nonRootComponents[i].id === componentId) {
        componentIndexToRemove = i;
        break;
      }
    }
    if (componentIndexToRemove >= 0) {
      nonRootComponents.splice(componentIndexToRemove, 1);
    }
    siteMeta.updated = Date.now();
    siteMeta.pages[page].nonRootComponents = nonRootComponents;
    console.log('updated siteMeta=', siteMeta);
    siteMeta.pages[page].imports = this.getImportsForPage(page);
    const newSiteMeta = this.sanitizeChildrenComponents(page);
    this.updateSiteMeta(newSiteMeta);
  }

  getImportsForPage(page) {
    const updatedImports = ['RootContainer'];
    const { siteMeta } = this.state;
    const { nonRootComponents } = siteMeta.pages[page];
    let currentComponent;
    for (let i=0; i<nonRootComponents.length; i++) {
      currentComponent = nonRootComponents[i];
      if (updatedImports.indexOf(currentComponent.componentType) < 0) {
        updatedImports.push(currentComponent.componentType);
      }
    }
    console.log('new imports for page:', updatedImports);
    return updatedImports;
  }

  sanitizeChildrenComponents(page) {
    const { siteMeta } = this.state;
    const rootChildrenComponents = siteMeta.pages[page].root.childrenComponents;
    const nonRootComponents = {};
    const newRootChildrenComponents = [];
    for (let i=0; i<siteMeta.pages[page].nonRootComponents.length; i++) {
      nonRootComponents[siteMeta.pages[page].nonRootComponents[i].id] = true;
    }
    if (rootChildrenComponents && rootChildrenComponents.length > 0) {
      for (let i=0; i<rootChildrenComponents.length; i++) {
        if (nonRootComponents[rootChildrenComponents[i]]) {
          newRootChildrenComponents.push(rootChildrenComponents[i]);
        }
      }
    }
    for (let i=0; i<siteMeta.pages[page].nonRootComponents.length; i++) {
      if (siteMeta.pages[page].nonRootComponents[i].childrenComponents) {
        let newCC = [];
        for (let j=0; j<siteMeta.pages[page].nonRootComponents[i].childrenComponents.length; j++) {
          if (nonRootComponents[siteMeta.pages[page].nonRootComponents[i].childrenComponents[j]]) {
            newCC.push(siteMeta.pages[page].nonRootComponents[i].childrenComponents[j]);
          }
        }
        siteMeta.pages[page].nonRootComponents[i].childrenComponents = newCC;
      }
    }
    console.log('new site meta after sanitization:', siteMeta);
    return siteMeta;
  }

  updateComponentOnPage(params) {
    const componentId = params.id;
    const componentProps = params.props;
    const { siteMeta, currentPage } = this.state;
    siteMeta.updated = Date.now();
    if (componentId === 'root') {
      // Update root
    } else {
      const { index } = getComponentObj(siteMeta, currentPage, componentId);
      siteMeta.pages[currentPage].nonRootComponents[
        index
      ].props = componentProps;
      this.updateSiteMeta(siteMeta);
    }
  }

  sendPageMetaToFrame() {
    console.log('sendPageMetaToFrame...', this.iframeRef);
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

  updateTheme(theme) {
    const { siteMeta } = this.state;
    siteMeta.updated = Date.now();
    siteMeta.theme = theme;
    this.updateSiteMeta(siteMeta);
  }

  download() {
    const { siteMeta } = this.state;
    console.log('Downloading source code...');
    import('../utils/downloadSource').then(module => {
      const downloadSource = module.default;
      downloadSource(siteMeta);
    });
  }

  render() {
    const { match } = this.props;
    const {
      currentTab,
      siteMeta,
      currentPage,
      currentComponentId
    } = this.state;
    const currentPageTitle = siteMeta
      ? siteMeta.pages[currentPage].pageTitle
      : '';
    if (siteMeta && this.initialRender) {
      this.initialRender = false;
      this.sendPageMetaToFrame();
    }
    console.log('original siteMeta=', this.props.siteMeta);
    console.log('craft id =', match.params.craftId);
    return (
      <>
        <NavbarHeader
          selected={currentTab}
          download={this.download}
          handleTabChange={this.handleTabChange}
        />
        <main className={styles.mainframe}>
          <Sidebar
            currentTab={currentTab}
            siteMeta={siteMeta}
            currentPage={currentPage}
            currentComponentId={currentComponentId}
            sendPageMetaToFrame={this.sendPageMetaToFrame}
            updateComponentOnPage={this.updateComponentOnPage}
            updateTheme={this.updateTheme}
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
