import React from 'react';
import firebase from 'firebase/app';
import shortid from 'shortid';
import { Icon } from '@blueprintjs/core';
import NavbarHeader from '../NavbarHeader/NavbarHeader';
import AppConfigDialog from '../AppConfigDialog/AppConfigDialog';
import ComponentDialog from '../ComponentDialog/ComponentDialog';
import RootConfigDialog from '../RootConfigDialog/RootConfigDialog';
import ComponentTree from '../ComponentTree/ComponentTree';

import './MainFrame.scss';

class MainFrame extends React.Component {
  constructor() {
    super();
    this.state = {
      pageName: 'Home page',
      appConfig: true,
      showRootConfigDialog: false,
      showComponentDialog: false,
      root: [
        {
          id: 0,
          hasCaret: true,
          icon: 'slash',
          label: 'Root',
          isExpanded: true,
          childNodes: []
          // secondaryLabel: <Icon icon="cog" />
        }
      ]
    };
    this.handleAction = this.handleAction.bind(this);
    this.onAppConfigDone = this.onAppConfigDone.bind(this);
    this.handleAddComponentBtnClick = this.handleAddComponentBtnClick.bind(
      this
    );
    this.handleComponentDialogClose = this.handleComponentDialogClose.bind(
      this
    );
    this.addComponentToTree = this.addComponentToTree.bind(this);
    this.showRootConfigDialog = this.showRootConfigDialog.bind(this);
    this.handleRootConfigDialogClose = this.handleRootConfigDialogClose.bind(
      this
    );
    this.updateRootConfig = this.updateRootConfig.bind(this);
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
        const { actions, config } = doc.data();
        if (actions.length > 0) {
          const newRoot = this.state.root.slice();
          const updatedChildNodes = [];
          actions
            .filter(act => act.action === 'ADD')
            .forEach(act => {
              updatedChildNodes.push({
                id: act.id,
                hasCaret: false,
                icon: act.icon,
                label: act.label,
                isExpanded: false
              });
            });
          newRoot[0].childNodes = updatedChildNodes;
          this.setState({
            root: newRoot,
            appConfig: config
          });
        }
      }
    });
  }

  handleAddComponentBtnClick() {
    this.setState({
      showComponentDialog: true
    });
  }

  handleComponentDialogClose() {
    this.setState({
      showComponentDialog: false
    });
  }

  addComponentToTree(componentMeta) {
    console.log('addComponentToTree()', componentMeta);
    const root = this.state.root.slice()[0];
    root.childNodes.push({
      ...componentMeta,
      id: root.childNodes.length
    });
    this.handleAction('ADD', componentMeta);
    this.setState({
      root: [root]
    });
  }

  handleAction(cmd, params) {
    console.log('MainFrame - handleAction', cmd, params);
    switch (cmd) {
      case 'ADD':
        this.docRef
          .update({
            actions: firebase.firestore.FieldValue.arrayUnion({
              id: shortid.generate(),
              action: cmd,
              ...params
            })
          })
          .catch(err => {
            console.log('Error updating document.', err);
          });
        break;

      case 'CONFIG':
        this.docRef
          .update({
            actions: firebase.firestore.FieldValue.arrayUnion({
              id: shortid.generate(),
              action: cmd,
              ...params
            }),
            config: { ...params }
          })
          .catch(err => {
            console.log('Error updating document.', err);
          });
        break;
      default:
        break;
    }
  }

  onAppConfigDone(appConfig) {
    console.log('onAppConfigDone()', appConfig);
    this.setState({
      appConfig
    });
    this.handleAction('CONFIG', {
      ...appConfig
    });
  }

  showRootConfigDialog() {
    this.setState({
      showRootConfigDialog: true
    });
  }

  handleRootConfigDialogClose() {
    this.setState({
      showRootConfigDialog: false
    });
  }

  updateRootConfig(rootConfig) {
    const newAppConfig = Object.assign(this.state.appConfig, rootConfig);
    this.setState({
      appConfig: newAppConfig
    });
    this.handleAction('CONFIG', {
      ...newAppConfig
    });
  }

  render() {
    const { match } = this.props;
    const {
      pageName,
      appConfig,
      showRootConfigDialog,
      showComponentDialog
    } = this.state;
    console.log('craft id =', match.params.craftId);
    console.log('appConfig=', appConfig);
    console.log('showComponentDialog:', showComponentDialog);
    return (
      <React.Fragment>
        <NavbarHeader
          handleAddComponentBtnClick={this.handleAddComponentBtnClick}
        />
        <main className="mainframe">
          {/* App config and component tree */}
          <div className="config">
            <h3 className="page-name">
              {pageName}{' '}
              <Icon className="edit-icon" iconSize={10} icon="edit" />
            </h3>
            <div className="tree-container">
              <ComponentTree
                root={this.state.root}
                showRootConfigDialog={this.showRootConfigDialog}
              />
            </div>
          </div>

          {/* Iframe */}
          <div className="iframe-container">
            <div className="iframe-browser-header">
              <div className="iframe-browser-button" />
              <div className="iframe-browser-button" />
              <div className="iframe-browser-button" />
            </div>
            <iframe
              src={`${process.env.REACT_APP_CRAFT_FRAME_URL}/${
                match.params.craftId
              }`}
              width="100%"
              height="90%"
              title="Craft Frame"
            />
          </div>

          {/* App config */}
          <AppConfigDialog
            isOpen={appConfig === true}
            onAppConfigDone={this.onAppConfigDone}
          />

          {/* Component Dialog */}
          <ComponentDialog
            isOpen={showComponentDialog}
            appConfig={appConfig}
            onClose={this.handleComponentDialogClose}
            addComponentToTree={this.addComponentToTree}
          />

          {/* Root Config Dialog */}
          <RootConfigDialog
            globalCss={this.state.appConfig.globalCss}
            isOpen={showRootConfigDialog}
            onClose={this.handleRootConfigDialogClose}
            updateRootConfig={this.updateRootConfig}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default MainFrame;
