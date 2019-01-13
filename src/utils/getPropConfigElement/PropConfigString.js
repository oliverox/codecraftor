import React from 'react';
import { EditableText } from '@blueprintjs/core';

const PropConfigString = ({
  styles,
  propObj,
  allProps,
  onPropUpdate
}) => {
  const { prop } = propObj;
  const defaultValue = propObj.value;
  return (
    <div className={styles.container}>
      <div className={styles.label}>{propObj.label}</div>
      <EditableText
        className={`${styles.value} ${styles.editableText}`}
        multiline={propObj.multiline || false}
        maxLines={10}
        placeholder={propObj.placeholder}
        selectAllOnFocus={true}
        confirmOnEnterKey={true}
        defaultValue={allProps[prop] ? allProps[prop] : defaultValue}
        onConfirm={value => {
          onPropUpdate({
            prop,
            value
          });
        }}
      />
    </div>
  );
};

export default PropConfigString;
