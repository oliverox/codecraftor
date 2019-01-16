import sdk from '@stackblitz/sdk';
import getApp from '../getFiles/getApp';
import getIndex from '../getFiles/getIndex';
import getServiceWorker from '../getFiles/getServiceWorker';
import getIndexHtml from '../getFiles/getIndexHtml';

const publishApp = () => {
  return sdk.embedProject(
    'preview',
    {
      files: {
        'src/index.js': getIndex(),
        'src/App.js': getApp(),
        'src/serviceWorker.js': getServiceWorker(),
        'public/index.html': getIndexHtml({
          projectTitle: 'Hello Codecraftor'
        })
      },
      title: 'Codecraftor app',
      description: 'This was built with codecraftor',
      template: 'create-react-app',
      dependencies: {},
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
      hideExplorer: true,
      hideNavigation: true,
      forceEmbedLayout: true
    }
  );
};

export default publishApp;
