import React from 'react';
import { Classes } from '@blueprintjs/core';

const PropConfigDropDown = ({ styles, propObj, allProps, onPropUpdate }) => {
  const { prop } = propObj;
  const defaultValue = propObj.value;
  return (
    <div className={styles.container}>
      <span className={styles.label}>{propObj.label}</span>
      <div className={`${Classes.SELECT} ${Classes.MINIMAL} ${Classes.INLINE}`}>
        <select
          className={`${styles.value} ${styles.selectContainer}`}
          defaultValue={allProps[prop] ? allProps[prop] : defaultValue}
          onChange={event => {
            onPropUpdate({
              prop,
              value: event.target.value
            });
          }}
        >
          {propObj.list.map((item, i) => (
            <option key={`option-${i}`} value={propObj.list[i].value}>
              {propObj.list[i].name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default PropConfigDropDown;
