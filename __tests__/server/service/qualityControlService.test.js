'use strict';

jest.mock('fs');
jest.mock('../../../src/server/utils/scriptUtil');
const service = require('../../../src/server/service/qualityControlService');
const path = require('path');

describe('Quality Control', () => {
  describe('Single end', () => {
    test('simple script', done => {
      const outputFile = path.join(sampleData.outputDirectory, sampleData.outputFilename);
      const defaultOutputFile = path.join(sampleData.outputDirectory, path.parse(sampleData.inputFile).name) + '_trimmed.fq';

      const messages = [
        { progress: 0 },
        { info: `trim_galore ${sampleData.inputFile} -o ${sampleData.outputDirectory} --no_report_file` },
        { info: 'script finished' },
        { progress: 95 },
        { info: `Renaming from ${defaultOutputFile} to ${outputFile}` },
        { info: `FS MOCK: rename function: from ${defaultOutputFile} to ${outputFile}` },
        { progress: 100 }
      ];

      const observable = service.qualityControl(sampleData);
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
    test('simple pair end script', done => {
      const outputFile = path.join(sampleData.outputDirectory, sampleData.outputFilename);
      const defaultOutputFile = path.join(sampleData.outputDirectory, path.parse(sampleData.inputFile).name) + '_trimmed.fq';
      const messages = [
        { progress: 0 },
        { info: `trim_galore ${sampleData.inputFile} -o ${sampleData.outputDirectory} --no_report_file --paired` },
        { info: 'script finished' },
        { progress: 95 },
        { info: `Renaming from ${defaultOutputFile} to ${outputFile}` },
        { info: `FS MOCK: rename function: from ${defaultOutputFile} to ${outputFile}` },
        { progress: 100 }
      ];

      const inputData = Object.assign({}, sampleData, { pairEnd: true });
      const observable = service.qualityControl(inputData);
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

const sampleData = {
  inputFile: 'aa/bb',
  outputDirectory: 'cc',
  outputFilename: 'dd'
};