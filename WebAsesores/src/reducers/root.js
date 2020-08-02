import  {combineReducers} from 'redux'
import logon from './login'
import StateRoute from './stateRoute'
import DeletedRoute from './deletedRoute'
import GenerationData from './generateData'


const Root = combineReducers({
    logon,
    StateRoute
    ,DeletedRoute
    ,GenerationData
})

export default Root;