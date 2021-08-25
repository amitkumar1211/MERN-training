import React, { Component } from 'react'
import './App.css'
import ClassCounter from './components/ClassCounter'
import HookCounter from './components/HookCounter'
import HookCounterTwo from './components/HookCounterTwo'
import HookCounterThree from './components/HookCounterThree'
import ClassCounterTwo from './components/ClassCounterTwo'
import HookCounterFour from './components/HookCounterFour'
import Button from './components/Button'

class App extends Component {
	render() {
		return (
			<div className="App">
				<HookCounterThree /> 

				{/*<HookCounter />
				<ClassCounter />
				 
				<ClassCounterTwo />
				<HookCounter />
				<HookCounterTwo />
				<HookCounterThree /> 
				<HookCounterFour />
				<Button />*/}
			</div>
		)
	}
}

export default App
