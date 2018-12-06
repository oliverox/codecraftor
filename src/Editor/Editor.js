import React, { Component } from 'react';
import ComponentDrop from '../appComponents/ComponentDrop/ComponentDrop';
import Configurator from '../appComponents/Configurator/Configurator';

const importComponent = componentModule =>
  import(`../components/${componentModule}`);

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
    this.editorRef = React.createRef();
    this.refreshPage = this.refreshPage.bind(this);
    this.buildDomTree = this.buildDomTree.bind(this);
    this.handleMsgRcvd = this.handleMsgRcvd.bind(this);
    this.importComponents = this.importComponents.bind(this);
    this.getComponentIndex = this.getComponentIndex.bind(this);
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.getComponentAndChildren = this.getComponentAndChildren.bind(this);
  }
  componentDidMount() {
    if (process.env.NODE_ENV === 'development') {
      import('typeface-montserrat').then(() => {
        console.log('Montserrat typeface loaded');
      });
      window.addEventListener('message', this.handleMsgRcvd);
    }
    this.refreshPage();
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMsgRcvd);
  }

  refreshPage() {
    if (this.state.siteMeta.updated === -1) {
      return;
    }
    this.importComponents().then(() => {
      this.buildDomTree();
      this.setState({
        loading: false
      });
    });
  }

  getComponentIndex(componentModule) {
    const { page } = this.state;
    return this.siteMeta.pages[page].imports.indexOf(componentModule);
  }

  importComponents() {
    console.log('Importing components needed to render page...');
    this.siteMeta = this.state.siteMeta;
    const { page } = this.state;
    const componentImportArray = this.siteMeta.pages[page].imports.map(
      componentModule => {
        console.log(`>> importing ${componentModule}...`);
        return importComponent(componentModule);
      }
    );
    return Promise.all(componentImportArray).then(importedComponents => {
      const root = this.siteMeta.pages[page].root;
      const rootModuleName = root.componentModule;
      const rootIndex = this.getComponentIndex(rootModuleName);
      const { module, defaultProps } = importedComponents[rootIndex].default;
      const { children, ...props } = defaultProps;
      const newProps = Object.assign(props, JSON.parse(root.props));
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
        let componentModuleName = nonRootComponent.componentModule;
        console.log('updating component:', componentModuleName);
        let componentIndex = this.getComponentIndex(componentModuleName);
        const importedComponent = importedComponents[componentIndex];
        const { module, defaultProps } = importedComponent.default;
        const { children, ...props } = defaultProps;
        const currentProps =
          typeof nonRootComponent.props === 'string'
            ? JSON.parse(nonRootComponent.props)
            : nonRootComponent.props;
        const newProps = Object.assign(props, currentProps);
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
    const {
      Module,
      editable = true,
      props = '{}',
      childrenComponents = []
    } = this.components[id];
    let newChildrenComponents = [];
    if (childrenComponents && childrenComponents.length > 0) {
      newChildrenComponents = childrenComponents.map(childId =>
        this.getComponentAndChildren(childId)
      );
    }
    const componentToRender = (
      <Module {...props} devMode={true}>
        {newChildrenComponents.length > 0 ? newChildrenComponents : null}
      </Module>
    );
    if (editable) {
      return (
        <Configurator key={this.key++} componentId={id}>
          {componentToRender}
        </Configurator>
      );
    } else {
      return componentToRender;
    }
  }

  buildDomTree() {
    console.log('buildDomTree()...');
    this.rootComponent = this.getComponentAndChildren('root', 0);
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

  render() {
    console.log('Rendering Craft...');
    return (
      <div ref={this.editorRef}>
        {this.state.loading ? (
          'Loading...'
        ) : (
          <div>
            {this.rootComponent}
            <ComponentDrop
              page={this.siteMeta.name}
              postMessage={this.handlePostMessage}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Editor;
