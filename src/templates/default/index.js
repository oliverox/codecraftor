import newPage from './newPage';

export default {
  newPageMeta: newPage,
  siteMeta: {
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
      font: {
        family: ['Montserrat'],
        size: '16px'
      }
    },
    globalCss: {},
    pages: [
      {
        index: true,
        pageTitle: 'Page One',
        imports: ['Root', 'PageHeader', 'Splash', 'Heading', 'Text'],
        root: {
          componentType: 'Root',
          props: '{}',
          editable: false,
          childrenComponents: [
            'pageheader001',
            'splash001',
            'heading001',
            'txt001',
            'heading002',
            'txt002'
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
            props: '{"text": "The Template Marketplace", "type": "h3"}'
          },
          {
            id: 'txt001',
            componentType: 'Text',
            props:
              '{"content": "This is currently the only template available. In the next few weeks, you will be able to choose from a selection of templates."}'
          },
          {
            id: 'heading002',
            componentType: 'Heading',
            props: '{"text": "Monetization Strategy", "type": "h3"}'
          },
          {
            id: 'txt002',
            componentType: 'Text',
            props:
              '{"content": "Any React developer will be able to create templates using the Codecraftor Template Creator tool (still a WIP). Templates can be sold on the Codecraftor Marketplace. Users of Codecraftor can select the desired template, compose and customize the website and pay a download / publish fee. Template creators get paid for every user who downloads their templates."}'
          }
        ]
      }
    ]
  }
};
