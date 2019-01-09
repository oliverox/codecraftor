import React, { Component } from 'react';
import WebFontLoader from 'webfontloader';
import ComponentDrop from '../appComponents/ComponentDrop/ComponentDrop';
import ComponentWrapper from '../appComponents/ComponentWrapper/ComponentWrapper';

class Editor extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      page: false,
      siteMeta: { updated: -1 },
      components: {
        block: [],
        base: []
      }
    };
    this.key = 0;
    this.components = {};
    this.refreshPage = this.refreshPage.bind(this);
    this.buildDomTree = this.buildDomTree.bind(this);
    this.handleMsgRcvd = this.handleMsgRcvd.bind(this);
    this.getComponentIndex = this.getComponentIndex.bind(this);
    this.handlePostMessage = this.handlePostMessage.bind(this);
    this.handleComponentClick = this.handleComponentClick.bind(this);
    this.getComponentAndChildren = this.getComponentAndChildren.bind(this);
  }
  componentDidMount() {
    window.addEventListener('message', this.handleMsgRcvd);
    this.handlePostMessage({ action: 'READY' }); // inform parent frame that Editor is ready
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.handleMsgRcvd);
  }

  componentDidUpdate() {
    const { theme } = this.state.siteMeta;
    if (theme) {
      console.log('Importing font:', theme.font.family);
      WebFontLoader.load({
        google: {
          families: theme.font.family
        }
      });
    }
  }

  extractComponentConfigs(components) {
    const componentConfigs = [];
    Object.keys(components).forEach(name => {
      if (components[name].config) {
        componentConfigs.push(components[name].config);
      }
    });
    this.handlePostMessage({
      action: 'UPDATE_COMPONENT_LIST',
      componentConfigs
    });
  }

  importComponentsFromTemplate = async template => {
    switch (template) {
      case 'pioneer':
        return import('@codecraftor/pioneer/dist/main');

      default:
        break;
    }
  };

  async refreshPage() {
    const { page, siteMeta } = this.state;
    if (siteMeta === false || siteMeta.updated === -1) {
      return;
    }
    this.components = {};
    await this.importComponentsFromTemplate(siteMeta.template).then(
      componentList => {
        console.log('#####', componentList);
        this.extractComponentConfigs(componentList.default.block);
        const rootComponent = siteMeta.pages[page].root;
        const rootModuleName = rootComponent.componentType;
        const { module } = componentList.default.block[rootModuleName];
        let props = {
          backgroundColor: siteMeta.theme.colors.background,
          fontFamily: siteMeta.theme.font.family[0],
          fontSize: siteMeta.theme.font.size
        };
        const childrenComponents = rootComponent.childrenComponents;
        this.components.root = {
          Module: module,
          props,
          editable: false, // root component is not editable
          childrenComponents
        };
        const nonRootComponents = siteMeta.pages[page].nonRootComponents;
        for (let i = 0; i < nonRootComponents.length; i++) {
          let nonRootComponent = nonRootComponents[i];
          let componentTypeName = nonRootComponent.componentType;
          console.log('updating component:', componentTypeName);
          const { module } = componentList.default.block[componentTypeName];
          const currentProps =
            nonRootComponent.props === 'string'
              ? JSON.parse(nonRootComponent.props)
              : nonRootComponent.props;
          this.components[nonRootComponent.id] = {
            Module: module,
            props: currentProps,
            editable: true,
            childrenComponents: nonRootComponent.childrenComponents
          };
        }
      }
    );
    this.buildDomTree();
    this.setState({
      loading: false
    });
  }

  getComponentIndex(componentType) {
    const { page, siteMeta } = this.state;
    debugger;
    return siteMeta.pages[page].imports.indexOf(componentType);
  }

  getComponentAndChildren(id) {
    if (typeof this.components[id] === 'undefined') {
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
      <Module {...props} theme={this.state.siteMeta.theme}>
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
    this.rootComponent = this.getComponentAndChildren('root');
    console.log('rootComponent=', this.rootComponent);
  }

  handleMsgRcvd(msg) {
    console.log(msg.origin, process.env.REACT_APP_URL);
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

  handleComponentClick({ componentId, page }) {
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
              page={this.state.siteMeta.name}
              postMessage={this.handlePostMessage}
            />
          </>
        )}
      </>
    );
  }
}

export default Editor;
