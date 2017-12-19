/**
 *
 * @author Peter Javorka <peter.javorka@artin.cz>
 * @since 5/2/17.
 */

'use strict';
const { execFile } = require('child_process');
const path = require('path');
const fs = require('fs');

const snpsPicker = path.join(__dirname, '../../scripts/snpsPicker.js');
const version = '0.0.1';

const inputOptions = ['-i', '--input-file'];
const outputOptions = ['-o', '--output-file'];

const outputFile = path.join(__dirname, 'test-data/output.txt');
const emptyFile = path.join(__dirname, 'test-data/empty.txt');


describe('snpsPicker', () => {
  describe('edge scenarios', () => {
    test.skip('no parameters', done => {
      execFile(snpsPicker, [], (error, stdout) => {
        if ( error ) {
          done(error);
        }
        expect(stdout).toMatch(help);
        done();
      });
    });

    test.skip('bad parameter', done => {
      execFile(snpsPicker, ['-X'], (error, stdout) => {
        if ( error ) {
          expect(error.message).toMatch(new RegExp('error: unknown option'));
          done();
        }
        done(stdout);
      });
    });

    describe('missing input file', () => {
      outputOptions.forEach(option => {
        test.skip(`output with ${option} option`, done => {
          execFile(snpsPicker, [option, 'some-output.txt'], (error, stdout) => {
            if ( error ) {
              done(error);
            }
            expect(stdout).toMatch(help);
            done();
          });
        });
      });
    });

    describe('missing output file', () => {
      inputOptions.forEach(option => {
        test.skip(`input with ${option} option`, done => {
          execFile(snpsPicker, [option, 'some-input.txt'], (error, stdout) => {
            if ( error ) {
              done(error);
            }
            expect(stdout).toMatch(help);
            done();
          });
        });
      });
    });

    describe('not existing input file', () => {
      inputOptions.forEach(option => {
        test.skip(`input with ${option} option`, done => {
          execFile(snpsPicker, [option, 'not-existing-input.txt', '-o', 'some-output.txt'], (error, stdout) => {
            if ( error ) {
              expect(error.message).toMatch(new RegExp('ENOENT: no such file or directory'));
              done();
            }
            done(stdout);
          });
        });
      });
    });

    describe('not existing output directory', () => {
      outputOptions.forEach(option => {
        test.skip(`output with ${option} option`, done => {
          execFile(snpsPicker, ['-i', emptyFile, option, '/a/b/c/tt/xs/some-output.txt'], (error, stdout) => {
            if ( error ) {
              expect(error.message).toMatch(new RegExp('ENOENT: no such file or directory'));
              done();
            }
            done(stdout);
          });
        });
      });
    });
  });

  describe('processing', () => {
    afterEach(() => {
      fs.unlinkSync(outputFile);
    });

    describe('empty file', () => {
      inputOptions.forEach(inputOption => {
        outputOptions.forEach(outputOption => {
          test.skip(`input with ${inputOption}; output with ${outputOption}`, done => {
            execFile(snpsPicker, [inputOption, emptyFile, outputOption, outputFile], error => {
              if ( error ) {
                done(error);
              }
              const resultFileStream = fs.readFileSync(emptyFile);
              const outputFileStream = fs.readFileSync(outputFile);
              expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
              done();
            });
          });
        });
      });
    });

    // describe('no valid mutations, no valid DP, no valid frequency', () => {
    //   const inputFile = path.join(__dirname, 'data/snpsPicker/input/noValidMutations.txt');
    //   inputOptions.forEach(inputOption => {
    //     outputOptions.forEach(outputOption => {
    //       test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //         execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //           if ( error ) {
    //             done(error);
    //           }
    //           const resultFileStream = fs.readFileSync(emptyFile);
    //           const outputFileStream = fs.readFileSync(outputFile);
    //           expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //           done();
    //         });
    //       });
    //     });
    //   });
    // });

    // describe('no valid mutations, no valid DP, valid frequency', () => {
    //   const inputFile = path.join(__dirname, 'data/snpsPicker/input/validFrequency.txt');
    //   inputOptions.forEach(inputOption => {
    //     outputOptions.forEach(outputOption => {
    //       test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //         execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //           if ( error ) {
    //             done(error);
    //           }
    //           const resultFileStream = fs.readFileSync(emptyFile);
    //           const outputFileStream = fs.readFileSync(outputFile);
    //           expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //           done();
    //         });
    //       });
    //     });
    //   });
    // });

    // describe('no valid mutations, valid DP, no valid frequency', () => {
    //   const inputFile = path.join(__dirname, 'data/snpsPicker/input/validDP.txt');
    //   inputOptions.forEach(inputOption => {
    //     outputOptions.forEach(outputOption => {
    //       test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //         execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //           if ( error ) {
    //             done(error);
    //           }
    //           const resultFileStream = fs.readFileSync(emptyFile);
    //           const outputFileStream = fs.readFileSync(outputFile);
    //           expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //           done();
    //         });
    //       });
    //     });
    //   });
    // });

    // describe('no valid mutations, valid DP, valid frequency', () => {
    //   const inputFile = path.join(__dirname, 'data/snpsPicker/input/validFrequencyAndDP.txt');
    //   inputOptions.forEach(inputOption => {
    //     outputOptions.forEach(outputOption => {
    //       test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //         execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //           if ( error ) {
    //             done(error);
    //           }
    //           const resultFileStream = fs.readFileSync(emptyFile);
    //           const outputFileStream = fs.readFileSync(outputFile);
    //           expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //           done();
    //         });
    //       });
    //     });
    //   });
    // });

    // describe('valid mutations, no valid DP, no valid frequency', () => {
    //   const inputFile = path.join(__dirname, 'data/snpsPicker/input/validMutations.txt');
    //   inputOptions.forEach(inputOption => {
    //     outputOptions.forEach(outputOption => {
    //       test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //         execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //           if ( error ) {
    //             done(error);
    //           }
    //           const resultFileStream = fs.readFileSync(emptyFile);
    //           const outputFileStream = fs.readFileSync(outputFile);
    //           expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //           done();
    //         });
    //       });
    //     });
    //   });
    // });

    // describe('valid mutations, no valid DP, valid frequency', () => {
    //   const inputFile = path.join(__dirname, 'data/snpsPicker/input/validMutationsAndFrequency.txt');
    //   inputOptions.forEach(inputOption => {
    //     outputOptions.forEach(outputOption => {
    //       test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //         execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //           if ( error ) {
    //             done(error);
    //           }
    //           const resultFileStream = fs.readFileSync(emptyFile);
    //           const outputFileStream = fs.readFileSync(outputFile);
    //           expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //           done();
    //         });
    //       });
    //     });
    //   });
    // });

    // describe('valid mutations, valid DP, no valid frequency', () => {
    //   const inputFile = path.join(__dirname, 'data/snpsPicker/input/validMutationsAndDP.txt');
    //   inputOptions.forEach(inputOption => {
    //     outputOptions.forEach(outputOption => {
    //       test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //         execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //           if ( error ) {
    //             done(error);
    //           }
    //           const resultFileStream = fs.readFileSync(emptyFile);
    //           const outputFileStream = fs.readFileSync(outputFile);
    //           expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //           done();
    //         });
    //       });
    //     });
    //   });
    // });

    // describe('only positive matching', () => {
    //   const inputFile = path.join(__dirname, 'data/snpsPicker/input/validEntries.txt');
    //   inputOptions.forEach(inputOption => {
    //     outputOptions.forEach(outputOption => {
    //       test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //         execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //           if ( error ) {
    //             done(error);
    //           }
    //           const resultFileStream = fs.readFileSync(inputFile, 'utf-8');
    //           const outputFileStream = fs.readFileSync(outputFile, 'utf-8');
    //           expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //           done();
    //         });
    //       });
    //     });
    //   });
    // });

    // describe('mixed files', () => {
    //   describe('mixed file #1', () => {
    //     const inputFile = path.join(__dirname, 'data/snpsPicker/input/mixed1.txt');
    //     const resultFile = path.join(__dirname, 'data/snpsPicker/output/mixed1.txt');
    //     inputOptions.forEach(inputOption => {
    //       outputOptions.forEach(outputOption => {
    //         test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //           execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //             if ( error ) {
    //               done(error);
    //             }
    //             const resultFileStream = fs.readFileSync(resultFile);
    //             const outputFileStream = fs.readFileSync(outputFile);
    //             expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //             done();
    //           });
    //         });
    //       });
    //     });
    //   });
    //
    //   describe('mixed file #2', () => {
    //     const inputFile = path.join(__dirname, 'data/snpsPicker/input/mixed2.txt');
    //     const resultFile = path.join(__dirname, 'data/snpsPicker/output/mixed2.txt');
    //     inputOptions.forEach(inputOption => {
    //       outputOptions.forEach(outputOption => {
    //         test(`input with ${inputOption}; output with ${outputOption}`, done => {
    //           execFile(snpsPicker, [inputOption, inputFile, outputOption, outputFile], error => {
    //             if ( error ) {
    //               done(error);
    //             }
    //             const resultFileStream = fs.readFileSync(resultFile);
    //             const outputFileStream = fs.readFileSync(outputFile);
    //             expect(outputFileStream.toString()).toEqual(resultFileStream.toString());
    //             done();
    //           });
    //         });
    //       });
    //     });
    //   });
    // });
  });

  describe('help', () => {
    ['h', '--help'].forEach(option => {
      test(`help with ${option} option`, done => {
        execFile(snpsPicker, [option], (error, stdout) => {
          if ( error ) {
            done(error);
          }
          expect(stdout).toMatch(help);
          done();
        });
      });
    });
  });

  describe('version', () => {
    ['-V', '--version'].forEach(option => {
      test(`version with ${option} option`, done => {
        execFile(snpsPicker, [option], (error, stdout) => {
          if ( error ) {
            done(error);
          }
          expect(stdout).toMatch(new RegExp(version + '\\s+'));
          done();
        });
      });
    });
  });
});

const help = new RegExp('\\s+Usage: snpsPicker snpsPicker -i <INPUT> -o <OUTPUT>\\s+' +
  'Options:\\s+' +
  '-V,\\s--version\\s+output the version number\\s+' +
  '-i,\\s--input-file\\s+<INPUT>\\s+File location of stored snps\\s+' +
  '-o,\\s--output-file\\s+<OUTPUT>\\s+Destination file for processed snps\\s+' +
  '-h,\\s--help\\s+output usage information\\s+');