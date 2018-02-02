import { Observable } from 'rxjs';
import { spawn, exec } from 'child_process';
import { createWriteStream } from 'fs';
import createLogger from 'debug';

const log = createLogger('dna:util:script');

export function fromScript(script) {
  if (script.output) {
    return runScriptToFile(script);
  }
  return Observable.create((observer) => {
    const info = `Running script: ${script.command} ${script.params.join(' ')}${script.cwd ? `from ${script.cwd}` : ''}`;
    observer.next({ info });

    let process = spawn(script.command, script.params, { cwd: script.cwd });

    process.on('error', err => observer.error(err));
    process.stdout.on('data', msg => observer.next({ info: msg.toString() }));
    process.stderr.on('data', msg => observer.next({ info: msg.toString() }));

    process.on('close', (code) => {
      process = null;
      const msg = `Script finished with exit code ${code}`;
      observer.next({ info: msg });
      if (code === 0) {
        return observer.complete();
      }
      return observer.error({ err: new Error(`Script finished with exit code ${code}`) });
    });
    return () => abortProcess(process);
  });
}

export function execScript(script) {
  return Observable.create((observer) => {
    observer.next({ info: `Running script: ${script}` });
    let process = exec(script, (error, stdout, stderr) => {
      process = null;
      observer.next({ info: stderr });
      if (error) {
        log('I AM HERE!!!!!!!', error);
        observer.error({ err: error });
      }
      observer.complete();
    });
    return () => abortProcess(process);
  });
}

function runScriptToFile(script) {
  return Observable.create((observer) => {
    const { output, command, params } = script;
    const outputFileWriteStream = createWriteStream(output);
    const info = `Running script: ${command} ${params.join(' ')} > ${output}${script.cwd ? `from ${script.cwd}` : ''}`;
    observer.next({ info });
    let process = spawn(script.command, script.params, { cwd: script.cwd });
    process.stdout.pipe(outputFileWriteStream);
    process.stderr.on('data', msg => observer.next({ info: msg.toString() }));
    process.on('error', msg => observer.error({ err: msg }));
    process.on('close', (code) => {
      process = null;
      const msg = `Script finished with exit code ${code}`;
      observer.next({ info: msg });
      if (code === 0) {
        return observer.complete();
      }
      return observer.error({ err: new Error(`Script finished with exit code ${code}`) });
    });
    outputFileWriteStream.on('error', err => observer.error(err));
    return () => abortProcess(process);
  });
}

function abortProcess(process) {
  if (process !== null) {
    log('Aborting process');
    process.kill(1);
  } else {
    log('Unsubscribing finished process');
  }
}
