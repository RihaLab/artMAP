import { Observable } from 'rxjs';

export default function observableProgress(progress) {
  return Observable.of({ progress });
}

