import React from 'react';
import { Button, Intent, Radio, RadioGroup } from '@blueprintjs/core';

class Panel2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.getValue('uiToolkit')
    };
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleUpdate(e) {
    const value = e.target.value;
    if (value !== this.state.value) {
      this.setState({
        value
      });
      this.props.onChange({
        config: 'uiToolkit',
        value
      });
    }
  }

  render() {
    // UI Toolkit
    const { openPanel, nextPanel } = this.props;
    return (
      <div className="panel-container">
        <div className="panel-content">
          {' '}
          <RadioGroup
            label="Choose a UI toolkit"
            onChange={this.handleUpdate}
            selectedValue={this.state.value}
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
  }
}

export default Panel2;