import React from 'react';
import { Button, Intent, Radio, RadioGroup } from '@blueprintjs/core';

class Panel3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.getValue('pageLayout')
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
        config: 'layout',
        value
      });
    }
  }

  render() {
    // Layout
    return (
      <div className="panel-container">
        <div className="panel-content">
          {' '}
          <RadioGroup
            label="Choose a page layout"
            onChange={this.handleUpdate}
            selectedValue={this.state.value}
          >
            <Radio label="Full width" value="fullWidth" />
            <Radio disabled label="Boxed" value="boxed" />
            <Radio disabled label="Fixed sidebar" value="fixedSideBar" />
          </RadioGroup>
        </div>
        <div className="action-button-container">
          <Button
            large
            intent={Intent.SUCCESS}
            onClick={this.props.handleAppConfigDone}
          >
            Done
          </Button>
        </div>
      </div>
    );
  }
}

export default Panel3;
