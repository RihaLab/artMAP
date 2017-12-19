/**
 * @summary Description
 *
 * @author Peter Javorka <peter.javorka@artin.cz>
 * @since 2/9/17.
 */

'use strict';

jest.mock('../../../src/server/utils/scriptUtil');
const path = require('path');
const service = require('../../../src/server/service/bamConversion.service');

describe('BAM Conversion', () => {

  describe('Single end', () => {
    test('simple script', done => {
      const outputFile = path.join(sampleInput.outputDirectory, sampleInput.outputFilename);
      const messages = [
        { progress: 0 },
        { info: `bamToFastq -i ${sampleInput.inputFile} -fq ${outputFile}` },
        { info: 'script finished' },
        { progress: 100 }
      ];
      const observable = service.conversion(sampleInput);
      observable.subscribe(
        value => expect(value).toEqual(messages.shift()),
        error => done(error),
        () => {
          expect(messages).toHaveLength(0);
          done();
        }
      );
    });

    test('pair end flag, but missing `secondNameOutputFilename`', done => {
      const outputFile = path.join(sampleInput.outputDirectory, sampleInput.outputFilename);
      const messages = [
        { progress: 0 },
        { info: `bamToFastq -i ${sampleInput.inputFile} -fq ${outputFile}` },
        { info: 'script finished' },
        { progress: 100 }
      ];
      const observable = service.conversion(Object.assign({}, sampleInput), { pairEnd: true });
      observable.subscribe(
        value => expect(value).toEqual(messages.shift()),
        error => done(error),
        () => {
          expect(messages).toHaveLength(0);
          done();
        }
      );
    });

    test('has second output filename, but missing `pairEnd` flag', done => {
      const outputFile = path.join(sampleInput.outputDirectory, sampleInput.outputFilename);
      const messages = [
        { progress: 0 },
        { info: `bamToFastq -i ${sampleInput.inputFile} -fq ${outputFile}` },
        { info: 'script finished' },
        { progress: 100 }
      ];
      const observable = service.conversion(Object.assign({}, sampleInput, { secondNameOutputFilename: 'ee' }));
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
      const inputData = Object.assign({}, sampleInput, { pairEnd: true, secondNameOutputFilename: 'ee' });
      const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
      const outputFileSecondEnd = path.join(inputData.outputDirectory, inputData.secondNameOutputFilename);
      const messages = [
        { progress: 0 },
        { info: `bamToFastq -i ${inputData.inputFile} -fq ${outputFile} -fq2 ${outputFileSecondEnd}` },
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
});

const sampleInput = {
  inputFile: 'aa/bb',
  outputDirectory: 'cc',
  outputFilename: 'dd'
};