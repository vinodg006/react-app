import { createStore, combineReducers } from 'redux';
import pagedata from './data';

const btnreducer = (state= {
    attempts: [],
    questionPointer: 0
}, action) => {

    switch (action.type) {
        case 'ONSUBMIT':
            console.log('ONSUBMIT fired');
            state= {
                ...state,
                attempts: action.payload.attempts
            }
            break;
        
        case 'ONNEXT':
            console.log('ONNEXT fired');
            state= {
                ...state,
                questionPointer: action.payload.questionPointer
            }
            break;
        case 'ONPREVIOUS':
            console.log('ONPREVIOUS fired');
            state= {
                ...state,
                questionPointer: action.payload.questionPointer
            }
            break;
    }
    return state;
}

const datareducer = (state = pagedata, action) => {

    switch (action.type) {
        case 'ONSELECT':
            console.log(action ,'ONSELECT fired');
            state = [
                ...action.payload.pagedata
            ];
            break;
    }

    return state;
}

const store = createStore(combineReducers({btnreducer, datareducer}));
export { store };