#!/usr/bin/env node
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

if (!existsSync(program.inputFile)) {
  throw new Error(`ENOENT: no such file or directory, open '${program.inputFile}'`);
}

const fd = createWriteStream(program.outputFile);

fd.once('open', () => {
  const lineReader = readline.createInterface({
    input: createReadStream(program.inputFile),
  });
  lineReader.on('line', processLine);
  lineReader.on('close', () => fd.close());
});

function processLine(line) {
  if (line.length && line[0] !== '#') {
    const { referenceAcid, alternativeAcids, frequency, depth } = parseLine(line);

    const isRelevantMutation1 = referenceAcid === 'G' && alternativeAcids.includes('A');
    const isRelevantMutation2 = referenceAcid === 'C' && alternativeAcids.includes('T');
    const isRelevantDepth = depth >= 10 && depth <= 100;

    if (frequency > 0.3 && isRelevantDepth && (isRelevantMutation1 || isRelevantMutation2)) {
      fd.write(`${line}\n`);
    }
  } else {
    fd.write(`${line}\n`);
  }
}

function parseLine(line) {
  const cols = line.split('\t');
  return {
    referenceAcid: cols[3],
    depth: cols[7].match(/\d+/)[0],
    alternativeAcids: cols[4].split(','),
    frequency: calculateFrequency(cols[9])
  };
}

function calculateFrequency(line) {
  const dp4string = line.split(':')[4];
  const dp4values = dp4string.split(',').map(Number);
  return (dp4values[2] + dp4values[3]) / (dp4values[0] + dp4values[1] + dp4values[2] + dp4values[3]);
}
