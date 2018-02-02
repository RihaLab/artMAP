import { SHOW_ERROR, DISMISS_ERROR } from './error.action';

// eslint-disable-next-line import/prefer-default-export
export function showError(errorMessage) {
  return { type: SHOW_ERROR, errorMessage };
}

export function dismissError() {
  return { type: DISMISS_ERROR };
}
