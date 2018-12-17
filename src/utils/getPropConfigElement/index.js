import React from 'react';
import {
  Alignment,
  EditableText,
  Switch,
  Classes,
  Slider,
  NumericInput
} from '@blueprintjs/core';

import ColorPicker from './ColorPicker';

import styles from './styles.module.css';

const getPropConfigElement = (propObj, key, onPropUpdate, allProps) => {
  const { prop, type } = propObj;
  const defaultValue = propObj.value;
  console.log('allProps=', allProps);
  console.log(
    propObj,
    'value:',
    allProps[prop] ? allProps[prop] : propObj.value
  );
  let propConfigElement;
  switch (type) {
    case 'string':
      propConfigElement = (
        <div key={key} className={styles.container}>
          <div className={styles.label}>{propObj.label}</div>
          <EditableText
            className={styles.value}
            multiline={false}
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
      break;

    case 'yesno':
      propConfigElement = (
        <div
          key={key}
          className={`${styles.container} ${styles.switchContainer}`}
        >
          <Switch
            style={{ width: '100%' }}
            alignIndicator={Alignment.RIGHT}
            defaultChecked={allProps[prop] ? allProps[prop] : defaultValue}
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
      break;

    case 'list':
      propConfigElement = (
        <div key={key} className={styles.container}>
          <span className={styles.label}>{propObj.label}</span>
          <div
            className={`${Classes.SELECT} ${Classes.MINIMAL} ${Classes.INLINE}`}
          >
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
                <option key={`${key}-${i}`} value={propObj.list[i].value}>
                  {propObj.list[i].name}
                </option>
              ))}
            </select>
          </div>
        </div>
      );
      break;

    case 'numeric':
      propConfigElement = (
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
      break;

    case 'slider':
      propConfigElement = (
        <div
          key={key}
          className={`${styles.container} ${styles.sliderContainer}`}
        >
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
      break;

    case 'color':
      propConfigElement = (
        <div key={key} className={styles.container}>
          <div className={styles.label}>{propObj.label}</div>
          <ColorPicker
            prop={prop}
            onPropUpdate={onPropUpdate}
            color={allProps[prop] ? allProps[prop] : defaultValue}
          />
        </div>
      );
      break;

    default:
      break;
  }
  return propConfigElement;
};

export default getPropConfigElement;

/* 

config = [{
    prop: 'active',
    label: 'Active',
    type: 'boolean',
    value: false,
  },
  {
    prop: 'intent',
    label: 'Intent',
    type: 'list',
    value: 'none',
    list: [{
      name: 'none',
      value: 'None'
    }, {
      name: 'primary',
      value: 'Primary'
    }, {
      name: 'success',
      value: 'Success'
    }]
  },
  {
    prop: 'collapseFrom',
    label: 'Collapse from',
    type: 'option',
    value: 'end',
    options: [{
      name: 'start',
      value: 'Start'
    }, {
      name: 'end',
      value: 'End'
    }]
  },
  {
    prop: 'width',
    label: 'Width',
    type: 'slider',
    value: 50,
    discrete: true,
    tmpl: '{{value}}%`',
    range: [0, 100]
  },
  {
    prop: 'title',
    label: 'Title',
    type: 'string',
    value: 'Boom Boom',
    placeholder: 'Type a title'
  },
  {
    prop: 'render',
    label: 'Render me on load?'
    type: 'yesno'
    value: true
  },
  {
    prop: '<some custom prop>',
    label: 'Button group',
    type: 'custom',
    value: <custom value>
  }
}]

*/
