'use strict';

jest.mock('../../../src/server/utils/scriptUtil');
const service = require('../../../src/server/service/snpCallerService');
const path = require('path');

const referenceGenome = path.join(__dirname, '../../../src', 'data', 'genome.fa');

describe('SNP Caller service', () => {
  test('simple script', done => {
    const inputData = {
      inputFile: 'aa/bb',
      outputDirectory: 'cc',
      outputFilename: 'dd'
    };
    const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);

    const messages = [
      { progress: 0 },
      { info: `samtools mpileup -Q 30 -C50 -P Illumina -t DP,DV,INFO/DPR,DP4,SP,DV -Buf ${referenceGenome} ${inputData.inputFile} | bcftools view -vcg --types snps > ${outputFile}` },
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
