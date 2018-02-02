import path from 'path';
import createLogger from 'debug';
import { Observable } from 'rxjs/Rx';
import { execScript } from '../util';
import filename from './pipelineOutputFilename';

const REFERENCE_GENOME = path.join(process.env.REFERENCE_GENOME_DIR, `${process.env.REFERENCE_GENOME}.fa`);
const log = createLogger('dna:service:snpCaller');

export const snpCallingControlFile = (data) => {
  const modification = {
    inputFile: path.join(data.outputDirectory, filename.samConversion.controlFileOutput),
    outputFilename: filename.snpCaller.controlFileOutput,
  };
  const payload = Object.assign({}, data, modification);

  return snpCalling(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'SNP Calling - control file' })))
    .map(info => Object.assign(info, { operation: 'SNP Calling - control file' }))
    .catch((err) => {
      log(err);
      return Observable.throw(err);
    });
};

export const snpCallingMutatedFile = (data) => {
  const modification = {
    inputFile: path.join(data.outputDirectory, filename.samConversion.mutatedFileOutput),
    outputFilename: filename.snpCaller.mutatedFileOutput,
  };
  const payload = Object.assign({}, data, modification);

  return snpCalling(payload)
    .concat(Observable.defer(() => payload.emitResult({ code: 0, operation: 'SNP Calling - mutated file' })))
    .map(info => Object.assign(info, { operation: 'SNP Calling - mutated file' }))
    .catch((err) => {
      log(err);
      return Observable.throw(err);
    });
};

function snpCalling(data) {
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const script = `samtools mpileup -Q 30 -C50 -P Illumina -t DP,DV,INFO/DPR,DP4,SP,DV -Buf ${REFERENCE_GENOME} ${data.inputFile} | bcftools view -vcg --types snps > ${outputFile}`;
  return execScript(script)
    .do(payload => log(payload.info));
}
