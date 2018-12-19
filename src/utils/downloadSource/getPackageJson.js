export default () => ({
  name: 'testproject',
  version: '1.0.0',
  dependencies: {
    react: '^16.6.3',
    'react-dom': '^16.6.3',
    'react-scripts': '2.1.1',
    webfontloader: '^1.6.28'
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
