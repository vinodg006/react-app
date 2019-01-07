import { ONSELECT, SHIFTPROCESS, RENDERCOUNT } from './actionTypes';

export const onSelect = (_obj) => {
    return {
        type: ONSELECT,
        payload: _obj
    }
}

export const shiftProcess = (_obj) => {
    return {
        type: SHIFTPROCESS,
        payload: _obj
    }
}

export const renderCount = (_obj) => {
    return {
        type: RENDERCOUNT,
        payload: _obj
    }
}
