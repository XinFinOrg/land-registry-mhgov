import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
// import { createStore, compose, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { Provider } from 'react-redux'
// const store = createStore(allReducer, compose(applyMiddleware(thunk)))
ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
