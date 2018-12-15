import React from 'react';
import { H6, Divider, HTMLSelect } from '@blueprintjs/core';
import { TwitterPicker } from 'react-color';

import styles from './Themes.module.css';

class ThemesPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentColor: '#FFF',
      colorPickerFor: '',
      showColorPicker: false,
      positionClassName: false
    };
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  toggleColorPicker(colorFor) {
    const { theme } = this.props;
    const { colorPickerFor } = this.state;
    let positionClassName = false;
    let showColorPicker = true;
    let currentColor;

    switch (colorFor) {
      case 'BACKGROUND':
        positionClassName = styles.posBackground;
        currentColor = theme.colors.background;
        break;

      case 'PRIMARY':
        positionClassName = styles.posPrimary;
        currentColor = theme.colors.primary;
        break;

      case 'SECONDARY':
        positionClassName = styles.posSecondary;
        currentColor = theme.colors.secondary;
        break;

      case 'TERTIARY':
        positionClassName = styles.posTertiary;
        currentColor = theme.colors.tertiary;
        break;

      case 'QUATERNARY':
        positionClassName = styles.posQuaternary;
        currentColor = theme.colors.quaternary;
        break;

      case 'LIGHT':
        positionClassName = styles.posLightFont;
        currentColor = theme.colors.light;
        break;

      case 'DARK':
        positionClassName = styles.posDarkFont;
        currentColor = theme.colors.dark;
        break;

      default:
        break;
    }
    if (colorPickerFor === colorFor && this.state.showColorPicker) {
      showColorPicker = false;
    }

    this.setState({
      currentColor,
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
    this.setState({
      currentColor: color
    });
    updateTheme(newTheme);
  }

  render() {
    const { theme } = this.props;
    const { currentColor, showColorPicker, positionClassName } = this.state;
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
          color={currentColor}
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
