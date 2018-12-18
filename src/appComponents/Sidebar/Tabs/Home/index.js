import React from 'react';
import { H5 } from '@blueprintjs/core';

const HomePanel = ({ sendPageMetaToFrame }) => {
  return (
    <div>
      <H5>Hello!</H5>
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
