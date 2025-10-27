const packageJSON = await Bun.file('package.json').json();
const URLRoot = 'https://raw.githubusercontent.com/osmlab/osm-community-index/main';

//
// This function is used to write files (probably to `/dist`)
//  but with a block of metadata prepended to the beginning of the file.
// @param  {string}  filepath - the path to the file we want to write
// @param  {string}  contents - should be stringified json containing an object {}
//
export async function writeFileWithMeta(filepath: string, contents: string): void {
  // Calculate md5 of contents
  const message = packageJSON.version + contents;
  const hash = new Bun.CryptoHasher('md5').update(message).digest('hex');
  const now = new Date();

  const path = filepath.replace(/^\.\//, '');  // remove leading './' if any
  const metadata = {
    version: packageJSON.version,
    generated: now,
    url: `${URLRoot}/${path}`,
    hash: hash
  };

  // Stick metadata at the beginning of the file in the most hacky way possible
  const re = /\r?\n?[{}]\r?\n?/g;  // match curlies and their newline neighbors
  const strProps = JSON.stringify(metadata, null, 4).replace(re, '');
  const block = `
  "_meta": {
${strProps}
  },`;

  await Bun.write(filepath, contents.replace(/^\{/, '{' + block));
}
