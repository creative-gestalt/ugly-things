import React from 'react'
import ReactDOM from 'react-dom'
import './styles.css'
import App from './App'
import {UglyThingsContextProvider} from "./uglyThingsContext";

ReactDOM.render(
    <UglyThingsContextProvider>
        <App />
    </UglyThingsContextProvider>,
    document.getElementById('root')
)