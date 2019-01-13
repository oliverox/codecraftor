export default {
  updated: 0,
  ui: 'default',
  template: 'pioneer',
  theme: {
    colors: {
      background: '#FFF', // white
      primary: '#FFE44B', // yellow
      secondary: '#172a3b', // dark blue
      tertiary: '#f9b82b', // dark yellow
      quaternary: '#e4e6e8',
      light: '#e4e6e8', // light gray
      dark: '#172A3B'
    },
    font: {
      family: ['Rajdhani', 'Open Sans'],
      size: '14px'
    }
  },
  globalCss: {},
  pages: {
    index: {
      pageTitle: 'Index Page',
      imports: ['Root', 'NavigationBar', 'Hero'],
      root: {
        componentType: 'Root',
        props: '{}',
        editable: false,
        childrenComponents: ['zKx-xptnr']
      },
      nonRootComponents: [
        {
          id: 'zKx-xptnr',
          componentType: 'NavigationBar',
          props: '{}'
        }
      ]
    }
  }
};
