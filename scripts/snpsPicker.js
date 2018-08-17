#!/usr/bin/env node
const readline = require('readline');
const { createReadStream, createWriteStream, existsSync } = require('fs');
const program = require('commander');

const FREQUENCY = 30;
const MIN_DEPTH = 10;
const MAX_DEPTH = 100;

program
  .version('0.0.2')
  .usage('snpsPicker -i <INPUT> -o <OUTPUT>')
  .option('-f, --frequency <NUMBER>', `Frequency threshold (in percent) for filtering SNPs. Default to ${FREQUENCY}%`)
  .option('-F, --filter', 'Filtering the output delimited file by excluding all necessary values. Ignores frequency, min and max depth options')
  .option('-d, --min-depth <NUMBER>', `Minimum (inclusive) depth filter. Default to ${MIN_DEPTH}`)
  .option('-D, --max-depth <NUMBER>', `Maximum (inclusive) depth filter. Default to ${MAX_DEPTH}`)
  .option('-i, --input-file <INPUT>', 'File location of stored snps')
  .option('-o, --output-file <OUTPUT>', 'Destination file for processed snps')
  .parse(process.argv);

if (!program.inputFile || !program.outputFile) {
  program.help();
}

if (!existsSync(program.inputFile)) {
  throw new Error(`ENOENT: no such file or directory, open '${program.inputFile}'`);
}
if (!program.filter) {
  if (program.minDepth && Number.isNaN(program.minDepth)) {
    throw new Error(`Min depth parameter is not a number ${program.minDepth}`);
  }

  if (program.maxDepth && Number.isNaN(program.maxDepth)) {
    throw new Error(`Max depth parameter is not a number ${program.maxDepth}`);
  }

  if (program.frequency && Number.isNaN(program.frequency)) {
    throw new Error(`Frequency parameter is not a number ${program.frequency}`);
  }
}

const minDepth = program.minDepth ? Number(program.minDepth) : MIN_DEPTH;
const maxDepth = program.maxDepth ? Number(program.maxDepth) : MAX_DEPTH;
const frequencyThreshold = (program.frequency ? Number(program.frequency) : FREQUENCY) / 100;

const fd = createWriteStream(program.outputFile);

fd.once('open', () => {
  const lineReader = readline.createInterface({
    input: createReadStream(program.inputFile),
  });
  if (program.filter) {
    fd.write('Chromosome\tPosition\tReference\tMutation\tFrequency\tDepth\tGene Name\tGene ID\tProtein Change\n');
  }
  lineReader.on('line', processLine);
  lineReader.on('close', () => fd.close());
});

function processLine(line) {
  if (program.filter) {
    fd.write(getFilteredOutput(line));
  } else if (line.length && line[0] !== '#') {
    const { referenceAcid, alternativeAcids, frequency, depth } = parseLine(line);
    const isRelevantMutation1 = referenceAcid === 'G' && alternativeAcids.includes('A');
    const isRelevantMutation2 = referenceAcid === 'C' && alternativeAcids.includes('T');
    const isRelevantDepth = depth >= minDepth && depth <= maxDepth;

    if (frequency > frequencyThreshold && isRelevantDepth && (isRelevantMutation1 || isRelevantMutation2)) {
      fd.write(`${line}\n`);
    }

  } else {
    fd.write(`${line}\n`);
  }
}

function parseLine(line) {
  const cols = line.split('\t');
  const details = parseDetails(cols[7]);
  return Object.assign({}, details, {
    chromosome: cols[0],
    position: cols[1],
    referenceAcid: cols[3],
    mutatedAcid: cols[4],
    depth: cols[7].match(/\d+/)[0],
    alternativeAcids: cols[4].split(','),
    frequency: calculateFrequency(cols[9]),
  });
}

function calculateFrequency(line) {
  const dp4string = line.split(':')[4];
  const dp4values = dp4string.split(',').map(Number);
  return (dp4values[2] + dp4values[3]) / (dp4values[0] + dp4values[1] + dp4values[2] + dp4values[3]);
}

function parseDetails(line) {
  const cols = line.split('|');
  return {
    geneName: cols[3],
    geneId: cols[4],
    HGVSp: cols[10],
  };
}

function getFilteredOutput(line) {
  if (!line.length || line[0] === '#') {
    return '';
  }
  const {
    chromosome, position, referenceAcid, mutatedAcid, frequency, depth, geneName, geneId, HGVSp,
  } = parseLine(line);
  return `${chromosome}\t${position}\t${referenceAcid}\t${mutatedAcid}\t${frequency}\t${depth}\t${geneName || ''}\t${geneId || ''}\t${HGVSp || ''}\n`;
}
