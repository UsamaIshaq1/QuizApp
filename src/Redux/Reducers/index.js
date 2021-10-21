import Auth from './Auth'
import Config from './Config'
import Score from './Score'
import Questions from './Questions'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    Questions:Questions,
    Config: Config,
    Score: Score
});
