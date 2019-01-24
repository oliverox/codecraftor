export default {
  index: false,
  pageTitle: 'Page Title',
  imports: [
    'Root',
    'NavigationBar',
    'Mission',
    'Footer'
  ],
  root: {
    componentType: 'Root',
    props: '{}',
    editable: false,
    childrenComponents: [
      'zKx-xptnr',
      'mission001',
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
      id: 'mission001',
      componentType: 'Mission',
      props: '{}'
    },
    {
      id: 'footer001',
      componentType: 'Footer',
      props: '{}'
    }
  ]
};
