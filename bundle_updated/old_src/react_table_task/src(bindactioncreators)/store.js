import { ONSELECT, SHIFTPROCESS, RENDERCOUNT } from './actionTypes';
import { createStore,combineReducers} from 'redux';
import initialSate from './data.js';

const datareducer = (state= initialSate, action) => {
  console.log('action fired ', action.type);
  switch (action.type) {
    case SHIFTPROCESS:
      state = {
        ...state,
        leftRows: action.payload.leftRows,
        rightRows: action.payload.rightRows
      }
      break;
    case ONSELECT:
      state = {
        ...state,
        [action.payload.position]: action.payload[action.payload.position]
      };
      break;
  }
  return state;
};

const countreducer = (state={
  leftCount : 0,
  rightCount : 0
}, action) => {
  console.log('action fired countreducer ', action.payload);
  switch (action.type) {
    case RENDERCOUNT:
      state = {
        leftCount : action.payload.leftCount,
        rightCount : action.payload.rightCount,
      }
      break;
    }
  return state;
};
const store = createStore(combineReducers({datareducer, countreducer}), initialSate);
export { store };
