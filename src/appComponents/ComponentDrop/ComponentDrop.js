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
    const { target, page, postMessage } = this.props;
    const componentModule = e.dataTransfer.getData('componentModule');
    postMessage({
      componentModule,
      target,
      page
    });
    this.setState({
      isDragOver: false
    });
  }

  handleOnDragOver(e) {
    e.stopPropagation();
    e.preventDefault();
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
    const { dropText } = this.props;
    const { isDragOver } = this.state;
    let cn = styles.dropContainer;
    if (this.state.isDragOver) {
      cn = `${cn} ${styles.isDragOver}`;
    }
    return (
      <div>
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
      </div>
    );
  }
}

export default ComponentDrop;

ComponentDrop.defaultProps = {
  target: 'root',
  page: 'index',
  dropText: 'Drag & Drop Component Here'
};