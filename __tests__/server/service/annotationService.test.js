'use strict';

jest.mock('fs');
jest.mock('../../../src/server/utils/scriptUtil');
const service = require('../../../src/server/service/annotationService');
const path = require('path');

const referenceGenome = 'Arabidopsis_thaliana';

describe('Annotation service', () => {
  test('simple script', done => {
    process.env.SNP_EFF = '/path/to/snpEff.jar';

    const inputData = {
      inputFile: 'aa/bb',
      outputDirectory: 'cc',
      outputFilename: 'dd'
    };

    const generatedHtml = path.join(inputData.outputDirectory, 'snpEff_summary.html');
    const generatedTxt = path.join(inputData.outputDirectory, 'snpEff_genes.txt');

    const generatedHtmlResult = path.join(inputData.outputDirectory, `${inputData.outputFilename}_snpEff_summary.html`);
    const generatedTxtResult = path.join(inputData.outputDirectory, `${inputData.outputFilename}_snpEff_genes.txt`);

    const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);

    const messages = [
      { progress: 0 },
      { info: `java -Xmx4g -jar ${process.env.SNP_EFF} ${referenceGenome} ${inputData.inputFile} > ${outputFile}.txt from ${inputData.outputDirectory}` },
      { info: 'script finished' },
      { progress: 95 },
      { info: `FS MOCK: rename function: from ${generatedHtml} to ${generatedHtmlResult}` },
      { info: `FS MOCK: rename function: from ${generatedTxt} to ${generatedTxtResult}` },
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

  test('missing environment variable', done => {
    const inputData = {
      inputFile: 'aa/bb',
      outputDirectory: 'cc',
      outputFilename: 'dd'
    };
    delete process.env.SNP_EFF;

    const observable = service.conversion(inputData);
    observable.subscribe(
      value => done(value),
      error => {
        expect(error.message).toEqual('Environment variable `SNP_EFF` is not set');
        done();
      },
      () => done('Should not complete')
    );
  });
});
