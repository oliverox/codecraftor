export default {
  updated: 0,
  ui: 'default',
  globalCss: {},
  pages: {
    index: {
      pageTitle: 'Page One',
      imports: ['Container', 'Span'],
      root: {
        componentName: 'Container',
        props: '{"style":{"color":"black"}}',
        children: ['container001']
      },
      components: [
        {
          id: 'container001',
          componentName: 'Container',
          props:
            '{"style":{"backgroundColor":"lightblue", "display":"flex","justifyContent":"center","alignItems":"center"}}',
          children: ['span001']
        },
        {
          id: 'span001',
          componentName: 'Span',
          props: '{"text":"I am a span inside a Container"}'
        }
      ]
    }
  }
};
