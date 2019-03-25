import React, { Component } from 'react'
import './playercard.css'
import { DragSource } from 'react-dnd';

const cardSource = {
  beginDrag(props) {
    console.log('dragging');
    
    return props.player
  },
  endDrag(props, monitor, component) {
    if(!monitor.didDrop()) {
      return
    }

    return props.handleDrop(props.player)
  }
}

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  }
}

class PlayerCard extends Component {
  render() {
    const { isDragging, connectDragSource, player } = this.props
    const styles = {
      opacity: isDragging ? 0 : 1,
      top: this.props.y,
      left: this.props.x,
    }

    return connectDragSource(
        <div>
        <div className="cardContainer" style={ styles }>
          <div className="cardTop">
          <h4>{this.props.name}</h4>
          <span># {this.props.number}</span>
          </div>
          <div className="cardMain">
            <img src={this.props.image} alt=""/>
          </div>
        </div>
      </div>
    )
  }
}

export default DragSource('PlayerCard', cardSource, collect)(PlayerCard)