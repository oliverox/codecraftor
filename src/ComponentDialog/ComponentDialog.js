import React from 'react';
import { SpinnerOverlay } from '../components';
import {
  H4,
  H5,
  Card,
  Button,
  Overlay,
  Spinner,
  Intent
} from '@blueprintjs/core';

import './ComponentDialog.scss';

class ComponentDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      components: []
    };
    this.importReactBlueprintComponents = this.importReactBlueprintComponents.bind(
      this
    );
  }

  componentWillUpdate() {
    const { appConfig } = this.props;
    console.log('componentWillUpdate', appConfig);
    if (this.state.components.length === 0) {
      if (appConfig.webFramework === 'react') {
        switch (appConfig.uiToolkit) {
          case 'blueprint':
            this.importReactBlueprintComponents();
            break;

          default:
            break;
        }
      }
    }
  }

  importReactBlueprintComponents() {
    import('../components/react/blueprint/components').then(componentList => {
      console.log('component list=', componentList.default);
      this.setState({
        components: componentList.default
      });
    });
  }

  render() {
    const { isOpen, onClose } = this.props;
    const { components } = this.state;
    if (components.length === 0) {
      return <SpinnerOverlay isOpen={isOpen} size={Spinner.SIZE_STANDARD} />;
    } else {
      return (
        <Overlay
          isOpen={isOpen}
          onClose={onClose}
          canEscapeKeyClose={true}
          canOutsideClickClose={true}
        >
          <div className="overlay-content component-dialog-content">
            {components.length > 0 && (
              <div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingBottom: '5px'
                  }}
                >
                  <H4>Choose a component to add</H4>
                  <Button
                    className="dialog-close-button"
                    minimal
                    icon="cross"
                    onClick={onClose}
                  />
                </div>
                {components.map((c, index) => {
                  const componentMeta = {
                    index: index,
                    icon: c.icon,
                    label: c.label,
                    childText: c.childText,
                    childNodes: c.childNodes,
                    description: c.description
                  };
                  return (
                    <Card
                      key={index}
                      className="component-card"
                      interactive={true}
                      onClick={() => {
                        this.props.addComponentToTree({
                          ...componentMeta
                        });
                      }}
                    >
                      <div>
                        <H5 intent={Intent.PRIMARY}>{c.name}</H5>
                        <p>{c.description}</p>
                      </div>
                      <Button
                        minimal
                        intent={Intent.PRIMARY}
                        onClick={() => {}}
                      >
                        Add
                      </Button>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </Overlay>
      );
    }
  }
}

export default ComponentDialog;
