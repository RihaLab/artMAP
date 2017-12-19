// @flow

import createLogger from 'debug';
import { spawn, exec } from 'child_process';
import { Observable } from 'rxjs';
import { createWriteStream } from 'fs';
import type { Script, Observable as ObservableType } from '../../flowType/type';

const logger = createLogger('app:service:util:scriptUtil');

export function runScript(script: Script): ObservableType {
  return fromScript(script).map(info => Object({ info }));
}

export function fromScript(script: Script): ObservableType {
  logger('Creating Observable from script', script);
  if (script.output) {
    return runScriptToFile(script);
  }
  return Observable.create((observer) => {
    const infoMsg = `Running script: ${script.command} ${script.params.join(' ')}${script.cwd ? `from ${script.cwd}` : ''}`;
    logger(infoMsg);
    observer.next(infoMsg);

    const process = spawn(script.command, script.params, { cwd: script.cwd });

    process.stdout.on('data', info => observer.next(info.toString()));
    process.stderr.on('data', info => observer.next(info.toString()));
    process.on('close', (code) => {
      const exitMsg = `Script finished with exit code ${code}`;
      logger(exitMsg);
      observer.next(exitMsg);
      return code === 0 ? observer.complete() : observer.error(code);
    });
    return () => killProcess(process);
  });
}

export function execScript(script: string): ObservableType {
  return Observable.create((observer) => {
    logger(`Running script: ${script}`);
    observer.next(`Running script: ${script}`);

    const process = exec(script, (error, stdout, stderr) => {
      observer.next(stderr.toString());
      if (error) {
        logger(`Script finished with error ${error}`);
        return observer.error(error);
      }
      return observer.complete();
    });
    return () => killProcess(process);
  });
}

function runScriptToFile(script: Script): ObservableType {
  return Observable.create((observer) => {
    const output = { script };
    if (output) {
      const outputFileWriteStream = createWriteStream(output);
      const infoMsg = `Running script: ${script.command} ${script.params.join(' ')} > ${output}${script.cwd ? `from ${script.cwd}` : ''}`;
      logger(infoMsg);
      observer.next(infoMsg);
      outputFileWriteStream.on('open', () => {
        const process = spawn(script.command, script.params, { cwd: script.cwd });
        process.stdout.pipe(outputFileWriteStream);
        process.stderr.on('data', data => observer.next(data.toString()));
        process.on('error', err => observer.error(err));
        process.on('close', (code) => {
          const exitMsg = `Script finished with exit code ${code}`;
          logger(exitMsg);
          observer.next(exitMsg);
          return code === 0 ? observer.complete() : observer.error(code);
        });
      });
      outputFileWriteStream.on('error', err => observer.error(err));
    }
  });
}

function killProcess(process) {
  process.kill('SIGHUP');
}
