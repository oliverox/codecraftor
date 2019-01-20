export default siteMeta => ({
  name: 'testproject',
  version: '1.0.0',
  dependencies: {
    react: '^16.7.0',
    'react-dom': '^16.7.0',
    'react-scripts': '2.1.3',
    'normalize.css': '^8.0.1',
    'react-router-dom': '^4.3.1',
    'styled-components': '^4.1.3',
    webfontloader: '^1.6.28',
    [`@codecraftor/${siteMeta.template.name}`]: `${siteMeta.template.version}`
  },
  scripts: {
    start: 'react-scripts start',
    build: 'react-scripts build',
    test: 'react-scripts test',
    eject: 'react-scripts eject'
  },
  eslintConfig: {
    extends: 'react-app'
  },
  browserslist: ['>0.2%', 'not dead', 'not ie <= 11', 'not op_mini all'],
  author: 'codecraftor'
});
