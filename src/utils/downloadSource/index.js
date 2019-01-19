import JSZip from 'jszip';
import saveAs from 'file-saver';
import getPackageJson from '../getFiles/getPackageJson';
import getReadme from '../getFiles/getReadme';
import getIndexJs from '../getFiles/getIndexJs';
import getPage from '../getFiles/getPage';
import getGitIgnore from '../getFiles/getGitIgnore';
import getIndexHtml from '../getFiles/getIndexHtml';
import getFavicon from '../getFiles/getFavicon';
import getManifest from '../getFiles/getManifest';
// import getIndex from '../getFiles/getIndex';
// import getApp from '../getFiles/getApp';
import getServiceWorker from '../getFiles/getServiceWorker';

const downloadSource = siteMeta => {
  const directoryName = siteMeta.projectTitle || 'testproject';
  const zip = new JSZip();
  zip.folder(`${directoryName}`);
  zip.file(`${directoryName}/siteMeta.json`, JSON.stringify(siteMeta));
  zip.file(
    `${directoryName}/package.json`,
    JSON.stringify(getPackageJson(siteMeta), null, 2)
  );
  zip.file(`${directoryName}/README.md`, getReadme());
  zip.file(`${directoryName}/.gitignore`, getGitIgnore());
  zip.file(`${directoryName}/public/index.html`, getIndexHtml(siteMeta));
  zip.file(`${directoryName}/public/favicon.png`, getFavicon(), {
    base64: true
  });
  zip.file(`${directoryName}/public/manifest.json`, getManifest(siteMeta));
  zip.file(`${directoryName}/src/index.js`, getIndexJs(siteMeta));
  siteMeta.pages.forEach((page, index) => {
    if (index === 0) {
      zip.file(`${directoryName}/src/pages/Index/Index.js`, getPage(siteMeta, 0));  
    } else {
      zip.file(`${directoryName}/src/pages/Page${index}/Page${index}.js`, getPage(siteMeta, index));  
    }
  })
  zip.file(`${directoryName}/src/serviceWorker.js`, getServiceWorker());

  zip.generateAsync({ type: 'blob', platform: 'UNIX' }).then(
    blob => {
      saveAs(blob, `codecraftor-${directoryName}.zip`);
    },
    error => {
      console.log(error);
    }
  );
};

export default downloadSource;
