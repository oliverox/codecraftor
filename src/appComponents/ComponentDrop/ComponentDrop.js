import React from 'react';
import { Icon } from '@blueprintjs/core';

import styles from './ComponentDrop.module.css';

class ComponentDrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDragOver: false
    };
    this.componentDropRef = React.createRef();
    this.handleDrop = this.handleDrop.bind(this);
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragLeave = this.handleOnDragLeave.bind(this);
  }

  componentDidMount() {}

  handleDrop(e) {
    const { target, pageIndex, postMessage, insertBeforeId } = this.props;
    let action = 'APPEND';
    if (insertBeforeId) {
      action = 'INSERT';
    }
    const componentType = e.dataTransfer.getData('componentType');
    postMessage({
      componentType,
      insertBeforeId,
      action,
      target,
      pageIndex
    });
    this.setState({
      isDragOver: false
    });
  }

  handleOnDragOver(event) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleOnDragEnter() {
    this.setState({
      isDragOver: true
    });
  }

  handleOnDragLeave() {
    this.setState({
      isDragOver: false
    });
  }

  render() {
    const { dropText, inline } = this.props;
    const { isDragOver } = this.state;
    let cn = styles.dropContainer;
    if (this.state.isDragOver) {
      cn = `${cn} ${styles.isDragOver}`;
    }
    if (inline) {
      cn = `${cn} ${styles.inline}`;
    }
    return (
      <div
        ref={this.componentDropRef}
        className={cn}
        onDrop={this.handleDrop}
        onDragOver={this.handleOnDragOver}
        onDragEnter={this.handleOnDragEnter}
        onDragLeave={this.handleOnDragLeave}
      >
        {isDragOver ? (
          <Icon iconSize={25} className={styles.dropIcon} icon="import" />
        ) : (
          dropText
        )}
      </div>
    );
  }
}

export default ComponentDrop;

ComponentDrop.defaultProps = {
  pageIndex: 0,
  inline: false,
  target: 'root',
  insertBeforeId: false,
  dropText: 'Drag & Drop Component Here'
};
