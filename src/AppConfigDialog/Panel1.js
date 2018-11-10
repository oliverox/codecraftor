import React from 'react';
import { Button, Intent, Radio, RadioGroup } from '@blueprintjs/core';

class Panel1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.getValue('webFramework')
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
        config: 'webFramework',
        value
      });
    }
  }

  render() {
    const { openPanel, nextPanel } = this.props;
    // Web Framework
    return (
      <div className="panel-container">
        <div className="panel-content">
          {' '}
          <RadioGroup
            label="Choose a web framework"
            onChange={this.handleUpdate}
            selectedValue={this.state.value}
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
  }
}

export default Panel1;
