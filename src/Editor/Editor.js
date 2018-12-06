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
      let index = this.getComponentIndex(
        this.siteMeta.pages[page].root.componentModule
      );
      this.components.root = {
        Module: importedComponents[index].default,
        props: this.siteMeta.pages[page].root.props,
        children: this.siteMeta.pages[page].root.children,
        editable: this.siteMeta.pages[page].root.editable,
      };
      for (let i = 0; i < this.siteMeta.pages[page].components.length; i++) {
        console.log(
          'updating component:',
          this.siteMeta.pages[page].components[i].componentModule
        );
        const { id, editable = true, props = null, children = [] } = this.siteMeta.pages[
          page
        ].components[i];
        const componentIndex = this.getComponentIndex(
          this.siteMeta.pages[page].components[i].componentModule
        );
        this.components[id] = {
          Module: importedComponents[componentIndex].default,
          props,
          children,
          editable
        };
      }
    });
  }

  getComponentAndChildren(id) {
    const {
      Module,
      editable = true,
      props = '{}',
      children = []
    } = this.components[id];
    let childrenComponents = [];
    if (children && children.length > 0) {
      childrenComponents = children.map(childId =>
        this.getComponentAndChildren(childId)
      );
    }
    console.log('id, editable=', id, editable);
    const componentToRender = (
      <Module {...JSON.parse(props)} devMode={true}>
        {childrenComponents.length > 0 ? childrenComponents : null}
      </Module>
    );
    if (editable) {
      return <Configurator key={this.key++}>{componentToRender}</Configurator>;
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
