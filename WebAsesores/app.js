import React from 'react'
import ReactDOM from 'react-dom'
import App from './src/components/app/app'
import { createStore, applyMiddleware } from 'redux'
import Root from './src/reducers/root'
import { Provider} from 'react-redux'
import thunk from 'redux-thunk'

let toolDEv = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()  
const middleware =[thunk,toolDEv]
const store = createStore(
    //reducer
     Root
    ,{}
    ,applyMiddleware(thunk)
)

//console.log(store.getState())
ReactDOM.render(
                <Provider store={store}>
                    <App />
                </Provider>
                , document.getElementById('container'))

//ReactDOM.render(<Footer />, document.getElementById('footer'))