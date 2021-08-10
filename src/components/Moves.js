import React from 'react'
import '../App.css'


const Moves = (props) => {
  return (
    <>
      <div id= "display" className="display">
        Move # {props.clickCount}
      </div>
      <div className="shuffle"> 
        <input type="Button" value={props.won ? "Restart" : "Shuffle"} onClick={props.gameShuffle} />
      </div>
      <div className="play">
        <input type="Button" value="Arrange" onClick={props.arrangeGame}/>
      </div>
     </>
  )
}

export default Moves