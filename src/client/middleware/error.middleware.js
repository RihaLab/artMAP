import { showError } from '../action';

const errorMiddleware = store => next => async (action) => {
  try {
    await next(action);
  } catch (err) {
    store.dispatch(showError(err.message));
  }
};

export default errorMiddleware;
