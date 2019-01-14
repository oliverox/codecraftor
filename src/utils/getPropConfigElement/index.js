import React from 'react';
import PropConfigString from './PropConfigString';
import PropConfigYesNo from './PropConfigYesNo';
import PropConfigDropDown from './PropConfigDropDown';
import PropConfigNumeric from './PropConfigNumeric';
import PropConfigSlider from './PropConfigSlider';
import PropConfigColor from './PropConfigColor';
import PropConfigList from './PropConfigList';

import styles from './styles.module.css';

const getPropConfigElement = ({ propObj, key, onPropUpdate, allProps }) => {
  console.log('********************************* keyIndex=', key);
  const { type } = propObj;
  switch (type) {
    case 'string':
      return (
        <PropConfigString
          key={key}
          // keyIndex={key}
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'yesno':
      return (
        <PropConfigYesNo
          key={key}
          // keyIndex={key}
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'dropdown':
      return (
        <PropConfigDropDown
          key={key}
          // keyIndex={key}
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'numeric':
      return (
        <PropConfigNumeric
          key={key}
          // keyIndex={key}
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'slider':
      return (
        <PropConfigSlider
          key={key}
          // keyIndex={key}
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'color':
      return (
        <PropConfigColor
          key={key}
          // keyIndex={key}
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    case 'list':
      return (
        <PropConfigList
          key={key}
          // keyIndex={key}
          propObj={propObj}
          onPropUpdate={onPropUpdate}
          allProps={allProps}
          styles={styles}
        />
      );

    default:
      break;
  }
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
    type: 'dropdown',
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
  },
  {
    prop: 'menuLinks',
    label: 'Footer Menu links',
    type: 'list',
    schema: [
      {
        prop: 'menu',
        label: 'Menu',
        type: 'string'
      }, 
      {
        prop: 'linkTo',
        label: 'Link To',
        type: 'string'
      }
    ],
    value: [
      {
        menu: 'Home',
        linkTo: '/'
      },
      {
        menu: 'Contact us',
        linkTo: '/contact'
      },
      {
        menu: 'FAQ',
        linkTo: '/faq'
      }
    ]
  },
  {
    prop: 'teamList',
    label: 'List of team members',
    type: 'list',
    schema: [
      {
        prop: 'name',
        label: 'Full Name',
        type: 'string'
      }, 
      {
        prop: 'dept',
        label: 'Department',
        type: 'string'
      }, 
      {
        prop: 'role',
        label: 'Role',
        type: 'string'
      }, 
      {
        prop: 'photoUrl',
        label: 'Photo url',
        type: 'string'
      }
    ],
    value: [
      {
        name: 'Sam Smith',
        dept: 'Music',
        role: 'Singer',
        photoUrl: 'http://...'
      }
    ]
  }

}]

*/
