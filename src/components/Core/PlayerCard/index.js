import React from 'react'
import './playercard.css'
import { DragSource } from 'react-dnd'

const cardSource = {
	beginDrag(props) {
		const { id, left, top } = props
		return { id, left, top }
	}
}

const PlayerCard = (props) =>{
		const { isDragging, connectDragSource, left, top } = props
		const styles = {
			opacity: isDragging ? 0 : 1,
			top: top,
			left: left,
			position: props.position,
			padding: '0.5rem 1rem',
			cursor: 'move'
		}

		return connectDragSource(
			<div>
				<div className="cardContainer" style={styles}>
					<div className="cardTop">
						<p>{props.name}</p>
						<span># {props.number}</span>
					</div>
					<div className="cardMain">
						<img src={props.image} alt="" />
					</div>
				</div>
			</div>
		)
}

export default DragSource('PlayerCard', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging()
}))(PlayerCard)
