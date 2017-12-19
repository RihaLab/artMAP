#!/usr/bin/env node
/**
 *
 * @author Peter Javorka <peter.javorka@artin.cz>
 * @since 4/26/17.
 */

'use strict';
const readline = require('readline');
const { createReadStream, createWriteStream, existsSync } = require('fs');
const program = require('commander');

program
  .version('0.0.1')
  .usage('snpsPicker -i <INPUT> -o <OUTPUT>')
  .option('-i, --input-file <INPUT>', 'File location of stored snps')
  .option('-o, --output-file <OUTPUT>', 'Destination file for processed snps')
  .parse(process.argv);

if (!program.inputFile || !program.outputFile) {
  program.help();
}
else {
  if (!existsSync(program.inputFile)) {
    throw new Error(`ENOENT: no such file or directory, open '${program.inputFile}'`);
  }
  const graphs = {};
  const fd = createWriteStream(program.outputFile);
  fd.once('open', () => {
    const lineReader = readline.createInterface({
      input: createReadStream(program.inputFile)
    });

    let isFirstLine = true;

    lineReader.on('line', line => {
      const { chromosome, baseNA, mutatedNA, location } = parseLine(line);

      if ((baseNA === 'G' && mutatedNA === 'A') || (baseNA === 'C' && mutatedNA === 'T')) {
        //only relevant relevant mutations
        const DP = getDPValue(line);
        if (DP >= 10 && DP <= 100) {
          const DP4Values = getDP4Values(line);
          const frequency = (DP4Values[2] + DP4Values[3]) / (DP4Values[0] + DP4Values[1]);
          if (frequency >= 0.3) {
            if (!graphs[chromosome]) {
              graphs[chromosome] = {
                name: chromosome,
                data: []
              };
            }
            graphs[chromosome].data.push({ location, frequency });
            if (isFirstLine) {
              fd.write(line);
              isFirstLine = false;
            }
            else {
              fd.write(`\n${line}`);
            }
          }
        }
      }
    });
    lineReader.on('close', fd.close);
  });
}

function parseLine(line) {
  const cols = line.split('\t');
  if (cols.length !== 10) {
    throw new Error('Input file is in wrong format');
  }
  return {
    chromosome: cols[0],
    location: cols[1],
    baseNA: cols[3],
    mutatedNA: cols[4].charAt(0)
  };
}

function getDPValue(line) {
  const cols = line.split('\t');
  return cols[7].match(/DP=[0-9]+/)[0].match(/[0-9]+/)[0];
}

function getDP4Values(line) {
  const cols = line.split('\t');
  const DP4Index = cols[8].split(':').indexOf('DP4');
  return cols[9].split(':')[DP4Index].split(',').map(e => Number(e));
}

