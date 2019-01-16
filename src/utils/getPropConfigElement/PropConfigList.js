import React from 'react';
import { Divider, EditableText, Icon } from '@blueprintjs/core';

const PropConfigList = ({ styles, propObj, allProps, onPropUpdate }) => {
  const { prop, label, schema, value } = propObj;
  let listItems = [];
  const actualValue = allProps[prop] ? allProps[prop] : value;

  const onUpdate = (key, schemaItem, prop, newItemValue) => {
    let newPropValue = actualValue;
    newPropValue[key][schemaItem.prop] = newItemValue;
    console.log('onPropUpdate:', prop, newPropValue);
    onPropUpdate({
      prop,
      value: newPropValue
    });
  };

  const onAddRowClick = () => {
    const newPropValue = [
      ...actualValue,
      {
        label: 'New Menu',
        goto: '#'
      }
    ];
    console.log('onAddRowClick:', prop, newPropValue);
    onPropUpdate({
      prop,
      value: newPropValue
    });
  };

  listItems = actualValue.map((item, keyOne) => {
    return (
      <div key={`valueRow-${keyOne}`} className={styles.valueRow}>
        {schema.map((schemaItem, keyTwo) => {
          return (
            <div key={`listRowItem-${keyOne}-${keyTwo}`} className={styles.row}>
              <div className={styles.schemaItemLabel}>{schemaItem.label}</div>
              <EditableText
                className={`${styles.value} ${styles.editableText} ${
                  styles.rowValue
                }`}
                // placeholder={propObj.placeholder}
                selectAllOnFocus={true}
                confirmOnEnterKey={true}
                defaultValue={item[schemaItem.prop]}
                onConfirm={value => onUpdate(keyOne, schemaItem, prop, value)}
              />
            </div>
          );
        })}
      </div>
    );
  });
  return (
    <div className={`${styles.container} ${styles.containerList}`}>
      <div className={styles.listHeader}>
        <span className={`${styles.label} ${styles.listHeaderLabel}`}>
          {label}
        </span>
        <Icon
          onClick={onAddRowClick}
          icon="plus"
          className={styles.plusMinus}
        />
      </div>
      <Divider />
      {listItems}
    </div>
  );
};

export default PropConfigList;
