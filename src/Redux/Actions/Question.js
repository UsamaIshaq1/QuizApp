import { QUESTIONS, RANDOM } from '../Types';
export const questions = payload => {
    return {
        type: QUESTIONS,
        payload: payload
    }
};
export const randomQuestions = payload => {
    return {
        type: RANDOM,
        payload: payload
    }
};