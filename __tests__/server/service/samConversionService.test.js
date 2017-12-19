'use strict';

jest.mock('tmp');
jest.mock('../../../src/server/utils/scriptUtil');
const service = require('../../../src/server/service/samConversionService');
const path = require('path');

const tempDirName = 'tmp-dir';

describe('SAM Conversion service', () => {
  beforeEach(() => {
    require('tmp').__setDirName(tempDirName);
  });

  test('simple script', done => {
    const inputData = {
      inputFile: 'aa/bb',
      outputDirectory: 'cc',
      outputFilename: 'dd'
    };

    const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
    const tempFile = path.join(tempDirName, 'tmp-view.bam');

    const messages = [
      { progress: 0 },
      { info: `samtools view -bS -o ${tempFile} ${inputData.inputFile}` },
      { info: 'script finished' },
      { progress: 33 },
      { info: `samtools sort -o ${outputFile} ${tempFile}` },
      { info: 'script finished' },
      { progress: 67 },
      { info: `samtools index ${outputFile}` },
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
});
