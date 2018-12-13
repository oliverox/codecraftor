import React from 'react';
import { Icon } from '@blueprintjs/core';
import ComponentDrop from '../ComponentDrop/ComponentDrop';

import styles from './ComponentWrapper.module.css';

class ComponentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false,
      scoot: false
    };
    this.moduleRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.removeComponent = this.removeComponent.bind(this);
    this.showDropComponent = this.showDropComponent.bind(this);
    this.hideDropComponent = this.hideDropComponent.bind(this);
    this.getEditButtonPosition = this.getEditButtonPosition.bind(this);
  }

  handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    const { page, componentId, onComponentClick } = this.props;
    console.log('You clicked on component id:', componentId, page);
    onComponentClick({ componentId, page });
  }

  handleMouseOver(event) {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      isMouseOver: true
    });
  }

  handleMouseOut() {
    this.setState({
      isMouseOver: false
    });
  }

  getEditButtonPosition() {
    if (!this.moduleRef.current) {
      return {
        marginLeft: 0,
        marginTop: 0
      };
    }
    const moduleWidth = this.moduleRef.current.offsetWidth;
    const moduleHeight = this.moduleRef.current.offsetHeight;
    // console.log('moduleWidth, moduleHeight=', moduleWidth, moduleHeight);
    return {
      width: moduleWidth,
      height: moduleHeight,
      marginLeft: 0,
      marginTop: 0
    };
  }

  showDropComponent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      scoot: true
    });
  }

  hideDropComponent(event) {
    event.preventDefault();
    event.stopPropagation();
    this.setState({
      scoot: false
    });
  }

  removeComponent(event) {
    event.preventDefault();
    event.stopPropagation();
    const { page, componentId, postMessage } = this.props;
    postMessage({
      page,
      componentId,
      action: 'DELETE'
    });
  }

  render() {
    const { children, postMessage } = this.props;
    const { isMouseOver, scoot } = this.state;
    const elementCn = `${styles.actionsContainer} ${
      isMouseOver ? styles.show : ''
    }`;
    const wrapperCn = `${scoot ? styles.scoot : ''}`;
    const editButtonOffset = this.getEditButtonPosition();
    return (
      <div>
        <div
          className={`${styles.componentDrop} ${!scoot ? styles.hidden : ''}`}
        >
          <ComponentDrop
            inline={true}
            postMessage={postMessage}
            dropText="Drop a component here"
          />
        </div>
        <div
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          className={`${styles.configurator} ${wrapperCn}`}
          ref={this.moduleRef}
        >
          <div className={elementCn} style={editButtonOffset}>
            <div className={styles.iconContainer}>
              <Icon
                className={`${styles.icon} ${styles.editIcon}`}
                icon="edit"
              />
              {scoot ? (
                <Icon
                  onClick={this.hideDropComponent}
                  className={`${styles.icon} ${styles.insertIcon}`}
                  icon="minus"
                />
              ) : (
                <Icon
                  onClick={this.showDropComponent}
                  className={`${styles.icon} ${styles.insertIcon}`}
                  icon="plus"
                />
              )}
              <Icon
                onClick={this.removeComponent}
                className={`${styles.icon} ${styles.trashIcon}`}
                icon="trash"
              />
            </div>
          </div>
          {children}
        </div>
      </div>
    );
  }
}

export default ComponentWrapper;
