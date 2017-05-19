import React from 'react'
import { render } from 'react-dom'
import App from './react/lib/App'
import AppState from './core/AppState'

const appState = new AppState()
render(<App appState={appState}/>, document.getElementById('root'))
