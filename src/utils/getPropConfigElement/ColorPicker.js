import React from 'react';
import { ChromePicker } from 'react-color';

import styles from './ColorPicker.module.css';

class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showColorPicker: false
    };
    this.toggleColorPicker = this.toggleColorPicker.bind(this);
  }

  toggleColorPicker() {
    this.setState({
      showColorPicker: !this.state.showColorPicker
    });
  }

  render() {
    const { prop, color, onPropUpdate } = this.props;
    const { showColorPicker } = this.state;
    console.log('colorpicker COLOR:', color, showColorPicker);
    return (
      <div>
        <div
          className={styles.currentBackgroundColor}
          onClick={this.toggleColorPicker}
          style={{
            backgroundColor: color
          }}
        />
        {showColorPicker ? (
          <div className={styles.colorPicker}>
            <ChromePicker
              color={color}
              onChangeComplete={result => {
                let value;
                this.setState({
                  showColorPicker: false
                });
                if (result.rgb.a < 1) {
                  const { r, g, b ,a } = result.rgb;
                  value = `rgba(${r}, ${g}, ${b}, ${a})`;
                } else {
                  value = result.hex;
                }
                console.log('color value=', value);
                onPropUpdate({
                  prop,
                  value
                });
              }}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

ColorPicker.defaultProps = {
  color: 'transparent'
};

export default ColorPicker;
