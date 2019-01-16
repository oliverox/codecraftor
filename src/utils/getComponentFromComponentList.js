const getComponentFromComponentList = (componentList, componentType) => {
  let component = false;
  for (let i = 0; i < componentList.length; i++) {
    if (componentList[i].type === componentType) {
      component = componentList[i];
      break;
    }
  }
  return component;
}

export default getComponentFromComponentList;