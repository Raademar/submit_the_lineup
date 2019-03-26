import React, { Component } from 'react'
import Field from '../Field'
import PlayerCard from './PlayerCard'
import update from 'immutability-helper'
import { DropTarget } from 'react-dnd'
import './core.css'

const dropTarget = {
	drop(props, monitor, component) {
		if (!component) {
			return
		}
		const item = monitor.getItem()
		const delta = monitor.getDifferenceFromInitialOffset()
		const left = Math.round(item.left + delta.x)
		const top = Math.round(item.top + delta.y)
		component.movePlayer(item.id, left, top)
		console.log(item)
	}
}

class FullWidthGrid extends Component {
	constructor(props) {
		super(props)
		this.state = {
			players: {
				defenders: [],
				forwards: [],
				midfielders: [],
				goalkeepers: []
			}
		}
	}

	componentDidMount() {
		fetch(
			'https://cdnapi.manutd.com/api/v1/en/se/all/web/list/playergrid/Team%20Level%2FFirst%20Team'
		)
			.then(res => res.json())
			.then(json => {
				const players = json.PlayerGridResponse.grouped

				players['position_t:defender'].doclist.docs.map(
					player => (
						((player.left = 0),
						(player.top = 0),
						(player.position = ''))
					)
				)
				players['position_t:forward'].doclist.docs.map(
					player => (
						((player.left = 0), (player.top = 0), (player.position = ''))
					)
				)
				players['position_t:midfielder'].doclist.docs.map(
					player => (
						((player.left = 0), (player.top = 0), (player.position = ''))
					)
				)
				players['position_t:goalkeeper'].doclist.docs.map(
					player => (
						((player.left = 0), (player.top = 0), (player.position = ''))
					)
				)

				this.setState(
					{
						players: {
							defenders: players['position_t:defender'].doclist.docs,
							forwards: players['position_t:forward'].doclist.docs,
							midfielders: players['position_t:midfielder'].doclist.docs,
							goalkeepers: players['position_t:goalkeeper'].doclist.docs
						}
					},
					() => {
						const flattenStateOfPlayers = Object.values(
							this.state.players
						).reduce((acc, curr) => {
							return acc.concat(curr)
						})
						console.log(flattenStateOfPlayers)
						this.setState({
							players: flattenStateOfPlayers
						})
					}
				)
			})
	}

	render() {
		const { connectDropTarget } = this.props
		return connectDropTarget(
			<div>
				<div className="appContainer">
					<div className="field">
						<Field />
					</div>
					<div className="lineup">
						{console.log(this.state.players)}
						{Array.isArray(this.state.players) &&
							this.state.players.map((player, index) => (
								<PlayerCard
									name={player._name}
									number={player.shirtnumber_t}
									image={`https://www.manutd.com/AssetPicker/images${
										player.celumimagesvariant_s.ImageDetails[0].CropUrl.img1x
									}`}
									key={index}
									top={player.top}
									left={player.left}
									id={index}
									position={player.position}
								/>
							))}
					</div>
				</div>
			</div>
		)
	}

	movePlayer(id, left, top) {
		console.log(id)
		this.setState(
			update(this.state, {
				players: {
					[id]: {
						$merge: { left, top },
						position: {
							$set: 'absolute'
						}
					}
				}
			})
		)
	}
}

export default DropTarget('PlayerCard', dropTarget, connect => ({
	connectDropTarget: connect.dropTarget()
}))(FullWidthGrid)
