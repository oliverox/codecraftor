import React from 'react';

const HomePanel = ({ sendPageMetaToFrame }) => {
  return (
    <div>
      <p>Welcome</p>
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
