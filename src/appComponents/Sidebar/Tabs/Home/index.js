import React from 'react';
import { H5 } from '@blueprintjs/core';

const HomePanel = ({ sendPageMetaToFrame }) => {
  return (
    <div>
      <H5>Welcome to Codecraftor!</H5>
      <p style={{ lineHeight: '23px' }}>
        Feel free to poke around, but keep in mind that this is a product still
        under active development. Apologies for any issues you might encounter.
      </p>
      {/* <button
        onClick={() => {
          sendPageMetaToFrame();
        }}
      >
        Send page meta to frame
      </button> */}
    </div>
  );
};

export default HomePanel;
