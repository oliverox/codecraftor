const getComponentObj = (siteMeta, pageIndex, componentId) => {
  if (pageIndex >= siteMeta.pages.length) {
    return false;
  }
  const { nonRootComponents } = siteMeta.pages[pageIndex];
  let componentObj = false;
  let index = -1;
  for (let i = 0; i < nonRootComponents.length; i++) {
    if (nonRootComponents[i].id === componentId) {
      componentObj = nonRootComponents[i];
      if (typeof componentObj.props === 'string') {
        componentObj.props = JSON.parse(componentObj.props);
      }
      index = i;
      break;
    }
  }
  return {
    componentObj,
    index
  };
};

export default getComponentObj;
