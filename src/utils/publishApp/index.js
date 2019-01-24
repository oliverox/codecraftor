import getPage from '../getFiles/getPage';
import getNowJson from '../getFiles/getNowJson';
import getGitIgnore from '../getFiles/getGitIgnore';
import getReadMe from '../getFiles/getReadme';
import getPackageJson from '../getFiles/getPackageJson';
import getIndexJs from '../getFiles/getIndexJs';
import getServiceWorker from '../getFiles/getServiceWorker';
import getIndexHtml from '../getFiles/getIndexHtml';
import getFavicon from '../getFiles/getFavicon';
import getManifest from '../getFiles/getManifest';

const publishApp = siteMeta => {
  const files = [];
  siteMeta.pages.forEach((page, index) => {
    if (index === 0) {
      files.push({
        file: 'src/pages/Index/Index.js',
        data: getPage(siteMeta, 0)
      });
    } else {
      files.push({
        file: `src/pages/Page${index}/Page${index}.js`,
        data: getPage(siteMeta, index)
      });
    }
  });
  files.push(
    {
      file: 'package.json',
      data: JSON.stringify(getPackageJson(siteMeta))
    },
    {
      file: '.gitignore',
      data: getGitIgnore()
    },
    {
      file: 'README.md',
      data: getReadMe()
    },
    {
      file: 'src/serviceWorker.js',
      data: getServiceWorker()
    },
    {
      file: 'src/index.js',
      data: getIndexJs(siteMeta)
    },
    {
      file: 'public/index.html',
      data: getIndexHtml(siteMeta)
    },
    {
      file: 'public/favicon.png',
      data: getFavicon()
    },
    {
      file: 'public/manifest.json',
      data: getManifest(siteMeta)
    },
    {
      file: 'now.json',
      data: getNowJson()
    }
  );
  console.log('publishApp() - files=', files);
  console.log('body=', JSON.stringify({
    name: 'codecraftor-project',
    public: true,
    version: 2,
    files,
    builds: [{ src: 'package.json', use: '@now/static-build' }]
  }));
  return fetch('https://api.zeit.co/v6/now/deployments', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: 'Bearer FsCNErKLA4PUkoiPKPwbmPd2'
    },
    body: JSON.stringify({
      name: 'codecraftor-project',
      public: true,
      version: 2,
      files,
      builds: [{ src: 'package.json', use: '@now/static-build' }]
    })
  });
};

export default publishApp;
