// @flow

import path from 'path';
import { Observable } from 'rxjs';
import { execScript } from './util/scriptUtil';

import type { SnpCallerPayload, Observable as ObservableType } from '../flowType/type';

// todo rewrite with process env
const referenceGenome = path.join(__dirname, '../..', 'data', 'genome.fa');

export default function snpCaller(data: SnpCallerPayload): ObservableType {
  return Observable.of({ progress: 0 })
    .concat(runScript(data)
      .map(info => Object({ info })))
    .concat(Observable.of({ progress: 100 }));
}

function runScript(data: SnpCallerPayload): ObservableType {
  const outputFile = path.join(data.outputDirectory, data.outputFilename);
  const script = `samtools mpileup -Q 30 -C50 -P Illumina -t DP,DV,INFO/DPR,DP4,SP,DV -Buf ${referenceGenome} ${data.inputFile} | bcftools view -vcg --types snps > ${outputFile}`;
  return execScript(script);
}
