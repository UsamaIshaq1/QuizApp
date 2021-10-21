import Auth from './Auth'
import Config from './Config'
import Score from './Score'
import { combineReducers } from 'redux'

export default combineReducers({
    Auth: Auth,
    Config: Config,
    Score: Score
});
