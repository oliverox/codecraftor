import React, { Component } from 'react';
import ComponentDrop from '../appComponents/ComponentDrop/ComponentDrop';

const getComponent = componentModule =>
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
        return getComponent(componentModule);
      }
    );
    return Promise.all(componentImportArray).then(importedComponents => {
      let index = this.getComponentIndex(
        this.siteMeta.pages[page].root.componentModule
      );
      this.components.root = {
        Module: importedComponents[index].default,
        props: this.siteMeta.pages[page].root.props,
        children: this.siteMeta.pages[page].root.children
      };
      for (let i = 0; i < this.siteMeta.pages[page].components.length; i++) {
        console.log(
          'updating component:',
          this.siteMeta.pages[page].components[i].componentModule
        );
        const { id, props = null, children = [] } = this.siteMeta.pages[
          page
        ].components[i];
        const componentIndex = this.getComponentIndex(
          this.siteMeta.pages[page].components[i].componentModule
        );
        this.components[id] = {
          Module: importedComponents[componentIndex].default,
          props,
          children
        };
      }
    });
  }

  getComponentAndChildren(id) {
    const { Module, props = '{}', children = [] } = this.components[id];
    let childrenComponents = [];
    if (children && children.length > 0) {
      childrenComponents = children.map(childId =>
        this.getComponentAndChildren(childId)
      );
    }
    return (
      <Module key={this.key++} {...JSON.parse(props)} devMode={true}>
        {childrenComponents.length > 0 ? childrenComponents : null}
      </Module>
    );
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
