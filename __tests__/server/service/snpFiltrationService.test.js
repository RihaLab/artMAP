'use strict';

jest.mock('../../../src/server/utils/scriptUtil');
const service = require('../../../src/server/service/snpFiltrationService');
const path = require('path');

const script = path.join(__dirname, '../../../src/scripts/snpsPicker.js');

describe('SNP Filtration service', () => {
  test('simple script', done => {
    const inputData = {
      inputFile: 'aa/bb',
      outputDirectory: 'cc',
      outputFilename: 'dd'
    };
    const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);

    const messages = [
      { progress: 0 },
      { info: `${script} -i ${inputData.inputFile} -o ${outputFile}` },
      { info: 'script finished' },
      { progress: 100 }
    ];

    const observable = service.conversion(inputData);
    observable.subscribe(
      value => {
        expect(value).toEqual(messages.shift());
      },
      error => done(error),
      () => {
        expect(messages).toHaveLength(0);
        done();
      }
    );
  });
});
