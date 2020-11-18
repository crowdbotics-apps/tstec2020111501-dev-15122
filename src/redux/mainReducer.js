import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { reducer as reduxFormReducer } from 'redux-form';
/**
 * You can import more reducers here
 */
//@BlueprintReduxImportInsertion
import EmailAuthReducer from '../features/BlankScreen014549/redux/reducers';
const config = {
  key: 'LIFTED_REDUX_STORE_01',
  storage: AsyncStorage,
};
//@BlueprintReduxCombineInsertion
export const appReducer = combineReducers({
  form: reduxFormReducer,
  EmailAuth: EmailAuthReducer,
});
// export const appReducer;// = persistReducer(config, appReducer);
