import React from 'react';
import firebase from 'firebase/app';
import shortid from 'shortid';
import {
  // Classes,
  Icon,
  // ITreeNode,
  // Position,
  // Tooltip,
  Tree
} from '@blueprintjs/core';
import AppSetupDialog from '../AppSetupDialog/AppSetupDialog';
import './MainFrame.scss';

class MainFrame extends React.Component {
  constructor() {
    super();
    this.state = {
      pageName: 'Home page',
      appSetup: true,
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
    this.handleNodeClick = this.handleNodeClick.bind(this);
    this.handleNodeExpand = this.handleNodeExpand.bind(this);
    this.handleNodeCollapse = this.handleNodeCollapse.bind(this);
  }

  componentWillMount() {
    const { match } = this.props;
    const db = firebase.firestore();
    db.settings({ timestampsInSnapshots: true });
    this.docRef = db
      .collection(process.env.REACT_APP_CRAFTS_COLLECTION)
      .doc(match.params.craftId);
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

  render() {
    const { match } = this.props;
    const { pageName, appSetup } = this.state;
    console.log('craft id =', match.params.craftId);
    console.log('appSetup=', appSetup);
    return (
      <main className="mainframe">
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
              // className={Classes.ELEVATION_0}
            />
          </div>
        </div>
        {/* 
          <RadioGroup
            label="Pick UI Framework"
            onChange={() => {}}
            large={true}
            selectedValue="blueprint"
          >
            <Radio value="blueprint" label="BlueprintJS" />
            <Radio value="ant" label="Ant" />
            <Radio value="material" label="Material UI" />
            <Radio value="evergreen" label="Evergreen" />
          </RadioGroup>
          <hr />
          <div
            style={{
              maxWidth: 200,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Button
              intent="primary"
              onClick={() =>
                this.handleAction('ADD', {
                  type: 'h1',
                  props: {},
                  children: 'This is an h1 header'
                })
              }
            >
              Add
            </Button>
            <Button intent="danger" onClick={() => this.handleAction('remove')}>
              Remove
            </Button>
            <Button
              intent="success"
              onClick={() => this.handleAction('update')}
            >
              Update
            </Button>
          </div>
          <hr />
          <h4>Components</h4>
          <Button
            intent="none"
            onClick={() =>
              this.handleAction('ADD', {
                component: 'Button',
                target: 'body'
              })
            }
          >
            Add Button
          </Button>*/}

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
        <AppSetupDialog isOpen={appSetup} />
      </main>
    );
  }
}

export default MainFrame;
