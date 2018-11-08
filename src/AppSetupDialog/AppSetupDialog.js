import React from 'react';
import {
  H3,
  Intent,
  Overlay,
  RadioGroup,
  Radio,
  Button,
  PanelStack
} from '@blueprintjs/core';

import './AppSetupDialog.scss';

const Panel0 = ({ openPanel, nextPanel }) => {
  // Welcome panel
  return (
    <div className="panel-container">
      <div className="panel-content">
        <H3>Welcome to Codecraftor</H3>
        <p style={{ lineHeight: '24px' }}>
          Craft your new site, web app or dashboard without writing any code.
          Pick your UI framework, customize your components, build your app
          visually and deploy your app online or download the whole source code
          already customized to your taste.
        </p>
      </div>
      <div className="action-button-container">
        <Button
          large
          intent={Intent.PRIMARY}
          onClick={() => {
            openPanel(nextPanel);
          }}
        >
          Cool! Let's go.
        </Button>
      </div>
    </div>
  );
};

const Panel1 = ({ openPanel, onChange, nextPanel }) => {
  // Web Framework
  return (
    <div className="panel-container">
      <div className="panel-content">
        {' '}
        <RadioGroup
          label="Choose a web framework"
          onChange={onChange}
          selectedValue="react"
        >
          <Radio label="React" value="react" />
          <Radio disabled label="Angular" value="angular" />
          <Radio disabled label="Vue" value="vue" />
        </RadioGroup>
      </div>
      <div className="action-button-container">
        <Button
          large
          intent={Intent.PRIMARY}
          onClick={() => {
            openPanel(nextPanel);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Panel2 = ({ openPanel, onChange, nextPanel }) => {
  // UI Toolkit
  return (
    <div className="panel-container">
      <div className="panel-content">
        {' '}
        <RadioGroup
          label="Choose a UI toolkit"
          onChange={onChange}
          selectedValue="blueprint"
        >
          <Radio label="BlueprintJS" value="blueprint" />
          <Radio disabled label="Material UI" value="material" />
          <Radio disabled label="Ant" value="ant" />
          <Radio disabled label="Evergreen" value="evergreen" />
        </RadioGroup>
      </div>
      <div className="action-button-container">
        <Button
          large
          intent={Intent.PRIMARY}
          onClick={() => {
            openPanel(nextPanel);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

const Panel3 = ({ onChange }) => {
  // Layout
  return (
    <div className="panel-container">
      <div className="panel-content">
        {' '}
        <RadioGroup
          label="Choose a page layout"
          onChange={onChange}
          selectedValue="fw"
        >
          <Radio label="Full width" value="fw" />
          <Radio disabled label="Boxed" value="boxed" />
          <Radio disabled label="Fixed sidebar" value="fs" />
        </RadioGroup>
      </div>
      <div className="action-button-container">
        <Button large intent={Intent.SUCCESS}>
          Done
        </Button>
      </div>
    </div>
  );
};

class SetupDialog extends React.Component {
  constructor() {
    super();
    this.getPanel = this.getPanel.bind(this);
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
            onChange: this.onOptionUpdate,
            nextPanel: this.getPanel(2)
          }
        };
      case 2:
        return {
          component: Panel2,
          title: 'UI Toolkit',
          props: {
            onChange: this.onOptionUpdate,
            nextPanel: this.getPanel(3)
          }
        };
      case 3:
        return {
          component: Panel3,
          title: 'Page Layout',
          props: {
            onChange: this.onOptionUpdate
          }
        };
      default:
        break;
    }
  };

  onOptionUpdate() {
    console.log('onOptionUpdate()');
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

export default SetupDialog;
