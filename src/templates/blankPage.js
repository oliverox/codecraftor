export default {
  updated: 0,
  ui: 'default',
  theme: {
    colors: {
      background: '#FCB900',
      primary: '#188FA7',
      secondary: '#283D3B',
      tertiary: '#197278',
      quaternary: '#C44536',
      light: '#FFF',
      dark: '#283D3B'
    },
    font: 'Montserrat'
  },
  globalCss: {},
  pages: {
    index: {
      pageTitle: 'Page One',
      imports: ['RootContainer', 'PageHeader', 'Splash', 'Heading', 'Text'],
      root: {
        componentType: 'RootContainer',
        props: '{}',
        editable: false,
        childrenComponents: [
          'pageheader001',
          'splash001',
          'heading001',
          'txt001'
        ]
      },
      nonRootComponents: [
        {
          id: 'pageheader001',
          componentType: 'PageHeader',
          props: '{"backgroundStyle": "secondary", "fontStyle": "light"}'
        },
        {
          id: 'splash001',
          componentType: 'Splash',
          props:
            '{"hAlign": "left", "vAlign": "center", "height": 400, "backgroundStyle": "primary", "splashImageUrl": "https://i.ibb.co/RY5bdWv/rawpixel-558599-unsplash.jpg", "marketingLineOne": "Welcome to Codecraftor.", "marketingLineTwo": "The visual site builder you will ♥"}'
        },
        {
          id: 'heading001',
          componentType: 'Heading',
          props: '{"text": "This is the base template", "type": "h3"}'
        },
        {
          id: 'txt001',
          componentType: 'Text',
          props:
            '{"content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."}'
        }
      ]
    }
  }
};
