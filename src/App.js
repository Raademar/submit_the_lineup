import React, { Component } from 'react'
import './App.css'
import Core from './components/Core'

class App extends Component {
	componentDidMount() {
		fetch(
			'https://cdnapi.manutd.com/api/v1/en/se/all/web/list/playergrid/Team%20Level%2FFirst%20Team'
		)
			.then(res => res.json())
			.then(json => console.log(json))
	}

	render() {
		return (
			<div className="App">
				<Core />
			</div>
		)
	}
}

export default App
