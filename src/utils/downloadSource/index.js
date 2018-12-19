import JSZip from 'jszip';
import saveAs from 'file-saver';
import getPackageJson from './getPackageJson';
import getReadme from './getReadme';
import getGitIgnore from './getGitIgnore';
import getIndexHtml from './getIndexHtml';
import getFavicon from './getFavicon';
import getManifest from './getManifest';
import getIndex from './getIndex';
import getApp from './getApp';
import getServiceWorker from './getServiceWorker'

const downloadSource = siteMeta => {
  const directoryName = siteMeta.projectTitle || 'testproject';
  const zip = new JSZip();
  zip.folder(`${directoryName}`);
  zip.file(`${directoryName}/siteMeta.json`, JSON.stringify(siteMeta));
  zip.file(
    `${directoryName}/package.json`,
    JSON.stringify(getPackageJson(), null, 2)
  );
  zip.file(`${directoryName}/README.md`, getReadme());
  zip.file(`${directoryName}/.gitignore`, getGitIgnore());
  zip.file(`${directoryName}/public/index.html`, getIndexHtml(siteMeta));
  zip.file(`${directoryName}/public/favicon.png`, getFavicon(), {
    base64: true
  });
  zip.file(`${directoryName}/public/manifest.json`, getManifest(siteMeta));
  zip.file(`${directoryName}/src/index.js`, getIndex());
  zip.file(`${directoryName}/src/App.js`, getApp());
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
