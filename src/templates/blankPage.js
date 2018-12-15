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
