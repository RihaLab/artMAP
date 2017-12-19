import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import { reducer as form } from 'redux-form';

import bamConversions from './bamConversion.reducer';
import bamSorting from './bamSorting.reducer';
import samConversions from './samConversion.reducer';
import fileSelect from './fileSelect.reducer';
import qualityControl from './qualityControl.reducer';
import snpCaller from './snpCaller.reducer';
import alignment from './alignment.reducer';
import filtration from './filtration.reducer';
import pipeline from './pipeline.reducer';
import alerts from './alert.reducer';

const rootReducer = combineReducers({
  pipeline,
  bamConversions,
  bamSorting,
  samConversions,
  fileSelect,
  qualityControl,
  snpCaller,
  alignment,
  filtration,
  alerts,
  form,
  router,
});

export default rootReducer;
