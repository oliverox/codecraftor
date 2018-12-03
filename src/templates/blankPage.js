export default {
  updated: 0,
  ui: 'default',
  globalCss: {},
  pages: {
    index: {
      pageTitle: 'Page One',
      imports: ['Container', 'Span'],
      root: {
        componentModule: 'Container',
        props: '{"style":{"color":"black"}}',
        children: ['container001']
      },
      components: [
        {
          id: 'container001',
          componentModule: 'Container',
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
