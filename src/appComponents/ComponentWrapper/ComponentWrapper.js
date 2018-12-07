import React from 'react';
import { Icon } from '@blueprintjs/core';

import styles from './ComponentWrapper.module.css';

class ComponentWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMouseOver: false
    };
    this.moduleRef = React.createRef();
    this.handleClick = this.handleClick.bind(this);
    this.handleMouseOut = this.handleMouseOut.bind(this);
    this.handleMouseOver = this.handleMouseOver.bind(this);
    this.getEditButtonPosition = this.getEditButtonPosition.bind(this);
  }

  handleClick(event) {
    event.stopPropagation();
    event.preventDefault();
    const { page, componentId, onComponentClick } = this.props;
    console.log('You clicked on component id:', componentId, page);
    onComponentClick({componentId, page});

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

  render() {
    const { children } = this.props;
    const { isMouseOver } = this.state;
    const cn = `${styles.editContainer} ${isMouseOver ? styles.show : ''}`;
    const editButtonOffset = this.getEditButtonPosition();
    return (
      <div
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
        className={styles.configurator}
        ref={this.moduleRef}
      >
        <div className={cn} style={editButtonOffset}>
          <Icon className={styles.editIcon} icon="edit" />
        </div>
        {children}
      </div>
    );
  }
}

export default ComponentWrapper;