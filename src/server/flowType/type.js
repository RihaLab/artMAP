/**
 * @summary Description
 *
 * @author Peter Javorka <peter.javorka@artin.cz>
 * @since 4/7/17.
 * @flow
 */

import type { Observable as ObservableType } from 'rxjs';

export type Script = {
  command: string,
  params: Array<string>,
  cwd?: string,
  output?: string
}

export type SubtractionPayload = {
  controlFile: string,
  mutatedFile: string,
  outputDirectory: string,
  outputFilename: string,
  params: {[string]: string}
}

export type BamConversionPayload = OperationPayload & BamConversionAddition
export type QualityControlPayload = OperationPayload & QualityControlAddition
export type AlignmentPayload = OperationPayload & AlignmentAddition
export type SamConversionPayload = OperationPayload & SamConversionAddition
export type SnpCallerPayload = OperationPayload
export type PipelinePayload = SubtractionPayload & PipelineAddition
export type SnpFiltrationPayload = OperationPayload
export type Observable = ObservableType<*>

export type AnnotationPayload = {
  inputFile: string,
  outputDirectory: string,
  outputFilename: string
}

type OperationPayload = {
  inputFile: string,
  outputDirectory: string,
  outputFilename: string,
  params: {[string]: string}
}

type BamConversionAddition = {
  secondNameOutputFilename?: string,
  pairEnd: boolean
}

type QualityControlAddition = {
  pairEnd: boolean
}

type AlignmentAddition = {
  pairEnd: boolean,
  bigBP: boolean,
  pairedInputFile?: string,
  memParams: {[string]: string},
  alnParams: {[string]: string},
  samseParams: {[string]: string},
  sampeParams: {[string]: string}
}

type SamConversionAddition = {
  viewParams: {[string]: string},
  sortParams: {[string]: string}
}

type PipelineAddition = {
  skipQualityControl: boolean,
  skipBamConversion: boolean,
  pairEnd: boolean,
  bigBP: boolean,
  controlFileSE?: string,
  mutatedFileSE?: string
}
