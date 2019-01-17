import newPage from './newPage';

export default {
  newPageMeta: newPage,
  siteMeta: {
    updated: 0,
    ui: 'default',
    template: 'pioneer',
    theme: {
      colors: {
        background: '#FFF', // white
        primary: '#FFE44B', // yellow
        secondary: '#172a3b', // dark blue
        tertiary: '#f9b82b', // dark yellow
        quaternary: '#e4e6e8', // light gray
        light: '#e4e6e8', // light gray
        dark: '#172A3B'
      },
      font: {
        family: ['Rajdhani', 'Open Sans'],
        size: '14px'
      }
    },
    globalCss: {},
    pages: [
      {
        index: true,
        pageTitle: 'The Pioneer template',
        imports: [
          'Root',
          'NavigationBar',
          'Hero',
          'Features',
          'Mission',
          'Team',
          'Footer'
        ],
        root: {
          componentType: 'Root',
          props: '{}',
          editable: false,
          childrenComponents: [
            'zKx-xptnr',
            'hero001',
            'features001',
            'mission001',
            'team001',
            'footer001'
          ]
        },
        nonRootComponents: [
          {
            id: 'zKx-xptnr',
            componentType: 'NavigationBar',
            props: '{}'
          },
          {
            id: 'hero001',
            componentType: 'Hero',
            props: '{}'
          },
          {
            id: 'features001',
            componentType: 'Features',
            props: '{}'
          },
          {
            id: 'mission001',
            componentType: 'Mission',
            props: '{}'
          },
          {
            id: 'team001',
            componentType: 'Team',
            props: '{}'
          },
          {
            id: 'footer001',
            componentType: 'Footer',
            props: '{}'
          }
        ]
      }
    ]
  }
};
