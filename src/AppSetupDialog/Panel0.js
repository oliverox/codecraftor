import React from 'react';
import { H3, Button, Intent } from '@blueprintjs/core';

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

export default Panel0;