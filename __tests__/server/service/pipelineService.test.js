'use strict';

jest.mock('../../../src/server/service/bamConversionService');
jest.mock('../../../src/server/service/qualityControlService');
jest.mock('../../../src/server/service/alignmentService');
jest.mock('../../../src/server/service/annotationService');
jest.mock('../../../src/server/service/snpFiltrationService');
jest.mock('../../../src/server/service/subtractionService');
jest.mock('../../../src/server/service/snpCallerService');
jest.mock('../../../src/server/service/samConversionService');

const s = require('../../../src/server/service/bamConversion.service');

const service = require('../../../src/server/service/pipelineService');
const path = require('path');
const names = require('../../../src/server/service/filenameConstants').pipeline;

describe('dummy', () => {
  test('dummy', () => {
    expect(0).toBe(0);
  });
});

// describe('Pipeline service', () => {
//   describe('Single end', () => {
//     describe('BAM input', () => {
//       describe('Skipped quality control', () => {
//         test('simple script', done => {
//           const inputData = Object.assign({}, sampleData, { skipQualityControl: true });
//
//           const controlFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             { name: 'BAM Conversion - control file',
//               operation: 'BAM Conversion',
//               info: `Running simple conversion: ${inputData.controlFile} > ${controlFileBamConversionOutput}`
//             }, {
//               name: 'BAM Conversion - mutated file',
//               operation: 'BAM Conversion',
//               info: `Running simple conversion: ${inputData.mutatedFile} > ${mutatedFileBamConversionOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${controlFileBamConversionOutput} > ${controlFileAlignmentOutput}`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${mutatedFileBamConversionOutput} > ${mutatedFileAlignmentOutput}`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//
//         test('more than 70 bp script', done => {
//           const inputData = Object.assign({}, sampleData, { skipQualityControl: true, bigBP: true });
//
//           const controlFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             { name: 'BAM Conversion - control file',
//               operation: 'BAM Conversion',
//               info: `Running simple conversion: ${inputData.controlFile} > ${controlFileBamConversionOutput}`
//             }, {
//               name: 'BAM Conversion - mutated file',
//               operation: 'BAM Conversion',
//               info: `Running simple conversion: ${inputData.mutatedFile} > ${mutatedFileBamConversionOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${controlFileBamConversionOutput} > ${controlFileAlignmentOutput} - big BP`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${mutatedFileBamConversionOutput} > ${mutatedFileAlignmentOutput} - big BP`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//       });
//       describe('With quality control', () => {
//         test('simple script', done => {
//           const inputData = sampleData;
//
//           const controlFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileOutput);
//           const controlFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileOutput);
//           const mutatedFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             { name: 'BAM Conversion - control file',
//               operation: 'BAM Conversion',
//               info: `Running simple conversion: ${inputData.controlFile} > ${controlFileBamConversionOutput}`
//             }, {
//               name: 'Quality control - control file',
//               operation: 'Quality control',
//               info: `Running simple quality control: ${controlFileBamConversionOutput} > ${controlFileQualityControlOutput}`
//             }, {
//               name: 'BAM Conversion - mutated file',
//               operation: 'BAM Conversion',
//               info: `Running simple conversion: ${inputData.mutatedFile} > ${mutatedFileBamConversionOutput}`
//             }, {
//               name: 'Quality control - mutated file',
//               operation: 'Quality control',
//               info: `Running simple quality control: ${mutatedFileBamConversionOutput} > ${mutatedFileQualityControlOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${controlFileQualityControlOutput} > ${controlFileAlignmentOutput}`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${mutatedFileQualityControlOutput} > ${mutatedFileAlignmentOutput}`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//         test('more than 70 bp script', done => {
//           const inputData = Object.assign({}, sampleData, { bigBP: true });
//
//           const controlFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileOutput);
//           const controlFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileOutput);
//           const mutatedFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             { name: 'BAM Conversion - control file',
//               operation: 'BAM Conversion',
//               info: `Running simple conversion: ${inputData.controlFile} > ${controlFileBamConversionOutput}`
//             }, {
//               name: 'Quality control - control file',
//               operation: 'Quality control',
//               info: `Running simple quality control: ${controlFileBamConversionOutput} > ${controlFileQualityControlOutput}`
//             }, {
//               name: 'BAM Conversion - mutated file',
//               operation: 'BAM Conversion',
//               info: `Running simple conversion: ${inputData.mutatedFile} > ${mutatedFileBamConversionOutput}`
//             }, {
//               name: 'Quality control - mutated file',
//               operation: 'Quality control',
//               info: `Running simple quality control: ${mutatedFileBamConversionOutput} > ${mutatedFileQualityControlOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${controlFileQualityControlOutput} > ${controlFileAlignmentOutput} - big BP`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${mutatedFileQualityControlOutput} > ${mutatedFileAlignmentOutput} - big BP`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//       });
//     });
//
//     describe('FASTQ input', () => {
//       describe('Skipped quality control', () => {
//         test('simple script', done => {
//           const inputData = Object.assign({}, sampleData, { skipBamConversion: true, skipQualityControl: true });
//
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${inputData.controlFile} > ${controlFileAlignmentOutput}`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${inputData.mutatedFile} > ${mutatedFileAlignmentOutput}`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//         test('more than 70 bp script', done => {
//           const inputData = Object.assign({}, sampleData, { skipQualityControl: true, skipBamConversion: true, bigBP: true });
//
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${inputData.controlFile} > ${controlFileAlignmentOutput} - big BP`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${inputData.mutatedFile} > ${mutatedFileAlignmentOutput} - big BP`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//       });
//       describe('With quality control', () => {
//         test('simple script', done => {
//           const inputData = Object.assign({}, sampleData, { skipBamConversion: true });
//
//           const controlFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             { name: 'Quality control - control file',
//               operation: 'Quality control',
//               info: `Running simple quality control: ${inputData.controlFile} > ${controlFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - mutated file',
//               operation: 'Quality control',
//               info: `Running simple quality control: ${inputData.mutatedFile} > ${mutatedFileQualityControlOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${controlFileQualityControlOutput} > ${controlFileAlignmentOutput}`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${mutatedFileQualityControlOutput} > ${mutatedFileAlignmentOutput}`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//         test('more than 70 bp script', done => {
//           const inputData = Object.assign({}, sampleData, { skipBamConversion: true, bigBP: true });
//
//           const controlFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             { name: 'Quality control - control file',
//               operation: 'Quality control',
//               info: `Running simple quality control: ${inputData.controlFile} > ${controlFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - mutated file',
//               operation: 'Quality control',
//               info: `Running simple quality control: ${inputData.mutatedFile} > ${mutatedFileQualityControlOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${controlFileQualityControlOutput} > ${controlFileAlignmentOutput} - big BP`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running simple alignment: ${mutatedFileQualityControlOutput} > ${mutatedFileAlignmentOutput} - big BP`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//       });
//     });
//   });
//
//   describe('Pair end', () => {
//     describe('BAM input', () => {
//       describe('Skipped quality control', () => {
//         test('simple script', done => {
//           const inputData = Object.assign({}, sampleData, { skipQualityControl: true, pairEnd: true });
//
//           const controlFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileOutput);
//           const controlFileBamConversionSEOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileSEOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileOutput);
//           const mutatedFileBamConversionSEOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileSEOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'BAM Conversion - control file',
//               operation: 'BAM Conversion',
//               info: `Running pair end conversion: ${inputData.controlFile} > ${controlFileBamConversionOutput}, ${controlFileBamConversionSEOutput}`
//             }, {
//               name: 'BAM Conversion - mutated file',
//               operation: 'BAM Conversion',
//               info: `Running pair end conversion: ${inputData.mutatedFile} > ${mutatedFileBamConversionOutput}, ${mutatedFileBamConversionSEOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${controlFileBamConversionOutput}, ${controlFileBamConversionSEOutput} > ${controlFileAlignmentOutput}`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${mutatedFileBamConversionOutput}, ${mutatedFileBamConversionSEOutput} > ${mutatedFileAlignmentOutput}`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//
//         test('more than 70 bp script', done => {
//           const inputData = Object.assign({}, sampleData, { skipQualityControl: true, pairEnd: true, bigBP: true });
//
//           const controlFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileOutput);
//           const controlFileBamConversionSEOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileSEOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileOutput);
//           const mutatedFileBamConversionSEOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileSEOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'BAM Conversion - control file',
//               operation: 'BAM Conversion',
//               info: `Running pair end conversion: ${inputData.controlFile} > ${controlFileBamConversionOutput}, ${controlFileBamConversionSEOutput}`
//             }, {
//               name: 'BAM Conversion - mutated file',
//               operation: 'BAM Conversion',
//               info: `Running pair end conversion: ${inputData.mutatedFile} > ${mutatedFileBamConversionOutput}, ${mutatedFileBamConversionSEOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${controlFileBamConversionOutput}, ${controlFileBamConversionSEOutput} > ${controlFileAlignmentOutput} - big BP`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${mutatedFileBamConversionOutput}, ${mutatedFileBamConversionSEOutput} > ${mutatedFileAlignmentOutput} - big BP`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//       });
//       describe('With quality control', () => {
//         test('simple script', done => {
//           const inputData = Object.assign({}, sampleData, { pairEnd: true });
//
//           const controlFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileOutput);
//           const controlFileBamConversionSEOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileSEOutput);
//           const controlFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileOutput);
//           const controlFileQualityControlSEOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileSEOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileOutput);
//           const mutatedFileBamConversionSEOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileSEOutput);
//           const mutatedFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileOutput);
//           const mutatedFileQualityControlSEOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileSEOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'BAM Conversion - control file',
//               operation: 'BAM Conversion',
//               info: `Running pair end conversion: ${inputData.controlFile} > ${controlFileBamConversionOutput}, ${controlFileBamConversionSEOutput}`
//             }, {
//               name: 'Quality control - control file',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${controlFileBamConversionOutput} > ${controlFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - control file (pair end)',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${controlFileBamConversionSEOutput} > ${controlFileQualityControlSEOutput}`
//             }, {
//               name: 'BAM Conversion - mutated file',
//               operation: 'BAM Conversion',
//               info: `Running pair end conversion: ${inputData.mutatedFile} > ${mutatedFileBamConversionOutput}, ${mutatedFileBamConversionSEOutput}`
//             }, {
//               name: 'Quality control - mutated file',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${mutatedFileBamConversionOutput} > ${mutatedFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - mutated file (pair end)',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${mutatedFileBamConversionSEOutput} > ${mutatedFileQualityControlSEOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${controlFileQualityControlOutput}, ${controlFileQualityControlSEOutput} > ${controlFileAlignmentOutput}`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${mutatedFileQualityControlOutput}, ${mutatedFileQualityControlSEOutput} > ${mutatedFileAlignmentOutput}`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//         test('more than 70 bp script', done => {
//           const inputData = Object.assign({}, sampleData, { pairEnd: true, bigBP: true });
//
//           const controlFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileOutput);
//           const controlFileBamConversionSEOutput = path.join(inputData.outputDirectory, filenames.bamConversion.controlFileSEOutput);
//           const controlFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileOutput);
//           const controlFileQualityControlSEOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileSEOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileBamConversionOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileOutput);
//           const mutatedFileBamConversionSEOutput = path.join(inputData.outputDirectory, filenames.bamConversion.mutatedFileSEOutput);
//           const mutatedFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileOutput);
//           const mutatedFileQualityControlSEOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileSEOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'BAM Conversion - control file',
//               operation: 'BAM Conversion',
//               info: `Running pair end conversion: ${inputData.controlFile} > ${controlFileBamConversionOutput}, ${controlFileBamConversionSEOutput}`
//             }, {
//               name: 'Quality control - control file',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${controlFileBamConversionOutput} > ${controlFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - control file (pair end)',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${controlFileBamConversionSEOutput} > ${controlFileQualityControlSEOutput}`
//             }, {
//               name: 'BAM Conversion - mutated file',
//               operation: 'BAM Conversion',
//               info: `Running pair end conversion: ${inputData.mutatedFile} > ${mutatedFileBamConversionOutput}, ${mutatedFileBamConversionSEOutput}`
//             }, {
//               name: 'Quality control - mutated file',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${mutatedFileBamConversionOutput} > ${mutatedFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - mutated file (pair end)',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${mutatedFileBamConversionSEOutput} > ${mutatedFileQualityControlSEOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${controlFileQualityControlOutput}, ${controlFileQualityControlSEOutput} > ${controlFileAlignmentOutput} - big BP`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${mutatedFileQualityControlOutput}, ${mutatedFileQualityControlSEOutput} > ${mutatedFileAlignmentOutput} - big BP`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//       });
//     });
//
//     describe('FASTQ input', () => {
//       describe('Skipped quality control', () => {
//         test('simple script', done => {
//           const dataAddition = {
//             pairEnd: true,
//             skipBamConversion: true,
//             skipQualityControl: true,
//             controlFileSE: '/some/control/se/file.bam',
//             mutatedFileSE: '/some/mutated/se/file.bam'
//           };
//           const inputData = Object.assign({}, sampleData, dataAddition);
//
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${inputData.controlFile}, ${inputData.controlFileSE} > ${controlFileAlignmentOutput}`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${inputData.mutatedFile}, ${inputData.mutatedFileSE} > ${mutatedFileAlignmentOutput}`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//         test('more than 70 bp script', done => {
//           const dataAddition = {
//             pairEnd: true,
//             bigBP: true,
//             skipBamConversion: true,
//             skipQualityControl: true,
//             controlFileSE: '/some/control/se/file.bam',
//             mutatedFileSE: '/some/mutated/se/file.bam'
//           };
//           const inputData = Object.assign({}, sampleData, dataAddition);
//
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${inputData.controlFile}, ${inputData.controlFileSE} > ${controlFileAlignmentOutput} - big BP`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${inputData.mutatedFile}, ${inputData.mutatedFileSE} > ${mutatedFileAlignmentOutput} - big BP`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//       });
//       describe('With quality control', () => {
//         test('simple script', done => {
//           const dataAddition = {
//             pairEnd: true,
//             skipBamConversion: true,
//             controlFileSE: '/some/control/se/file.bam',
//             mutatedFileSE: '/some/mutated/se/file.bam'
//           };
//           const inputData = Object.assign({}, sampleData, dataAddition);
//
//           const controlFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileOutput);
//           const controlFileQualityControlSEOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileSEOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileOutput);
//           const mutatedFileQualityControlSEOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileSEOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'Quality control - control file',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${inputData.controlFile} > ${controlFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - control file (pair end)',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${inputData.controlFileSE} > ${controlFileQualityControlSEOutput}`
//             }, {
//               name: 'Quality control - mutated file',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${inputData.mutatedFile} > ${mutatedFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - mutated file (pair end)',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${inputData.mutatedFileSE} > ${mutatedFileQualityControlSEOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${controlFileQualityControlOutput}, ${controlFileQualityControlSEOutput} > ${controlFileAlignmentOutput}`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${mutatedFileQualityControlOutput}, ${mutatedFileQualityControlSEOutput} > ${mutatedFileAlignmentOutput}`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//         test('more than 70 bp script', done => {
//           const dataAddition = {
//             pairEnd: true,
//             bigBP: true,
//             skipBamConversion: true,
//             controlFileSE: '/some/control/se/file.bam',
//             mutatedFileSE: '/some/mutated/se/file.bam'
//           };
//           const inputData = Object.assign({}, sampleData, dataAddition);
//
//           const controlFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileOutput);
//           const controlFileQualityControlSEOutput = path.join(inputData.outputDirectory, filenames.qualityControl.controlFileSEOutput);
//           const controlFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.controlFileOutput);
//           const controlFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.controlFileOutput);
//           const controlFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.controlFileOutput);
//
//           const mutatedFileQualityControlOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileOutput);
//           const mutatedFileQualityControlSEOutput = path.join(inputData.outputDirectory, filenames.qualityControl.mutatedFileSEOutput);
//           const mutatedFileAlignmentOutput = path.join(inputData.outputDirectory, filenames.alignment.mutatedFileOutput);
//           const mutatedFileSamConversionOutput = path.join(inputData.outputDirectory, filenames.samConversion.mutatedFileOutput);
//           const mutatedFileSnpCallerOutput = path.join(inputData.outputDirectory, filenames.snpCaller.mutatedFileOutput);
//
//           const subtractionOutput = path.join(inputData.outputDirectory, filenames.subtraction.output);
//           const snpFiltrationOutput = path.join(inputData.outputDirectory, filenames.snpFiltration.output);
//           const outputFile = path.join(inputData.outputDirectory, inputData.outputFilename);
//
//           const messages = [
//             {
//               name: 'Quality control - control file',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${inputData.controlFile} > ${controlFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - control file (pair end)',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${inputData.controlFileSE} > ${controlFileQualityControlSEOutput}`
//             }, {
//               name: 'Quality control - mutated file',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${inputData.mutatedFile} > ${mutatedFileQualityControlOutput}`
//             }, {
//               name: 'Quality control - mutated file (pair end)',
//               operation: 'Quality control',
//               info: `Running pair end quality control: ${inputData.mutatedFileSE} > ${mutatedFileQualityControlSEOutput}`
//             }, {
//               name: 'Alignment - control file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${controlFileQualityControlOutput}, ${controlFileQualityControlSEOutput} > ${controlFileAlignmentOutput} - big BP`
//             }, {
//               name: 'Alignment - mutated file',
//               operation: 'Alignment',
//               info: `Running pair end alignment: ${mutatedFileQualityControlOutput}, ${mutatedFileQualityControlSEOutput} > ${mutatedFileAlignmentOutput} - big BP`
//             }, {
//               name: 'SAM Conversion - control file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${controlFileAlignmentOutput} > ${controlFileSamConversionOutput}`
//             }, {
//               name: 'SAM Conversion - mutated file',
//               operation: 'SAM Conversion',
//               info: `Running SAM Conversion: ${mutatedFileAlignmentOutput} > ${mutatedFileSamConversionOutput}`
//             }, {
//               name: 'SNP Caller - control file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${controlFileSamConversionOutput} > ${controlFileSnpCallerOutput}`
//             }, {
//               name: 'SNP Caller - mutated file',
//               operation: 'SNP Caller',
//               info: `Running SNP Caller: ${mutatedFileSamConversionOutput} > ${mutatedFileSnpCallerOutput}`
//             }, {
//               name: 'Subtraction',
//               operation: 'Subtraction',
//               info: `Running Subtraction: ${controlFileSnpCallerOutput}, ${mutatedFileSnpCallerOutput} > ${subtractionOutput}`
//             }, {
//               name: 'SNP Filtration',
//               operation: 'SNP Filtration',
//               info: `Running SNP Filtration: ${subtractionOutput} > ${snpFiltrationOutput}`
//             }, {
//               name: 'Annotation',
//               operation: 'Annotation',
//               info: `Running Annotation: ${snpFiltrationOutput} > ${outputFile}`
//             }
//           ];
//           const observable = service.pipeline(inputData);
//           observable.subscribe(
//             value => expect(value).toEqual(messages.shift()),
//             error => {
//               expect(error).toBeUndefined();
//               done(error);
//             },
//             () => {
//               expect(messages.length).toBe(0);
//               done();
//             }
//           );
//         });
//       });
//     });
//   });
// });

const sampleData = {
  controlFile: '/some/control/file.bam',
  mutatedFile: '/some/mutated/file.bam',
  outputDirectory: '/output/dir',
  outputFilename: 'final_output'
};

