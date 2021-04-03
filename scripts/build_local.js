const fs = require("fs");

buildLocal();

function buildLocal() {
  if (fs.existsSync('docs-local')) {
    var stats = fs.statSync("dist/completeFeatureCollection.min.json");
    var mtime = stats.mtime;
    let indexDocsRemote = fs.readFileSync('docs/index.html').toString();
    let indexDocsLocal = 
      indexDocsRemote
      .replace("var dataURL = 'https://cdn.jsdelivr.net/gh/osmlab/osm-community-index@main/dist/completeFeatureCollection.min.json';", "var dataURL = './completeFeatureCollection.min.json';")
      .replace("<h2>OSM Communities</h2>", "<h2>OSM Communities</h2><div class='resource'>Local version " + mtime.toISOString().replace(/T/, ' ').replace(/\..+/, '') + " UTC</div>");
    fs.writeFileSync('docs-local/index.html', indexDocsLocal);
    fs.copyFileSync('dist/completeFeatureCollection.min.json', 'docs-local/completeFeatureCollection.min.json');
  }
}
