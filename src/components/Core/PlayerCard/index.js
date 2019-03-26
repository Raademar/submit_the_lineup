import React, { Component } from 'react'
import './playercard.css'
import { DragSource } from 'react-dnd'

const cardSource = {
	beginDrag(props) {
		const { id, left, top } = props
		return { id, left, top }
	}
}

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging()
	}
}

class PlayerCard extends Component {
	render() {
		const { isDragging, connectDragSource, player, left, top } = this.props
		const styles = {
			opacity: isDragging ? 0 : 1,
			top: top,
			left: left,
			position: this.props.position,
			padding: '0.5rem 1rem',
			cursor: 'move'
		}

		return connectDragSource(
			<div>
				<div className="cardContainer" style={styles}>
					<div className="cardTop">
						<p>{this.props.name}</p>
						<span># {this.props.number}</span>
					</div>
					<div className="cardMain">
						<img src={this.props.image} alt="" />
					</div>
				</div>
			</div>
		)
	}
}

export default DragSource('PlayerCard', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(PlayerCard)
