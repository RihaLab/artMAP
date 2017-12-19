'use strict';

jest.mock('tmp');
jest.mock('../../../src/server/utils/scriptUtil');
const service = require('../../../src/server/service/alignmentService');
const path = require('path');

const tempDirName = 'tmp-dir';
const referenceGenome = path.join(__dirname, '../../../src', 'data', 'genome.fa');

describe('Alignment service', () => {
  beforeEach(() => {
    require('tmp').__setDirName(tempDirName);
  });

  describe('Single end', () => {
    test('simple script', done => {
      const inputData = generateSampleData();
      const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
      const tempFile = path.join(tempDirName, 'alignment-tmp-file');

      const messages = [
        { progress: 0 },
        { info: `bwa aln ${referenceGenome} ${inputData.inputFile} > ${tempFile}` },
        { info: 'script finished' },
        { progress: 50 },
        { info: `bwa samse ${referenceGenome} ${tempFile} ${inputData.inputFile} > ${outputFile}` },
        { info: 'script finished' },
        { progress: 100 }
      ];

      const observable = service.alignment(inputData);
      observable.subscribe(
        value => expect(value).toEqual(messages.shift()),
        error => done(error),
        () => {
          expect(messages).toHaveLength(0);
          done();
        }
      );
    });

    test('more than 70 bp script', done => {
      const inputData = Object.assign(generateSampleData(), { bigBP: true });
      const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);

      const messages = [
        { progress: 0 },
        { info: `bwa mem ${referenceGenome} ${inputData.inputFile} > ${outputFile}` },
        { info: 'script finished' },
        { progress: 100 }
      ];

      const observable = service.alignment(inputData);
      observable.subscribe(
        value => expect(value).toEqual(messages.shift()),
        error => done(error),
        () => {
          expect(messages).toHaveLength(0);
          done();
        }
      );
    });
  });

  describe('Pair end', () => {
    test('simple script', done => {
      const inputData = generateSampleData(true);
      const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
      const tempFile = path.join(tempDirName, 'alignment-tmp');
      const tempFilePairEnd = path.join(tempDirName, 'alignment-tmp-pair-end');

      const messages = [
        { progress: 0 },
        { info: `bwa aln ${referenceGenome} ${inputData.inputFile} > ${tempFile}` },
        { info: `bwa aln ${referenceGenome} ${inputData.pairedInputFile} > ${tempFilePairEnd}` },
        { info: 'script finished' },
        { info: 'script finished' },
        { progress: 67 },
        { info: `bwa sampe ${referenceGenome} ${tempFile} ${tempFilePairEnd} ${inputData.inputFile} ${inputData.pairedInputFile} > ${outputFile}` },
        { info: 'script finished' },
        { progress: 100 },
      ];

      const observable = service.alignment(inputData);
      observable.subscribe(
        value => expect(value).toEqual(messages.shift()),
        error => done(error),
        () => {
          expect(messages).toHaveLength(0);
          done();
        }
      );
    });

    test('more than 70 bp script', done => {
      const inputData = Object.assign(generateSampleData(true), { bigBP: true });
      const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);

      const messages = [
        { progress: 0 },
        { info: `bwa mem ${referenceGenome} ${inputData.inputFile} ${inputData.pairedInputFile} > ${outputFile}` },
        { info: 'script finished' },
        { progress: 100 }
      ];

      const observable = service.alignment(inputData);
      observable.subscribe(
        value => expect(value).toEqual(messages.shift()),
        error => done(error),
        () => {
          expect(messages).toHaveLength(0);
          done();
        }
      );
    });
  });
});

function generateSampleData(pairEnd) {
  const baseData = { inputFile: 'aa/bb', outputDirectory: 'cc', outputFilename: 'dd' };
  if (pairEnd) {
    return Object.assign(baseData, { pairEnd: true, pairedInputFile: 'aa/xx' });
  }
  return baseData;
}
