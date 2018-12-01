export default {
  updated: 0,
  ui: 'default',
  globalCss: {},
  pages: {
    index: {
      pageTitle: 'Page One',
      imports: ['Heading', 'Container', 'Span'],
      root: {
        componentName: 'Container',
        props: '{"style":{"color":"darkgrey"}}',
        children: ['heading001', 'heading002', 'container001']
      },
      components: [
        {
          id: 'heading001',
          componentName: 'Heading',
          props:
            '{"text":"Hello World","type":"h1","style":{"color":"hotpink"}}'
        },
        {
          id: 'heading002',
          componentName: 'Heading',
          props:
            '{"text":"This is my subtitle","type":"h3","style":{"color":"blue"}}'
        },
        {
          id: 'container001',
          componentName: 'Container',
          props:
            '{"style":{"width":500,"height":500,"backgroundColor":"hotpink"}}',
          children: ['span001']
        },
        {
          id: 'span001',
          componentName: 'Span',
          props: '{"text":"I am a span inside a red container"}'
        }
      ]
    }
  }
};
