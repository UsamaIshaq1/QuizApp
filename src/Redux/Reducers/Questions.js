import {  QUESTIONS, RANDOM  } from '../Types';
const intialState = {
    questions: [],
    randomQuestions: []
}
const reducer = (state = intialState, action) => {
    switch (action.type) {
        case QUESTIONS: {
            return {
                ...state,
                questions: action.payload
            }
        }
        case RANDOM: {
            return {
                ...state,
                randomQuestions: action.payload
            }
        }
        default:
            return state

    }
}
export default reducer;