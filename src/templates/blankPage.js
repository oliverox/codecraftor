export default {
  updated: 0,
  ui: 'default',
  globalCss: {},
  pages: {
    index: {
      pageTitle: 'Page One',
      imports: ['RootContainer', 'GenericContainer', 'Text'],
      root: {
        componentType: 'RootContainer',
        props: '{}',
        editable: false,
        childrenComponents: ['generic-container001'],
      },
      nonRootComponents: [
        {
          id: 'generic-container001',
          componentType: 'GenericContainer',
          props:
            '{"style":{"backgroundColor":"lightblue", "display":"flex","justifyContent":"center","alignItems":"center"}}',
          childrenComponents: ['text001']
        },
        {
          id: 'text001',
          componentType: 'Text',
          props: '{"text":"I am a text inside a Container"}'
        }
      ]
    }
  }
};
