import React from 'react';
import { H6 } from '@blueprintjs/core';

const HomePanel = ({ sendPageMetaToFrame }) => {
  return (
    <div>
      <H6>Welcome to Codecraftor!</H6>
      <button
        onClick={() => {
          sendPageMetaToFrame();
        }}
      >
        Send page meta to frame
      </button>
    </div>
  );
};

export default HomePanel;
