import sdk from '@stackblitz/sdk';
import getPage from '../getFiles/getPage';
import getIndexJs from '../getFiles/getIndexJs';
import getServiceWorker from '../getFiles/getServiceWorker';
import getIndexHtml from '../getFiles/getIndexHtml';

const publishApp = (siteMeta) => {
  const pages = {};
  siteMeta.pages.forEach((page, index) => {
    if (index === 0) {
      pages['src/pages/Index/Index.js'] = getPage(siteMeta, 0);
    } else {
      pages[`src/pages/Page${index}/Page${index}.js`] = getPage(siteMeta, index);
    }
  });
  return sdk.embedProject(
    'preview',
    {
      files: {
        ...pages,
        'src/index.js': getIndexJs(siteMeta),
        'src/serviceWorker.js': getServiceWorker(),
        'public/index.html': getIndexHtml({
          projectTitle: 'Hello Codecraftor'
        })
      },
      title: 'Codecraftor app',
      description: 'This app was built with codecraftor',
      template: 'create-react-app',
      dependencies: {
        react: '^16.7.0',
        'react-dom': '^16.7.0',
        // 'react-scripts': '2.1.3',
        'normalize.css': '^8.0.1',
        'react-router-dom': '^4.3.1',
        'styled-components': '^4.1.3',
        webfontloader: '^1.6.28',
        [`@codecraftor/${siteMeta.template.name}`]: `${siteMeta.template.version}`    
      },
      settings: {
        compile: {
          trigger: 'auto',
          action: 'hmr',
          clearConsole: false
        }
      }
    },
    {
      clickToLoad: false,
      view: 'preview',
      hideExplorer: false,
      hideNavigation: false,
      forceEmbedLayout: true
    }
  );
};

export default publishApp;
