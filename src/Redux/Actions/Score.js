import { GETSCORE } from '../Types';
export const totalScore = payload => {
    return {
        type: GETSCORE,
        payload: payload
    }
};
