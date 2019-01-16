const getComponentConfig = (componentList, componentType) => {
  let component = { config: false };
  for (let i = 0; i < componentList.length; i++) {
    if (componentList[i].type === componentType) {
      component = componentList[i];
      break;
    }
  }
  return component.config;
}

export default getComponentConfig;