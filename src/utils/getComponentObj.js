const getComponentObj = (siteMeta, pageIndex, componentId) => {
  const { nonRootComponents } = siteMeta.pages[pageIndex];
  let componentObj = false;
  let index = -1;
  for (let i = 0; i < nonRootComponents.length; i++) {
    if (nonRootComponents[i].id === componentId) {
      componentObj = nonRootComponents[i];
      if (typeof(componentObj.props) === 'string') {
        componentObj.props = JSON.parse(componentObj.props);
      }
      index = i;
      break;
    }
  }
  console.log('%%%%%%%%%%%%% getComponentObj is returning:', {
    componentObj,
    index
  });
  return {
    componentObj,
    index
  };
};

export default getComponentObj;
