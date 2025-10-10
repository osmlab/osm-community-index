import bytes from 'bytes';
import fs from 'node:fs';
import path from 'node:path';
import { styleText } from 'node:util';
import Table from 'easy-table';

getStats();

function getStats() {
  let featureSize = 0;
  let resourceSize = 0;
  let featureFiles = 0;
  let resourceFiles = 0;
  let currSize = 0;
  let currFiles = 0;

  let t = new Table;
  currSize = 0;
  currFiles = 0;
  fs.globSync('./features/**/*.geojson').forEach(addRow);
  t.sort(['Size|des']);
  console.log(t.toString());
  featureSize = bytes(currSize, { unitSeparator: ' ' });
  featureFiles = currFiles;

  t = new Table;
  currSize = 0;
  currFiles = 0;
  fs.globSync('./resources/**/*.json').forEach(addRow);
  t.sort(['Size|des']);
  console.log(t.toString());
  resourceSize = bytes(currSize, { unitSeparator: ' ' });
  resourceFiles = currFiles;

  console.info(`\nTotals:`);
  console.info(`-------`);
  console.info(styleText(['blue','bold'], `Features:   ${featureSize} in ${featureFiles} files.`));
  console.info(styleText(['blue','bold'], `Resources:  ${resourceSize} in ${resourceFiles} files.`));
  console.info('');


  function addRow(file) {
    const stats = fs.statSync(file);
    const color = colorBytes(stats.size);
    currSize += stats.size;
    currFiles++;

    t.cell('Size', stats.size, function sizePrinter(val, width) {
      const displaySize = bytes(stats.size, { unitSeparator: ' ' });
      return width ? Table.padLeft(displaySize, width) : styleText(color, displaySize);
    });
    t.cell('File', styleText(color, path.basename(file)));
    t.newRow();
  }

  function colorBytes(size) {
    if (size > 1024 * 10) {  // 10 KB
      return 'red';
    } else if (size > 1024 * 2) {  // 2 KB
      return 'yellow';
    } else {
      return 'green';
    }
  }
}

