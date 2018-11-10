import React from 'react';
import firebase from 'firebase/app';
import shortid from 'shortid';
import {
  Alignment,
  Button,
  Classes,
  Icon,
  Navbar,
  NavbarDivider,
  NavbarGroup,
  NavbarHeading,
  Tree
} from '@blueprintjs/core';

import AppConfigDialog from '../AppConfigDialog/AppConfigDialog';
import ComponentDialog from '../ComponentDialog/ComponentDialog';
import './MainFrame.scss';

class MainFrame extends React.Component {
  constructor() {
    super();
    this.state = {
      pageName: 'Home page',
      appConfig: true,
      showComponentDialog: false,
      nodes: [
        {
          id: 0,
          hasCaret: true,
          icon: 'slash',
          label: 'Root',
          isExpanded: true,
          // secondaryLabel: <Icon icon="cog" />
          childNodes: [
            {
              id: 1,
              icon: 'code-block',
              label: 'Navigation Bar 1'
            },
            {
              id: 2,
              icon: 'code-block',
              label: 'Hero Slider 1'
            }
          ]
        }
      ]
    };
    this.handleAction = this.handleAction.bind(this);
    this.getNodeAtPath = this.getNodeAtPath.bind(this);
    this.onAppConfigDone = this.onAppConfigDone.bind(this);
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleNodeExpand = this.handleNodeExpand.bind(this);
    this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
    this.handleAddComponentClick = this.handleAddComponentClick.bind(this);
    this.handleComponentDialogClose = this.handleComponentDialogClose.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    this.docRef = db
      .collection(process.env.REACT_APP_CRAFTS_COLLECTION)
      .doc(match.params.craftId);
  }

  handleAddComponentClick() {
    this.setState({
      showComponentDialog: true
    });
  }

  handleComponentDialogClose() {
    this.setState({
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
              id: shortid.generate(),
              action: 'ADD',
              ...params
            })
          })
          .catch(err => {
            console.log('Error updating document.', err);
          });
        break;

      default:
        break;
    }
  }

  getNodeAtPath(nodePath) {
    // const nodesClone = this.state.nodes.slice();
    // let pointer = nodesClone[nodePath[0]];
    // console.log('pointer:', pointer);
    // for (let n = 1; n < nodePath.length; n++) {
    //   pointer = pointer[nodePath[n]];
    //   console.log('pointer:', pointer);
    // }
    // return pointer;
  }

  handleNodeClick(node, nodePath, e) {
    console.log('handleNodeClick', node, nodePath);
    console.log('getNodeAtPath returns:', this.getNodeAtPath(nodePath));
  }

  handleNodeExpand(node, nodePath, e) {
    console.log('handleNodeExpand', node, nodePath);
    console.log('getNodeAtPath returns:', this.getNodeAtPath(nodePath));
  }

  handleNodeCollapse(node, nodePath, e) {
    console.log('handleNodeCollapse', node, nodePath);
    console.log('getNodeAtPath returns:', this.getNodeAtPath(nodePath));
  }

  onAppConfigDone(appConfig) {
    console.log('onAppConfigDone()', appConfig);
    this.setState({
      appConfig
    });
  }

  render() {
    const { match } = this.props;
    const { pageName, appConfig, showComponentDialog } = this.state;
    console.log('craft id =', match.params.craftId);
    console.log('appConfig=', appConfig);
    console.log('showComponentDialog:', showComponentDialog);
    return (
      <React.Fragment>
        <header className="app-header">
          <Navbar>
            <NavbarGroup align={Alignment.LEFT}>
              <NavbarHeading className="navbar-heading">
                Codecraftor
              </NavbarHeading>
              <NavbarDivider />
              <Button
                onClick={this.handleAddComponentClick}
                className={Classes.MINIMAL}
                icon="add"
                text="Add Component"
              />
              <Button
                disabled
                className={Classes.MINIMAL}
                icon="download"
                text="Download"
              />
            </NavbarGroup>
          </Navbar>
        </header>

        <main className="mainframe">
          {/* App config and component tree */}
          <div className="config">
            <h3 className="page-name">
              {pageName}{' '}
              <Icon className="edit-icon" iconSize={10} icon="edit" />
            </h3>
            <div className="tree-container">
              <Tree
                contents={this.state.nodes}
                onNodeClick={this.handleNodeClick}
                onNodeCollapse={this.handleNodeCollapse}
                onNodeExpand={this.handleNodeExpand}
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
          />
        </main>
      </React.Fragment>
    );
  }
}

export default MainFrame;
