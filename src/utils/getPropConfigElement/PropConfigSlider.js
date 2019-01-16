import React from 'react';
import { Slider } from '@blueprintjs/core';

const PropConfigSlider = ({ styles, propObj, allProps, onPropUpdate }) => {
  const { prop } = propObj;
  const defaultValue = propObj.value;
  return (
    <div className={`${styles.container} ${styles.sliderContainer}`}>
      <div className={`${styles.label} ${styles.sliderLabel}`}>
        {propObj.label}
      </div>
      <Slider
        min={propObj.range[0]}
        max={propObj.range[1]}
        labelRenderer={value => propObj.tmpl.replace('{{value}}', value)}
        onChange={value => {
          onPropUpdate({
            prop,
            value
          });
        }}
        value={allProps[prop] ? allProps[prop] : defaultValue}
      />
    </div>
  );
};

export default PropConfigSlider;
