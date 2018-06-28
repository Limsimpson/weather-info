import { SET_MEASURE } from '../action';
import { SET_SIDO } from '../action';

const initialState = {
    measure: 'PM10',
    sido: 'seoul'
}

const reducer = (state=initialState, action) => {
    switch(action.type){
        case SET_MEASURE:
            return Object.assign({}, state, {
                measure: action.measure
            })

        case SET_SIDO:
            return Object.assign({}, state, {
                sido: action.sido
            })
            
        default:
            return state;
    }
}

export default reducer;