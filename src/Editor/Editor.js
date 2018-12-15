import React, { Component } from 'react';
import WebFontLoader from 'webfontloader';
import ComponentDrop from '../appComponents/ComponentDrop/ComponentDrop';
import ComponentWrapper from '../appComponents/ComponentWrapper/ComponentWrapper';

const importComponent = componentType =>
  import(`../components/${componentType}`);

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      page: false,
      siteMeta: { updated: -1 }
    };
    this.key = 0;
    this.siteMeta = {};
    this.components = {};
    this.refreshPage = this.refreshPage.bind(this);
    this.buildDomTree = this.buildDomTree.bind(this);
    this.handleMsgRcvd = this.handleMsgRcvd.bind(this);
    this.importComponents = this.importComponents.bind(this);
    this.getComponentIndex = this.getComponentIndex.bind(this);
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.handleComponentClick = this.handleComponentClick.bind(this);
    this.getComponentAndChildren = this.getComponentAndChildren.bind(this);
  }
  componentDidMount() {
    window.addEventListener('message', this.handleMsgRcvd);
    this.refreshPage();
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMsgRcvd);
  }

  componentDidUpdate() {
    if (this.siteMeta.theme) {
      console.log('Importing font:', this.siteMeta.theme.font);
      WebFontLoader.load({
        google: {
          families: [this.siteMeta.theme.font]
        }
      });
    }
  }

  refreshPage() {
    if (this.state.siteMeta.updated === -1) {
      return;
    }
    this.components = {};
    this.importComponents().then(() => {
      this.buildDomTree();
      this.setState({
        loading: false
      });
    });
  }

  getComponentIndex(componentType) {
    const { page } = this.state;
    return this.siteMeta.pages[page].imports.indexOf(componentType);
  }

  importComponents() {
    console.log('Importing components needed to render page...');
    this.siteMeta = this.state.siteMeta;
    const { page } = this.state;
    const componentImportArray = this.siteMeta.pages[page].imports.map(
      componentType => {
        console.log(`>> importing ${componentType}...`);
        return importComponent(componentType);
      }
    );
    return Promise.all(componentImportArray).then(importedComponents => {
      const root = this.siteMeta.pages[page].root;
      const rootModuleName = root.componentType;
      const rootIndex = this.getComponentIndex(rootModuleName);
      const { module, defaultProps } = importedComponents[rootIndex].default;
      const { children, ...props } = defaultProps;
      if (this.siteMeta.theme.colors.background) {
        // Update styling for root component
        props.style = {
          ...props.style,
          backgroundColor: this.siteMeta.theme.colors.background,
          fontFamily: this.siteMeta.theme.font
        }
      }
      const newProps = Object.assign({}, props, JSON.parse(root.props));
      const childrenComponents = root.childrenComponents;
      this.components.root = {
        Module: module,
        props: newProps,
        editable: false, // root component is not editable
        childrenComponents
      };
      const nonRootComponents = this.siteMeta.pages[page].nonRootComponents;
      for (let i = 0; i < nonRootComponents.length; i++) {
        let nonRootComponent = nonRootComponents[i];
        let componentTypeName = nonRootComponent.componentType;
        console.log('updating component:', componentTypeName);
        let componentIndex = this.getComponentIndex(componentTypeName);
        const importedComponent = importedComponents[componentIndex];
        const { module, defaultProps } = importedComponent.default;
        const { children, ...props } = defaultProps;
        const currentProps =
          typeof nonRootComponent.props === 'string'
            ? JSON.parse(nonRootComponent.props)
            : nonRootComponent.props;
        const newProps = Object.assign({}, props, currentProps);
        this.components[nonRootComponent.id] = {
          Module: module,
          props: newProps,
          editable: true,
          childrenComponents: nonRootComponent.childrenComponents
        };
      }
    });
  }

  getComponentAndChildren(id) {
    if (typeof(this.components[id]) === 'undefined') {
      return null;
    }
    const {
      Module,
      props = {},
      editable = true,
      childrenComponents = []
    } = this.components[id];
    let newChildrenComponents = [];
    if (childrenComponents && childrenComponents.length > 0) {
      newChildrenComponents = childrenComponents.map(childId =>
        this.getComponentAndChildren(childId)
      );
    }
    const componentToRender = (
      <Module {...props} theme={this.siteMeta.theme}>
        {newChildrenComponents.length > 0 ? newChildrenComponents : null}
      </Module>
    );
    if (editable) {
      return (
        <ComponentWrapper
          key={this.key++}
          componentId={id}
          page={this.state.page}
          postMessage={this.handlePostMessage}
          onComponentClick={this.handleComponentClick}
        >
          {componentToRender}
        </ComponentWrapper>
      );
    } else {
      return componentToRender;
    }
  }

  buildDomTree() {
    console.log('buildDomTree()...');
    this.rootComponent = this.getComponentAndChildren('root', 0);
    console.log('rootComponent=', this.rootComponent);
  }

  handleMsgRcvd(msg) {
    if (msg.origin !== process.env.REACT_APP_URL) {
      return;
    }
    console.log('Craft msg rcvd:', msg.data);
    const { siteMeta, page } = msg.data;
    if (siteMeta.updated !== this.state.siteMeta.updated) {
      this.setState({
        siteMeta,
        page
      });
      this.refreshPage();
    }
  }

  handlePostMessage(data) {
    window.parent.postMessage(data, '*');
  }

  handleComponentClick({ componentId, page}) {
    this.handlePostMessage({
      action: 'SELECT',
      componentId,
      page
    });
  }

  render() {
    console.log('Rendering Craft...');
    return (
      <>
        {this.state.loading ? (
          'Loading...'
        ) : (
          <>
            {this.rootComponent}
            <ComponentDrop
              page={this.siteMeta.name}
              postMessage={this.handlePostMessage}
            />
          </>
        )}
      </>
    );
  }
}

export default Editor;
