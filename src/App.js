import React, { Component } from 'react'
import './App.css'
import Core from './components/Core'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class App extends Component {

	render() {
		return (
			<div className="App">
				<Core />
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(App)
