import React from 'react';
import { Alignment, Switch } from '@blueprintjs/core';

const PropConfigYesNo = ({ styles, propObj, allProps, onPropUpdate }) => {
  const { prop } = propObj;
  const defaultValue = propObj.value;
  return (
    <div className={`${styles.container} ${styles.switchContainer}`}>
      <Switch
        style={{ width: '100%' }}
        alignIndicator={Alignment.RIGHT}
        defaultChecked={
          typeof allProps[prop] !== 'undefined' ? allProps[prop] : defaultValue
        }
        labelElement={<span className={styles.label}>{propObj.label}</span>}
        onChange={event => {
          onPropUpdate({
            prop,
            value: event.target.checked
          });
        }}
      />
    </div>
  );
};

export default PropConfigYesNo;
