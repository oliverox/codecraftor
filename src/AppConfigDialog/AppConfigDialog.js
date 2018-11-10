import React from 'react';
import { Overlay, PanelStack } from '@blueprintjs/core';

import Panel0 from './Panel0';
import Panel1 from './Panel1';
import Panel2 from './Panel2';
import Panel3 from './Panel3';

import './AppConfigDialog.scss';

class AppConfigDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      webFramework: 'react',
      uiToolkit: 'blueprint',
      pageLayout: 'fullWidth'
    };
    this.getPanel = this.getPanel.bind(this);
    this.getValue = this.getValue.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleAppConfigDone = this.handleAppConfigDone.bind(this);
  }

  getValue(config) {
    return this.state[`${config}`];
  }

  getPanel = id => {
    switch (id) {
      case 0:
        return {
          component: Panel0,
          title: 'Welcome',
          props: {
            nextPanel: this.getPanel(1)
          }
        };
      case 1:
        return {
          component: Panel1,
          title: 'Web Framework',
          props: {
            getValue: this.getValue,
            onChange: this.handleUpdate,
            nextPanel: this.getPanel(2)
          }
        };
      case 2:
        return {
          component: Panel2,
          title: 'UI Toolkit',
          props: {
            getValue: this.getValue,
            onChange: this.handleUpdate,
            nextPanel: this.getPanel(3)
          }
        };
      case 3:
        return {
          component: Panel3,
          title: 'Page Layout',
          props: {
            getValue: this.getValue,
            onChange: this.handleUpdate,
            handleAppConfigDone: this.handleAppConfigDone
          }
        };
      default:
        break;
    }
  };

  handleUpdate({ config, value }) {
    console.log('handleUpdate()', config, value);
    this.setState({
      [`${config}`]: value
    });
  }

  handleAppConfigDone() {
    console.log('handleAppConfigDone()');
    window.scrollTo(0, 0);
    this.props.onAppConfigDone({
      ...this.state
    });
  }

  removeFromPanelStack() {
    console.log('removeFromPanelStack()');
  }

  render() {
    const { isOpen } = this.props;
    return (
      <Overlay isOpen={isOpen}>
        <div className="overlay-content">
          <PanelStack
            className="panel-stack"
            initialPanel={this.getPanel(0)}
            onClose={this.removeFromPanelStack}
          />
        </div>
      </Overlay>
    );
  }
}

export default AppConfigDialog;
