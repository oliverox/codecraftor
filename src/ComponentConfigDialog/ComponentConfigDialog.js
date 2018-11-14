import React from 'react';
import { Button, Overlay, InputGroup, Label, Intent } from '@blueprintjs/core';

import './ComponentConfigDialog.scss';

class ComponentConfigDialog extends React.Component {
  constructor(props) {
    super();
    this.state = {};
    this.handleUpdateConfig = this.handleUpdateConfig.bind(this);
    this.handlePropUpdate = this.handlePropUpdate.bind(this);
  }

  handlePropUpdate(e) {
    this.setState({
      [e.target.getAttribute('propname')]: {
        value: e.target.value
      }
    });
  }

  handleUpdateConfig() {
    const { componentToConfigure } = this.props;
    console.log(componentToConfigure);
    this.props.handleUpdateComponentConfig(this.state);
  }

  render() {
    const { isOpen, onClose, componentToConfigure = false } = this.props;
    console.log('this.state:', this.state);
    console.log(
      'ComponentConfigDialog - componentToConfigure:',
      componentToConfigure
    );
    if (!componentToConfigure) {
      return null;
    }
    const { props } = componentToConfigure;
    const propsArr = [];
    Object.keys(props).forEach(key => {
      if (props[key].type === 'string') {
        propsArr.push(
          <Label key={propsArr.length} className="comp-config-prop-label">
            {key === 'children' ? 'Value' : key}
            <InputGroup
              large
              propname={key}
              placeholder={props[key].value || props[key].default}
              onChange={this.handlePropUpdate}
            />
          </Label>
        );
      }
      // Add more props update here...
    });
    return (
      <Overlay
        isOpen={isOpen}
        onClose={onClose}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
      >
        <div className="overlay-content">
          {propsArr}
          <div className="comp-config-action-btn-container">
            <Button className="btn-with-margin" onClick={this.props.onClose}>
              Cancel
            </Button>
            <Button intent={Intent.PRIMARY} onClick={this.handleUpdateConfig}>
              OK
            </Button>
          </div>
        </div>
      </Overlay>
    );
  }
}

export default ComponentConfigDialog;
