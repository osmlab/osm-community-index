/* eslint-disable no-console */
const bytes = require('bytes');
const colors = require('colors/safe');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const Table = require('easy-table');

getStats();

function getStats() {
  let t = new Table;
  glob.sync(__dirname + '/features/**/*.geojson').forEach(addRow);
  t.sort(['Size|des']);
  console.log(t.toString());

  t = new Table;
  glob.sync(__dirname + '/resources/**/*.json').forEach(addRow);
  t.sort(['Size|des']);
  console.log(t.toString());


  function addRow(file) {
    let stats = fs.statSync(file);
    let color = colorBytes(stats.size);

    t.cell('Size', stats.size, function sizePrinter(val, width) {
      let displaySize = bytes(stats.size, { unitSeparator: ' ' });
      return width ? Table.padLeft(displaySize, width) : color(displaySize);
    });
    t.cell('File', color(path.basename(file)));
    t.newRow();
  }

  function colorBytes(size) {
    if (size > 1024 * 10) {  // 10 KB
      return colors.red;
    } else if (size > 1024 * 2) {  // 2 KB
      return colors.yellow;
    } else {
      return colors.green;
    }
  }
}

