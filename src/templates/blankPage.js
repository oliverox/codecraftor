export default {
  updated: 0,
  ui: 'default',
  globalCss: {},
  pages: {
    index: {
      pageTitle: 'Page One',
      imports: ['RootContainer', 'GenericContainer', 'Span'],
      root: {
        componentModule: 'RootContainer',
        props: '{}',
        editable: false,
        childrenComponents: ['generic-container001'],
      },
      nonRootComponents: [
        {
          id: 'generic-container001',
          componentModule: 'GenericContainer',
          props:
            '{"style":{"backgroundColor":"lightblue", "display":"flex","justifyContent":"center","alignItems":"center"}}',
          childrenComponents: ['span001']
        },
        {
          id: 'span001',
          componentModule: 'Span',
          props: '{"text":"I am a span inside a Container"}'
        }
      ]
    }
  }
};
