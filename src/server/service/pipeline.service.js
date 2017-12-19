/* eslint-disable max-len */
// @flow

import path from 'path';
import { Observable } from 'rxjs';

import bamConversion from './bamConversion.service';
import qualityControl from './qualityControl.service';
import alignment from './alignment.service';
import samConversion from './samConversion.service';
import snpCaller from './snpCaller.service';
import subtraction from './subtraction.service';
import snpFiltration from './snpFiltration.service';
import annotation from './annotation.service';
import visualization from './visualization.service';
import names from './constants';

import type { Observable as ObservableType, PipelinePayload } from '../flowType/type';

export default function pipeline(data: PipelinePayload): ObservableType {
  return createControlFileStep(data)
    .merge(createMutatedFileStep(data))
    .concat(createSubtractionStep(data))
    .concat(createSnpFiltrationStep(data))
    .concat(createAnnotationStep(data))
    .concat(createVisualizationStep(data));
}

function createControlFileStep(data: PipelinePayload): ObservableType {
  return createControlFileBamConversionStep(data)
    .concat(createControlFileQualityControlStep(data))
    .concat(createControlFileAlignmentStep(data))
    .concat(createControlFileSamConversionStep(data))
    .concat(createControlFileSnpCallerStep(data));
}

function createMutatedFileStep(data: PipelinePayload): ObservableType {
  return createMutatedFileBamConversionStep(data)
    .concat(createMutatedFileQualityControlStep(data))
    .concat(createMutatedFileAlignmentStep(data))
    .concat(createMutatedFileSamConversionStep(data))
    .concat(createMutatedFileSnpCallerStep(data));
}

function createControlFileBamConversionStep(data: PipelinePayload): ObservableType {
  if (data.skipBamConversion) {
    return Observable.empty();
  }
  return createBamConversionStep(data, true)
    .map(payload => Object.assign(payload, { name: 'BAM Conversion - control file' }));
}

function createMutatedFileBamConversionStep(data: PipelinePayload): ObservableType {
  if (data.skipBamConversion) {
    return Observable.empty();
  }
  return createBamConversionStep(data)
    .map(payload => Object.assign(payload, { name: 'BAM Conversion - mutated file' }));
}

function createBamConversionStep(data: PipelinePayload, isControlFile?: boolean): ObservableType {
  const modification = {
    inputFile: isControlFile ? data.controlFile : data.mutatedFile,
    outputFilename: isControlFile ? names.bamConversion.controlFileOutput : names.bamConversion.mutatedFileOutput,
    secondNameOutputFilename: isControlFile ? names.bamConversion.controlFileSEOutput : names.bamConversion.mutatedFileSEOutput,
  };
  const payload = Object.assign({}, data, modification);
  return bamConversion(payload);
}

function createControlFileQualityControlStep(data: PipelinePayload): ObservableType {
  if (data.skipQualityControl) {
    return Observable.empty();
  }
  const qualityControlObservable = createQualityControlStep(data, true)
    .map(payload => Object.assign(payload, { name: 'Quality control - control file' }));

  if (data.pairEnd) {
    return qualityControlObservable
      .concat(createQualityControlStep(data, true, true)
        .map(payload => Object.assign(payload, { name: 'Quality control - control file (pair end)' })));
  }
  return qualityControlObservable;
}

function createMutatedFileQualityControlStep(data: PipelinePayload): ObservableType {
  if (data.skipQualityControl) {
    return Observable.empty();
  }
  const qualityControlObservable = createQualityControlStep(data)
    .map(payload => Object.assign(payload, { name: 'Quality control - mutated file' }));

  if (data.pairEnd) {
    return qualityControlObservable
      .concat(createQualityControlStep(data, false, true)
        .map(payload => Object.assign(payload, { name: 'Quality control - mutated file (pair end)' })));
  }
  return qualityControlObservable;
}

function createQualityControlStep(data: PipelinePayload, isControlFile?: boolean, isSecondEnd?: boolean): ObservableType {
  const modification = {};
  if (isControlFile) {
    if (isSecondEnd) {
      modification.inputFile = data.skipBamConversion ? data.controlFileSE : path.join(data.outputDirectory, names.bamConversion.controlFileSEOutput);
      modification.outputFilename = names.qualityControl.controlFileSEOutput;
    } else {
      modification.inputFile = data.skipBamConversion ? data.controlFile : path.join(data.outputDirectory, names.bamConversion.controlFileOutput);
      modification.outputFilename = names.qualityControl.controlFileOutput;
    }
  } else if (isSecondEnd) {
    modification.inputFile = data.skipBamConversion ? data.mutatedFileSE : path.join(data.outputDirectory, names.bamConversion.mutatedFileSEOutput);
    modification.outputFilename = names.qualityControl.mutatedFileSEOutput;
  } else {
    modification.inputFile = data.skipBamConversion ? data.mutatedFile : path.join(data.outputDirectory, names.bamConversion.mutatedFileOutput);
    modification.outputFilename = names.qualityControl.mutatedFileOutput;
  }
  const payload = Object.assign({}, data, modification);
  return qualityControl(payload);
}

function createControlFileAlignmentStep(data: PipelinePayload): ObservableType {
  return createAlignmentStep(data, true)
    .map(payload => Object.assign(payload, { name: 'Alignment - control file' }));
}

function createMutatedFileAlignmentStep(data: PipelinePayload): ObservableType {
  return createAlignmentStep(data, false)
    .map(payload => Object.assign(payload, { name: 'Alignment - mutated file' }));
}

function createAlignmentStep(data: PipelinePayload, isControlFile?: boolean): ObservableType {
  const modification = {};
  if (isControlFile) {
    if (data.skipQualityControl && data.skipBamConversion) {
      modification.inputFile = data.controlFile;
      modification.pairedInputFile = data.controlFileSE;
    } else if (data.skipQualityControl && !data.skipBamConversion) {
      modification.inputFile = path.join(data.outputDirectory, names.bamConversion.controlFileOutput);
      modification.pairedInputFile = path.join(data.outputDirectory, names.bamConversion.controlFileSEOutput);
    } else {
      modification.inputFile = path.join(data.outputDirectory, names.qualityControl.controlFileOutput);
      modification.pairedInputFile = path.join(data.outputDirectory, names.qualityControl.controlFileSEOutput);
    }
    modification.outputFilename = names.alignment.controlFileOutput;
  } else {
    if (data.skipQualityControl && data.skipBamConversion) {
      modification.inputFile = data.mutatedFile;
      modification.pairedInputFile = data.mutatedFileSE;
    } else if (data.skipQualityControl && !data.skipBamConversion) {
      modification.inputFile = path.join(data.outputDirectory, names.bamConversion.mutatedFileOutput);
      modification.pairedInputFile = path.join(data.outputDirectory, names.bamConversion.mutatedFileSEOutput);
    } else {
      modification.inputFile = path.join(data.outputDirectory, names.qualityControl.mutatedFileOutput);
      modification.pairedInputFile = path.join(data.outputDirectory, names.qualityControl.mutatedFileSEOutput);
    }
    modification.outputFilename = names.alignment.mutatedFileOutput;
  }
  const payload = Object.assign({}, {
    memParams: {}, alnParams: {}, samseParams: {}, sampeParams: {},
  }, data, modification);
  return alignment(payload);
}

function createControlFileSamConversionStep(data: PipelinePayload): ObservableType {
  return createSamConversionStep(data, true)
    .map(payload => Object.assign(payload, { name: 'SAM Conversion - control file' }));
}

function createMutatedFileSamConversionStep(data: PipelinePayload): ObservableType {
  return createSamConversionStep(data, false)
    .map(payload => Object.assign(payload, { name: 'SAM Conversion - mutated file' }));
}

function createSamConversionStep(data: PipelinePayload, isControlFile?: boolean): ObservableType {
  const modification = {
    inputFile: path.join(data.outputDirectory, isControlFile ? names.alignment.controlFileOutput : names.alignment.mutatedFileOutput),
    outputFilename: isControlFile ? names.samConversion.controlFileOutput : names.samConversion.mutatedFileOutput,
  };
  const payload = Object.assign({}, { viewParams: {}, sortParams: {} }, data, modification);
  return samConversion(payload);
}

function createControlFileSnpCallerStep(data: PipelinePayload): ObservableType {
  return createSnpCallerStep(data, true)
    .map(payload => Object.assign(payload, { name: 'SNP Caller - control file' }));
}

function createMutatedFileSnpCallerStep(data: PipelinePayload): ObservableType {
  return createSnpCallerStep(data, false)
    .map(payload => Object.assign(payload, { name: 'SNP Caller - mutated file' }));
}

function createSnpCallerStep(data: PipelinePayload, isControlFile?: boolean): ObservableType {
  const modification = {
    inputFile: path.join(data.outputDirectory, isControlFile ? names.samConversion.controlFileOutput : names.samConversion.mutatedFileOutput),
    outputFilename: isControlFile ? names.snpCaller.controlFileOutput : names.snpCaller.mutatedFileOutput,
  };
  const payload = Object.assign({}, data, modification);
  return snpCaller(payload);
}

function createSubtractionStep(data: PipelinePayload): ObservableType {
  const modification = {
    controlFile: path.join(data.outputDirectory, names.snpCaller.controlFileOutput),
    mutatedFile: path.join(data.outputDirectory, names.snpCaller.mutatedFileOutput),
    outputFilename: names.subtraction.output,
  };
  const payload = Object.assign({}, data, modification);
  return subtraction(payload)
    .map(subtractionPayload => Object.assign(subtractionPayload, { name: 'Subtraction' }));
}

function createSnpFiltrationStep(data: PipelinePayload): ObservableType {
  const modification = {
    inputFile: path.join(data.outputDirectory, names.subtraction.output),
    outputFilename: names.snpFiltration.output,
  };
  const payload = Object.assign({}, data, modification);
  return snpFiltration(payload)
    .map(snpFiltrationPayload => Object.assign(snpFiltrationPayload, { name: 'SNP Filtration' }));
}

function createAnnotationStep(data: PipelinePayload): ObservableType {
  const modification = {
    inputFile: path.join(data.outputDirectory, names.snpFiltration.output),
  };
  const payload = Object.assign({}, data, modification);
  return annotation(payload)
    .map(annotationPayload => Object.assign(annotationPayload, { name: 'Annotation' }));
}

function createVisualizationStep(data: PipelinePayload): ObservableType {
  return visualization(data)
    .map(payload => Object.assign(payload, { name: 'Visualization' }));
}
