import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Field from '../Field'
import PlayerCard from './PlayerCard'
import update from 'immutability-helper'
import { DropTarget } from 'react-dnd'
import './core.css'

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		item: monitor.getItem()
	}
}

const styles = theme => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
})

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

// const { classes } = this.props
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
						(player.left = 0), (player.top = 0), (player.position = '')
					)
				)
				players['position_t:forward'].doclist.docs.map(
					player => (
						(player.left = 0), (player.top = 0), (player.position = '')
					)
				)
				players['position_t:midfielder'].doclist.docs.map(
					player => (
						(player.left = 0), (player.top = 0), (player.position = '')
					)
				)
				players['position_t:goalkeeper'].doclist.docs.map(
					player => (
						(player.left = 0), (player.top = 0), (player.position = '')
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
				<div container spacing={24} className="appContainer">
					<div item xs={12} sm={8} className="field">
						<Field />
					</div>
					<div item xs={12} sm={4} className="lineup">
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
									//player={player}
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
// FullWidthGrid.propTypes = {
// 	classes: PropTypes.object.isRequired
// }

// export default withStyles(styles)(FullWidthGrid)
export default DropTarget('PlayerCard', dropTarget, connect => ({
	connectDropTarget: connect.dropTarget()
	// withStyles: withStyles(styles)
}))(FullWidthGrid)
