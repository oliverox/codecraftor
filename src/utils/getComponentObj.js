const getComponentObj = (siteMeta, page, componentId) => {
  const { nonRootComponents } = siteMeta.pages[page];
  let componentObj = false;
  let index = -1;
  for (let i = 0; i < nonRootComponents.length; i++) {
    if (nonRootComponents[i].id === componentId) {
      componentObj = nonRootComponents[i];
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
