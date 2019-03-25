import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Field from '../Field'
import PlayerCard from './PlayerCard'

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

const playerMoved = (name) => {
	console.log(`player ${name} dropped`)
	
}

const FullWidthGrid = (props) => {
	const { classes } = props

	return (
		<div className={classes.root}>
			<Grid container spacing={24}>
				<Grid item xs={12} sm={8} className="field">
					<Field />
				</Grid>
				<Grid item xs={12} sm={4}>
				{props.players.map((player, index) => (
					<PlayerCard 
						name={player.name}
						number={player.number}
						image={player.image}
						key={index}
						player={player}
						handleDrop={(name) =>
							playerMoved(player.name)
						} 
					/>
				))}
				</Grid>
			</Grid>
		</div>
	)
}

FullWidthGrid.propTypes = {
	classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FullWidthGrid)
