import {GETSCORE} from '../Types';
const intialState = {
  scores: null,
};
const reducer = (state = intialState, action) => {
  switch (action.type) {
    case GETSCORE: {
      return {
        ...state,
        scores: action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;
