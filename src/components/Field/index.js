import React, { Component } from 'react'
import './field.css'
import { DropTarget } from 'react-dnd';

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		hovered: monitor.isOver(),
		item: monitor.getItem(),
	}
}


class Field extends Component {
	render() {
		const { connectDropTarget, hovered, item } = this.props

		return connectDropTarget(
			<div className="field">
				<img src="./football-field.png" alt="" />
			</div>
		)

	}
}

export default DropTarget('PlayerCard', {}, collect)(Field)
