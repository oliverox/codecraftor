import React from 'react';
import { Icon } from '@blueprintjs/core';
import ComponentDrop from '../ComponentDrop/ComponentDrop';

import styles from './ComponentWrapper.module.css';

const ICONS_TOP = 20;

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
    const { pageIndex, componentId, onComponentClick } = this.props;
    console.log('You clicked on component id:', componentId, pageIndex);
    onComponentClick({ componentId, pageIndex });
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
    const moduleRef = this.moduleRef.current;
    const moduleWidth = moduleRef.offsetWidth;
    const moduleHeight = moduleRef.offsetHeight;
    const moduleTop = moduleRef.offsetTop;
    let offsetIconsTop = -ICONS_TOP;
    if (moduleTop < ICONS_TOP) {
      offsetIconsTop = offsetIconsTop + (ICONS_TOP + 2 - moduleTop);
    }
    return {
      width: moduleWidth - 2,
      height: moduleHeight,
      offsetIconsTop,
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
    const { pageIndex, componentId, postMessage } = this.props;
    postMessage({
      pageIndex,
      componentId,
      action: 'DELETE'
    });
  }

  render() {
    const { children, postMessage, pageIndex, componentId } = this.props;
    const { isMouseOver, scoot } = this.state;
    const elementCn = `${styles.actionsContainer} ${
      isMouseOver ? styles.show : ''
    }`;
    const {
      offsetIconsTop,
      ...editButtonOffset
    } = this.getEditButtonPosition();
    return (
      <div>
        <div
          className={`${styles.componentDrop} ${!scoot ? styles.hidden : ''}`}
        >
          <ComponentDrop
            inline={true}
            pageIndex={pageIndex}
            postMessage={postMessage}
            insertBeforeId={componentId}
            dropText="Drop a component here"
          />
        </div>
        <div
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          onMouseOut={this.handleMouseOut}
          className={styles.configurator}
          ref={this.moduleRef}
        >
          <div className={elementCn} style={editButtonOffset}>
            <div
              className={styles.iconContainer}
              style={{ top: offsetIconsTop }}
            >
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
