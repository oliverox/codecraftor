import React from 'react';
import { H6, Divider, HTMLSelect } from '@blueprintjs/core';
import { TwitterPicker } from 'react-color';

import styles from './Themes.module.css';

class ThemesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      colorPickerFor: '',
      showColorPicker: false,
      positionClassName: false
    };
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  toggleColorPicker(colorFor) {
    const { colorPickerFor } = this.state;
    let positionClassName = false;
    let showColorPicker = true;

    switch (colorFor) {
      case 'BACKGROUND':
        positionClassName = styles.posBackground;
        break;

      case 'PRIMARY':
        positionClassName = styles.posPrimary;
        break;

      case 'SECONDARY':
        positionClassName = styles.posSecondary;
        break;

      case 'TERTIARY':
        positionClassName = styles.posTertiary;
        break;

      case 'QUATERNARY':
        positionClassName = styles.posQuaternary;
        break;

      case 'LIGHT':
        positionClassName = styles.posLightFont;
        break;

      case 'DARK':
        positionClassName = styles.posDarkFont;
        break;

      default:
        break;
    }
    if (colorPickerFor === colorFor && this.state.showColorPicker) {
      showColorPicker = false;
    }

    this.setState({
      showColorPicker,
      positionClassName,
      colorPickerFor: colorFor
    });
  }

  handleColorChange(color) {
    const { theme, updateTheme } = this.props;
    const { colorPickerFor } = this.state;
    const colors = theme.colors;
    colors[colorPickerFor.toLowerCase()] = color.hex;
    const newTheme = Object.assign({}, theme, { colors });
    updateTheme(newTheme);
  }

  render() {
    const { theme } = this.props;
    const { showColorPicker, positionClassName } = this.state;
    let colorPickerClassName = `${styles.colorPicker}`;
    if (showColorPicker) {
      colorPickerClassName = `${colorPickerClassName} ${positionClassName}`;
    } else {
      colorPickerClassName = `${colorPickerClassName} ${styles.hidden}`;
    }
    return (
      <div>
        <H6>Color scheme</H6>
        <Divider />
        <TwitterPicker
          triangle="top-right"
          className={colorPickerClassName}
          onChangeComplete={this.handleColorChange}
        />
        <div className={styles.colorContainer}>
          <span>Background</span>
          <div
            className={styles.color}
            onClick={() => this.toggleColorPicker('BACKGROUND')}
            style={{
              backgroundColor: theme.colors.background
            }}
          />
        </div>
        <div className={styles.colorContainer}>
          <span>Primary</span>
          <div
            className={styles.color}
            onClick={() => this.toggleColorPicker('PRIMARY')}
            style={{
              backgroundColor: theme.colors.primary
            }}
          />
        </div>
        <div className={styles.colorContainer}>
          <span>Secondary</span>
          <div
            className={styles.color}
            onClick={() => this.toggleColorPicker('SECONDARY')}
            style={{
              backgroundColor: theme.colors.secondary
            }}
          />
        </div>
        <div className={styles.colorContainer}>
          <span>Tertiary</span>
          <div
            className={styles.color}
            onClick={() => this.toggleColorPicker('TERTIARY')}
            style={{
              backgroundColor: theme.colors.tertiary
            }}
          />
        </div>
        <div className={styles.colorContainer}>
          <span>Quaternary</span>
          <div
            className={styles.color}
            onClick={() => this.toggleColorPicker('QUATERNARY')}
            style={{
              backgroundColor: theme.colors.quaternary
            }}
          />
        </div>
        <div className={styles.colorContainer}>
          <span>Light font color</span>
          <div
            className={styles.color}
            onClick={() => this.toggleColorPicker('LIGHT')}
            style={{
              backgroundColor: theme.colors.light
            }}
          />
        </div>
        <div className={styles.colorContainer}>
          <span>Dark font color</span>
          <div
            className={styles.color}
            onClick={() => this.toggleColorPicker('DARK')}
            style={{
              backgroundColor: theme.colors.dark
            }}
          />
        </div>
        <div className={styles.colorContainer}>
          <span>Font</span>
          <HTMLSelect minimal className={styles.fontSelector}>
            <option>Times New Roman</option>
            <option>Montserrat</option>
          </HTMLSelect>
        </div>
      </div>
    );
  }
}

export default ThemesPanel;
