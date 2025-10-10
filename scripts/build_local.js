import fs from 'node:fs';

buildLocal();

function buildLocal() {
  const stats = fs.statSync('dist/completeFeatureCollection.min.json');
  const mtime = stats.mtime;

  const indexDocsRemote = fs.readFileSync('docs/index.html', 'utf8');
  const indexDocsLocal = indexDocsRemote
    .replace("var dataURL = cdnBase", "var dataURL = './'")
    .replace("<h2>OSM Communities</h2>", "<h2>OSM Communities</h2><div class='resource'>Local version " +
      mtime.toISOString().replace(/T/, ' ').replace(/\..+/, '') + " UTC</div>");

  fs.mkdirSync('docs-local');
  fs.writeFileSync('docs-local/index.html', indexDocsLocal);
  fs.copyFileSync('dist/completeFeatureCollection.min.json', 'docs-local/completeFeatureCollection.min.json');
}
