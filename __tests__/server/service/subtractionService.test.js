'use strict';

jest.mock('../../../src/server/utils/scriptUtil');
const service = require('../../../src/server/service/subtractionService');
const path = require('path');

describe('Subtraction service', () => {
  test('simple script', done => {
    const inputData = {
      controlFile: 'aa/bb',
      mutatedFile: 'aa/xx',
      outputDirectory: 'cc',
      outputFilename: 'dd'
    };
    const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);

    const messages = [
      { progress: 0 },
      { info: `subtractBed -a ${inputData.mutatedFile} -b ${inputData.controlFile} > ${outputFile}` },
      { info: 'script finished' },
      { progress: 100 }
    ];

    const observable = service.conversion(inputData);
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
