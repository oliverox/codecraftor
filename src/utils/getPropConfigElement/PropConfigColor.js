import React from 'react';
import ColorPicker from './ColorPicker';

const PropConfigColor = ({ key, styles, propObj, allProps, onPropUpdate }) => {
  const { prop } = propObj;
  const defaultValue = propObj.value;
  return (
    <div key={key} className={styles.container}>
      <div className={styles.label}>{propObj.label}</div>
      <ColorPicker
        prop={prop}
        onPropUpdate={onPropUpdate}
        color={allProps[prop] ? allProps[prop] : defaultValue}
      />
    </div>
  );
};

export default PropConfigColor;
