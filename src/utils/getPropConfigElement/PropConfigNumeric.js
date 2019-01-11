import React from 'react';
import { NumericInput } from '@blueprintjs/core';

const PropConfigNumeric = ({
  key,
  styles,
  propObj,
  allProps,
  onPropUpdate
}) => {
  const { prop } = propObj;
  const defaultValue = propObj.value;
  return (
    <div key={key} className={styles.container}>
      <div className={styles.label}>{propObj.label}</div>
      <div className={styles.numericContainer}>
        <NumericInput
          min={propObj.min}
          max={propObj.max}
          allowNumericCharactersOnly={true}
          placeholder="Type a number"
          fill={true}
          value={allProps[prop] ? allProps[prop] : defaultValue}
          onValueChange={value => {
            onPropUpdate({
              prop,
              value
            });
          }}
        />
      </div>
    </div>
  );
};

export default PropConfigNumeric;
