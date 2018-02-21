import { rename } from 'fs';
import { Observable } from 'rxjs/Rx';

const renameAsObservable = (src, out) =>
  Observable.of({ info: `Renaming ${src} to ${out}` })
    .concat(Observable.bindNodeCallback(rename)(src, out)
      .map((err) => {
        if (err) {
          return err;
        }
        return { info: `Successfully renamed ${src} to ${out}` };
      }));

export default renameAsObservable;
