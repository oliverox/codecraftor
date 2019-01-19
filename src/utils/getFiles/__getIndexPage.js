export default siteMeta => {
  const pageMeta = siteMeta.pages[0];

  const getComponentMeta = id => {
    let componentMeta = false;
    const { nonRootComponents } = pageMeta;
    for (let i = 0; i < nonRootComponents.length; i++) {
      if (nonRootComponents[i].id === id) {
        componentMeta = nonRootComponents[i];
        break;
      }
    }
    return componentMeta;
  };

  const getPropsStr = props => {
    let propsStr = ' theme={theme}';
    const propsObj = typeof props === 'string' ? JSON.parse(props) : props;
    const keys = Object.keys(propsObj);
    keys.forEach(key => {
      const value = propsObj[key];
      propsStr += ` ${key}=${
        typeof value === 'string' ? `"${value}"` : `{${value}}`
      }`;
    });
    return propsStr;
  };

  const composeNonRootComponentsStr = () => {
    let outputStr = '';
    let componentMeta;
    pageMeta.root.childrenComponents.forEach(id => {
      componentMeta = getComponentMeta(id);
      outputStr += `<${componentMeta.componentType}${getPropsStr(componentMeta.props)}></${componentMeta.componentType}>`;
    });
    return outputStr;
  };

  let moduleImports = '';
  let layoutStr = '';
  let rootProps = {
    backgroundColor: siteMeta.theme.colors.background,
    fontFamily: siteMeta.theme.font.family[0],
    fontSize: siteMeta.theme.font.size
  };
  pageMeta.imports.forEach(moduleName => {
    moduleImports +=
      moduleImports.length === 0 ? `${moduleName}` : `, ${moduleName}`;
  });
  layoutStr += `<${pageMeta.root.componentType}${getPropsStr(rootProps)}>${composeNonRootComponentsStr()}</${pageMeta.root.componentType}>`;
  return `import React, { Component } from 'react';
import { ${moduleImports} } from '@codecraftor/${siteMeta.template.name}';
class IndexPage extends Component {
  render() {
    const { theme } = this.props; 
    return (
      ${layoutStr}
    );
  }
}

export default IndexPage;`;
};
