import React from 'react'
import '../App.css'

const Piece = (props) => {
  let className = 'piece pos'
  className += props.pos
  return (
    <div 
       className = {className}
       onClick = {props.won ? null : props.num <= 8 ? props.handleClick : null} 
      >
      {props.num <= 8 ? props.num : " " }
    </div>
  )
}

export default Piece;