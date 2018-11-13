import React from 'react';
import firebase from 'firebase/app';
import shortid from 'shortid';
import { Icon } from '@blueprintjs/core';
import NavbarHeader from '../NavbarHeader/NavbarHeader';
import AppConfigDialog from '../AppConfigDialog/AppConfigDialog';
import ComponentDialog from '../ComponentDialog/ComponentDialog';
import RootConfigDialog from '../RootConfigDialog/RootConfigDialog';
import ComponentTree from '../ComponentTree/ComponentTree';
import ComponentConfigDialog from '../ComponentConfigDialog/ComponentConfigDialog';

import './MainFrame.scss';

class MainFrame extends React.Component {
  constructor() {
    super();
    this.state = {
      pageName: 'Home page',
      appConfig: true,
      componentToConfigure: false,
      showRootConfigDialog: false,
      showComponentConfigDialog: false,
      showComponentDialog: false,
      root: [
        {
          id: 0,
          hasCaret: true,
          icon: 'slash',
          label: 'Root',
          isExpanded: true,
          childNodes: []
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
    this.showComponentConfigDialog = this.showComponentConfigDialog.bind(this);
    this.handleComponentConfigDialogClose = this.handleComponentConfigDialogClose.bind(
      this
    );
    this.handleUpdateComponentConfig = this.handleUpdateComponentConfig.bind(
      this
    );
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
              const { action, ...others } = act;
              updatedChildNodes.push({ ...others });
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
    const { component, ...meta } = componentMeta;
    const root = this.state.root.slice()[0];
    meta.id = shortid.generate();
    root.childNodes.push({
      ...meta
    });
    this.handleAction('ADD', meta);
    this.setState({
      root: [root],
      showComponentDialog: false
    });
  }

  handleAction(cmd, params) {
    console.log('MainFrame - handleAction', cmd, params);
    switch (cmd) {
      case 'ADD':
        this.docRef
          .update({
            actions: firebase.firestore.FieldValue.arrayUnion({
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

      case 'UPDATE':
        this.docRef.get().then(doc => {
          const actions = doc.data().actions;
          let actionIndex;
          const act = actions.filter((entry, index) => {
            actionIndex = index;
            return (
              entry.action === 'ADD' &&
              entry.id === this.state.componentToConfigure.id
            );
          });
          if (act.length > 0) {
            let updatedAction = act[0];
            updatedAction.props = { ...updatedAction.props, ...params.props };
            actions[actionIndex] = updatedAction;
            this.docRef
              .update({
                actions
              })
              .catch(err => {
                console.log('Error updating document.', err);
              });
          }
          this.setState({
            componentToConfigure: false
          });
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

  showComponentConfigDialog(c) {
    this.setState({
      componentToConfigure: c,
      showComponentConfigDialog: true
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
    this.handleAction('CONFIG', {
      ...newAppConfig
    });
    this.setState({
      appConfig: newAppConfig
    });
  }

  handleUpdateComponentConfig(componentConfig) {
    console.log('MainFrame: handleUpdateComponentConfig()', componentConfig);
    if (Object.keys(componentConfig).length > 0) {
      this.handleAction('UPDATE', {
        id: this.state.componentToConfigure.id,
        props: {
          ...componentConfig
        }
      });
    }
    this.handleComponentConfigDialogClose();
  }

  handleComponentConfigDialogClose() {
    this.setState({
      showComponentConfigDialog: false
    });
  }

  render() {
    const { match } = this.props;
    const {
      pageName,
      appConfig,
      componentToConfigure,
      showComponentConfigDialog,
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

            {/* Component Tree */}
            <div className="tree-container">
              <ComponentTree
                root={this.state.root}
                appConfig={this.state.appConfig}
                showRootConfigDialog={this.showRootConfigDialog}
                showComponentConfigDialog={this.showComponentConfigDialog}
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

          {/* Component config dialog */}
          <ComponentConfigDialog
            isOpen={showComponentConfigDialog}
            componentToConfigure={componentToConfigure}
            handleUpdateComponentConfig={this.handleUpdateComponentConfig}
            onClose={this.handleComponentConfigDialogClose}
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
