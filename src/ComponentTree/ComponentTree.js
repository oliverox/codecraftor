import React from 'react';
import { Tree } from '@blueprintjs/core';

import './ComponentTree.scss';

class ComponentTree extends React.Component {
  constructor(props) {
    super();
    this.handleNodeClick = this.handleNodeClick.bind(this);
  }

  handleNodeClick(node, nodePath) {
    console.log('handleNodeClick()', node, nodePath);
    if (nodePath.length === 1 && nodePath[0] === 0) {
      // Root component clicked, therefore configure global CSS
      this.props.showRootConfigDialog();
    }
  }

  handleNodeCollapse(node, nodePath) {
    console.log('handleNodeCollapse()', node, nodePath);
  }

  handleNodeExpand(node, nodePath) {
    console.log('handleNodeExpand()', node, nodePath);
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

  render() {
    const { root } = this.props;
    return (
      <div>
        <Tree
          contents={root}
          onNodeClick={this.handleNodeClick}
          onNodeCollapse={this.handleNodeCollapse}
          onNodeExpand={this.handleNodeExpand}
        />
      </div>
    );
  }
}

export default ComponentTree;
