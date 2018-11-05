import React from 'react';
import { Button, Radio, RadioGroup } from "@blueprintjs/core";
import './MainFrame.scss';

class MainFrame extends React.Component {
  render() {
    const { match } = this.props;
    console.log('craft id =', match.params.craftId);
    return (
      <main className="mainframe">
        <div className="config">
          <RadioGroup
            label="Pick UI Framework"
            onChange={() => {}}
            large={true}
            selectedValue="blueprint"
          >
            <Radio value="blueprint" label="BlueprintJS" />
            <Radio value="ant" label="Ant" />
            <Radio value="material" label="Material UI" />
            <Radio value="evergreen" label="Evergreen" />
          </RadioGroup>
          <hr />
          <div
            style={{
              maxWidth: 200,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Button
              intent="primary"
              onClick={() =>
                this.handleAction('add', {
                  type: 'h1',
                  props: {},
                  children: 'This is an h1 header'
                })
              }
            >
              Add
            </Button>
            <Button intent="danger" onClick={() => this.handleAction('remove')}>
              Remove
            </Button>
            <Button
              intent="success"
              onClick={() => this.handleAction('update')}
            >
              Update
            </Button>
          </div>
        </div>

        <iframe
          src={`${process.env.REACT_APP_CRAFT_FRAME_URL}/${match.params.craftId}`}
          width={500}
          height={600}
          title="Craft Frame"
        />
      </main>
    );
  }
}

export default MainFrame;
