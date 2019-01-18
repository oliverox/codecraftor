import React from 'react';
import shortid from 'shortid';
import firebase from 'firebase/app';
import { FocusStyleManager } from '@blueprintjs/core';

import NavbarHeader from '../appComponents/NavbarHeader/NavbarHeader';
import Sidebar from '../appComponents/Sidebar/Sidebar';
import Iframe from '../appComponents/Iframe/Iframe';
import PreviewWindow from '../appComponents/PreviewWindow/PreviewWindow';
import { Default } from '../templates';
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
      publishUrl: false,
      currentTab: 'home',
      currentPageIndex: 0,
      componentList: false,
      publishInProgress: false,
      currentComponentId: false,
      isPublishPopoverOpen: false
    };
    this.newPageMeta = {};
    this.iframeRef = false;
    this.initialRender = true;
    this.publish = this.publish.bind(this);
    this.download = this.download.bind(this);
    this.updateSite = this.updateSite.bind(this);
    this.updateTheme = this.updateTheme.bind(this);
    this.setIframeRef = this.setIframeRef.bind(this);
    this.handleNewPage = this.handleNewPage.bind(this);
    this.handleMsgRcvd = this.handleMsgRcvd.bind(this);
    this.updateSiteMeta = this.updateSiteMeta.bind(this);
    this.handleTabChange = this.handleTabChange.bind(this);
    this.handleRemovePage = this.handleRemovePage.bind(this);
    this.getImportsForPage = this.getImportsForPage.bind(this);
    this.updateComponentList = this.updateComponentList.bind(this);
    this.sendPageMetaToFrame = this.sendPageMetaToFrame.bind(this);
    this.appendComponentToPage = this.appendComponentToPage.bind(this);
    this.updateComponentOnPage = this.updateComponentOnPage.bind(this);
    this.deleteComponentOnPage = this.deleteComponentOnPage.bind(this);
    this.insertComponentInPage = this.insertComponentInPage.bind(this);
    this.updateCurrentPageIndex = this.updateCurrentPageIndex.bind(this);
    this.sanitizeChildrenComponents = this.sanitizeChildrenComponents.bind(
      this
    );
  }

  componentDidMount() {
    const { match } = this.props;
    const db = firebase.firestore();
    let defaultTmpl = Default;
    db.settings({ timestampsInSnapshots: true });
    this.docRef = db
      .collection(process.env.REACT_APP_CRAFTS_COLLECTION)
      .doc(match.params.craftId);
    this.docRef.get().then(doc => {
      console.log('will check if doc exists in firestore...');
      if (doc.exists) {
        console.log('doc exists in firestore');
        const { siteMeta, newPageMeta } = doc.data();
        // Manually add 'transparent' color to the theme
        siteMeta.theme.colors.transparent = 'transparent';
        this.newPageMeta = newPageMeta;
        this.setState({
          siteMeta
        });
      } else {
        console.log(
          'doc does not exist in firestore => create a new defaultTmpl'
        );
        // Manually add 'transparent' color to the theme
        defaultTmpl.theme.colors.transparent = 'transparent';
        this.newPageMeta = defaultTmpl.newPageMeta;
        this.setState({
          siteMeta: defaultTmpl.siteMeta
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
        currentPageIndex: data.pageIndex,
        currentTab: 'configurator'
      });
    } else if (data && data.action === 'DELETE') {
      console.log('Delete component:', data.componentId);
      this.deleteComponentOnPage(data);
    } else if (data && data.action === 'INSERT') {
      this.updateSite('INSERT', data);
    } else if (data && data.action === 'READY') {
      this.sendPageMetaToFrame();
    } else if (data && data.action === 'UPDATE_COMPONENT_LIST') {
      this.updateComponentList(data.componentConfigs);
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

  updateSiteMeta(siteMeta, newPageIndex) {
    this.setState({
      siteMeta
    });
    this.docRef.update({
      siteMeta
    });
    if (typeof newPageIndex !== 'undefined') {
      this.updateCurrentPageIndex(newPageIndex);
    }
  }

  updateComponentList(componentList) {
    if (!this.state.componentList) {
      console.log('Updating component list with:', componentList);
      this.setState({
        componentList
      });
    }
  }

  handleNewPage() {
    const { siteMeta } = this.state;
    const newPageMeta = JSON.parse(JSON.stringify(this.newPageMeta));
    siteMeta.pages.push(newPageMeta); // make a new copy of newPageMeta
    const lastPageIndex = siteMeta.pages.length - 1;
    this.updateSiteMeta(siteMeta, lastPageIndex);
  }

  handleRemovePage(pageIndex) {
    const { siteMeta } = this.state;
    if (siteMeta.pages.length < 2) {
      return;
    }
    if (pageIndex < 0 || pageIndex > siteMeta.pages.length - 1) {
      return;
    }
    siteMeta.pages.splice(pageIndex, 1);
    const gotoPageIndex =
      pageIndex >= siteMeta.pages.length ? siteMeta.pages.length - 1 : 0;
    this.updateSiteMeta(siteMeta, gotoPageIndex);
  }

  updateCurrentPageIndex(pageIndex) {
    const { siteMeta } = this.state;
    const updatedSiteMeta = {
      ...siteMeta,
      updated: Date.now()
    };
    if (pageIndex < siteMeta.pages.length) {
      this.setState({
        siteMeta: updatedSiteMeta,
        currentPageIndex: pageIndex
      });
    } else {
      // TODO: report error trying to set invalid page index
    }
  }

  appendComponentToPage(params) {
    const { pageIndex, target, componentType } = params;
    const { siteMeta } = this.state;
    const id = shortid.generate();
    const newComponent = { id, componentType };
    siteMeta.updated = Date.now();
    if (target === 'root') {
      if (siteMeta.pages[pageIndex].imports.indexOf(componentType) < 0) {
        siteMeta.pages[pageIndex].imports.push(componentType);
      }
      siteMeta.pages[pageIndex].root.childrenComponents.push(id);
      siteMeta.pages[pageIndex].nonRootComponents.push(newComponent);
    }
    console.log('updated siteMeta=', siteMeta);
    this.updateSiteMeta(siteMeta);
  }

  insertComponentInPage(params) {
    const { pageIndex, target, componentType, insertBeforeId } = params;
    const { siteMeta } = this.state;
    const id = shortid.generate();
    const newComponent = { id, componentType };
    siteMeta.updated = Date.now();
    if (target === 'root') {
      if (siteMeta.pages[pageIndex].imports.indexOf(componentType) < 0) {
        siteMeta.pages[pageIndex].imports.push(componentType);
      }
      const newCC = [];
      for (
        let i = 0;
        i < siteMeta.pages[pageIndex].root.childrenComponents.length;
        i++
      ) {
        if (
          siteMeta.pages[pageIndex].root.childrenComponents[i] ===
          insertBeforeId
        ) {
          newCC.push(id, insertBeforeId);
        } else {
          newCC.push(siteMeta.pages[pageIndex].root.childrenComponents[i]);
        }
      }
      siteMeta.pages[pageIndex].root.childrenComponents = newCC;
      siteMeta.pages[pageIndex].nonRootComponents.push(newComponent);
    }
    console.log('updated siteMeta=', siteMeta);
    this.updateSiteMeta(siteMeta);
  }

  deleteComponentOnPage(params) {
    const { pageIndex, componentId } = params;
    const { siteMeta } = this.state;
    const nonRootComponents = siteMeta.pages[
      pageIndex
    ].nonRootComponents.slice();
    let componentIndexToRemove = -1;
    for (let i = 0; i < nonRootComponents.length; i++) {
      if (nonRootComponents[i].id === componentId) {
        componentIndexToRemove = i;
        break;
      }
    }
    if (componentIndexToRemove >= 0) {
      nonRootComponents.splice(componentIndexToRemove, 1);
    }
    siteMeta.updated = Date.now();
    siteMeta.pages[pageIndex].nonRootComponents = nonRootComponents;
    console.log('updated siteMeta=', siteMeta);
    siteMeta.pages[pageIndex].imports = this.getImportsForPage(pageIndex);
    const newSiteMeta = this.sanitizeChildrenComponents(pageIndex);
    this.updateSiteMeta(newSiteMeta);
  }

  getImportsForPage(pageIndex) {
    const updatedImports = ['RootContainer'];
    const { siteMeta } = this.state;
    const { nonRootComponents } = siteMeta.pages[pageIndex];
    let currentComponent;
    for (let i = 0; i < nonRootComponents.length; i++) {
      currentComponent = nonRootComponents[i];
      if (updatedImports.indexOf(currentComponent.componentType) < 0) {
        updatedImports.push(currentComponent.componentType);
      }
    }
    console.log('new imports for page:', updatedImports);
    return updatedImports;
  }

  sanitizeChildrenComponents(pageIndex) {
    const { siteMeta } = this.state;
    const rootChildrenComponents =
      siteMeta.pages[pageIndex].root.childrenComponents;
    const nonRootComponents = {};
    const newRootChildrenComponents = [];
    for (
      let i = 0;
      i < siteMeta.pages[pageIndex].nonRootComponents.length;
      i++
    ) {
      nonRootComponents[
        siteMeta.pages[pageIndex].nonRootComponents[i].id
      ] = true;
    }
    if (rootChildrenComponents && rootChildrenComponents.length > 0) {
      for (let i = 0; i < rootChildrenComponents.length; i++) {
        if (nonRootComponents[rootChildrenComponents[i]]) {
          newRootChildrenComponents.push(rootChildrenComponents[i]);
        }
      }
    }
    for (
      let i = 0;
      i < siteMeta.pages[pageIndex].nonRootComponents.length;
      i++
    ) {
      if (siteMeta.pages[pageIndex].nonRootComponents[i].childrenComponents) {
        let newCC = [];
        for (
          let j = 0;
          j <
          siteMeta.pages[pageIndex].nonRootComponents[i].childrenComponents
            .length;
          j++
        ) {
          if (
            nonRootComponents[
              siteMeta.pages[pageIndex].nonRootComponents[i].childrenComponents[
                j
              ]
            ]
          ) {
            newCC.push(
              siteMeta.pages[pageIndex].nonRootComponents[i].childrenComponents[
                j
              ]
            );
          }
        }
        siteMeta.pages[pageIndex].nonRootComponents[
          i
        ].childrenComponents = newCC;
      }
    }
    console.log('new site meta after sanitization:', siteMeta);
    return siteMeta;
  }

  updateComponentOnPage(params) {
    const componentId = params.id;
    const componentProps = params.props;
    const { siteMeta, currentPageIndex } = this.state;
    siteMeta.updated = Date.now();
    if (componentId === 'root') {
      // Update root
    } else {
      const componentObj = getComponentObj(
        siteMeta,
        currentPageIndex,
        componentId
      );
      if (!componentId) {
        return;
      }
      const { index } = componentObj;
      siteMeta.pages[currentPageIndex].nonRootComponents[
        index
      ].props = componentProps;
      this.updateSiteMeta(siteMeta);
    }
  }

  sendPageMetaToFrame() {
    console.log('sending PageMeta To Frame...', this.state.siteMeta);
    if (this.iframeRef) {
      this.iframeRef.contentWindow.postMessage(
        {
          pageIndex: this.state.currentPageIndex,
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

  publish() {
    const { isPublishPopoverOpen } = this.state;
    if (isPublishPopoverOpen) {
      // close popover
      this.setState({
        isPublishPopoverOpen: false
      });
    } else {
      this.setState({
        isPublishPopoverOpen: true,
        publishInProgress: true
      });
      import('../utils/publishApp').then(module => {
        const publishApp = module.default;
        publishApp().then(vm => {
          this.setState({
            publishInProgress: false,
            publishUrl: vm.preview.origin
          });
          vm = null;
        });
      });
    }
  }

  render() {
    const { match } = this.props;
    const {
      siteMeta,
      currentTab,
      publishUrl,
      currentPageIndex,
      publishInProgress,
      currentComponentId,
      isPublishPopoverOpen
    } = this.state;
    const currentPageTitle =
      siteMeta && siteMeta.pages[currentPageIndex]
        ? siteMeta.pages[currentPageIndex].pageTitle
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
          publish={this.publish}
          download={this.download}
          publishUrl={publishUrl}
          handleTabChange={this.handleTabChange}
          publishInProgress={publishInProgress}
          isPublishPopoverOpen={isPublishPopoverOpen}
        />
        <main className={styles.mainframe}>
          <Sidebar
            siteMeta={siteMeta}
            currentTab={currentTab}
            updateTheme={this.updateTheme}
            currentPageIndex={currentPageIndex}
            currentComponentId={currentComponentId}
            componentList={this.state.componentList}
            handleNewPage={this.handleNewPage}
            handleRemovePage={this.handleRemovePage}
            sendPageMetaToFrame={this.sendPageMetaToFrame}
            updateComponentOnPage={this.updateComponentOnPage}
            updateCurrentPageIndex={this.updateCurrentPageIndex}
          />
          <Iframe
            craftId={match.params.craftId}
            setIframeRef={this.setIframeRef}
            currentPageTitle={currentPageTitle}
          />
          <PreviewWindow />
        </main>
      </>
    );
  }
}

export default MainFrame;
