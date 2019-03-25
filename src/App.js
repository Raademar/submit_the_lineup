import React, { Component } from 'react'
import './App.css'
import Core from './components/Core'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'

class App extends Component {
	constructor(props) {
		super(props)

		this.state = {
			lineup: [{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
				},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
				{
						name: '',
						number: 0,
						image: '',
						x: 0,
						y: 0
					},
			],
			activeTeam: {
				players: [
					{name: 'Jesse Lingard', number: 14, image: 'https://premierleague-static-files.s3.amazonaws.com/premierleague/photos/players/250x250/p109322.png'}
				]
			}
		}
	}




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
				<Core players={this.state.activeTeam.players} lineup={this.state.lineup} />
			</div>
		)
	}
}

export default DragDropContext(HTML5Backend)(App)
