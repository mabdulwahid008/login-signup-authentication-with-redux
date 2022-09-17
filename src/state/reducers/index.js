import { combineReducers } from 'redux'
import athenticateUser from './athenticateUser'

const allReducers = combineReducers({
    athenticateUser,
})

export default allReducers;