import React from 'react';
import { H6, Overlay, Button } from '@blueprintjs/core';
import { SketchPicker } from 'react-color';

class RootConfigDialog extends React.Component {
  constructor({ globalCss }) {
    super();
    this.handleBackgroundColorUpdate = this.handleBackgroundColorUpdate.bind(
      this
    );
  }
  handleBackgroundColorUpdate(color) {
    this.props.updateRootConfig({
      globalCss: {
        backgroundColor: color.hex
      }
    });
  }
  render() {
    const { globalCss = false, isOpen, onClose } = this.props;
    const backgroundColor =
      globalCss && globalCss.backgroundColor
        ? globalCss.backgroundColor
        : '#fff';
    return (
      <Overlay
        isOpen={isOpen}
        onClose={onClose}
        canEscapeKeyClose={true}
        canOutsideClickClose={true}
      >
        <div className="overlay-content root-config-dialog-content">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingBottom: '5px'
            }}
          >
            <H6>Choose a background color</H6>
            <Button
              className="dialog-close-button"
              minimal
              icon="cross"
              onClick={onClose}
            />
          </div>
          <SketchPicker
            color={backgroundColor}
            onChangeComplete={this.handleBackgroundColorUpdate}
          />
        </div>
      </Overlay>
    );
  }
}

export default RootConfigDialog;
