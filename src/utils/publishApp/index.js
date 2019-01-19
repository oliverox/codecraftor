import sdk from '@stackblitz/sdk';
import getIndexJs from '../getFiles/getIndexJs';
// import getIndexPage from '../getFiles/getIndexPage';
import getServiceWorker from '../getFiles/getServiceWorker';
import getIndexHtml from '../getFiles/getIndexHtml';

const publishApp = () => {
  return sdk.embedProject(
    'preview',
    {
      files: {
        'src/index.js': getIndexJs(),
        // 'src/pages/Index/Index.js': getIndexPage(),
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
