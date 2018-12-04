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
        children: ['generic-container001']
      },
      components: [
        {
          id: 'generic-container001',
          componentModule: 'GenericContainer',
          props:
            '{"style":{"backgroundColor":"lightblue", "display":"flex","justifyContent":"center","alignItems":"center"}}',
          children: ['span001']
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
