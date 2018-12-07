export default {
  updated: 0,
  ui: 'default',
  globalCss: {},
  pages: {
    index: {
      pageTitle: 'Page One',
      imports: ['Heading', 'Container', 'Text'],
      root: {
        componentType: 'Container',
        props: '{"style":{"color":"darkgrey"}}',
        children: ['heading001', 'heading002', 'container001']
      },
      components: [
        {
          id: 'heading001',
          componentType: 'Heading',
          props:
            '{"text":"Hello World","type":"h1","style":{"color":"hotpink"}}'
        },
        {
          id: 'heading002',
          componentType: 'Heading',
          props:
            '{"text":"This is my subtitle","type":"h3","style":{"color":"blue"}}'
        },
        {
          id: 'container001',
          componentType: 'Container',
          props:
            '{"style":{"width":500,"height":500,"backgroundColor":"hotpink"}}',
          children: ['text001']
        },
        {
          id: 'text001',
          componentType: 'Text',
          props: '{"text":"I am a span inside a red container"}'
        }
      ]
    }
  }
};
