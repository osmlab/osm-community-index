import fs from 'fs-extra';

buildLocal();

function buildLocal() {
  const stats = fs.statSync('dist/completeFeatureCollection.min.json');
  const mtime = stats.mtime;
  let indexDocsRemote = fs.readFileSync('docs/index.html').toString();

  let indexDocsLocal = indexDocsRemote
    .replace("var dataURL = cdnBase", "var dataURL = './'")
    .replace("<h2>OSM Communities</h2>", "<h2>OSM Communities</h2><div class='resource'>Local version " +
      mtime.toISOString().replace(/T/, ' ').replace(/\..+/, '') + " UTC</div>");

  fs.ensureFileSync('docs-local/index.html');
  fs.writeFileSync('docs-local/index.html', indexDocsLocal);
  fs.copyFileSync('dist/completeFeatureCollection.min.json', 'docs-local/completeFeatureCollection.min.json');
}
