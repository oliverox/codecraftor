export default {
  updated: 0,
  ui: 'default',
  theme: {
    colors: {
      background: '#FFF',
      primary: '#188FA7',
      secondary: '#283D3B',
      tertiary: '#197278',
      quaternary: '#C44536',
      light: '#FFF',
      dark: '#283D3B',
    },
    font: 'Lora'
  },
  globalCss: {},
  pages: {
    index: {
      pageTitle: 'Page One',
      imports: ['RootContainer', 'Heading', 'GenericContainer', 'Text'],
      root: {
        componentType: 'RootContainer',
        props: '{}',
        editable: false,
        childrenComponents: ['heading001', 'generic-container001'],
      },
      nonRootComponents: [
        {
          id: 'heading001',
          componentType: 'Heading',
          props: '{"text": "Welcome to Codecraftor.", "type": "h1"}'
        },
        {
          id: 'generic-container001',
          componentType: 'GenericContainer',
          props: '{"backgroundColor": "lightblue"}',
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
