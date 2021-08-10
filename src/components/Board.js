import React, { useState } from 'react'
import '../App.css'
import Piece from './Piece'
import Won from './Won'
import Moves from './Moves'

//This is definition of the Board component, which is the parent of the game components
//We define and manage all the state variables here and pass the state to the children components as props
const Board = () => {
   //For the puzzle game we will store the nine grid positions in an array 
   //This array after initial shuffling, will be passed as initial state for the game
   let positions = [1,2,3,4,5,6,7,8,9]
   const winningPositions = [1,2,3,4,5,6,7,8,9]
   //Shuffle the initial position of pieces on the board 
  //This is an independent function for randomizing the element positions in an array
const shuffle = (array) => {
  return array.sort(() =>Math.random() - 0.5)
}
   positions = shuffle(positions)
   
   const [pPositions, setPiecePositions] = useState(positions)
   const [moves, incrementMoves] = useState(0)
   const [won, setWon] = useState(false)
   
  function swap(piece1, piece2) {
     [pPositions[piece1],pPositions[piece2]] = [pPositions[piece2],pPositions[piece1]]
     setPiecePositions(pPositions)
    incrementMoves(moves + 1)
     // eslint-disable-next-line no-unused-expressions
     gameWon() ? setWon(true) : null
   }
  
   function gameShuffle(){
     shuffle(pPositions)
     incrementMoves(0)
     setWon(false)
     setPiecePositions(pPositions)
   }
  
  function arrangeGame(){
    pPositions.sort()
    incrementMoves(0)
    setPiecePositions(pPositions)
  }
  //This component method checks if state array storing game moves is sorted ascending
  //If so the game is won
  function gameWon(){
    //loop one value at a time on the state array
    for (let i=0;i<pPositions.length;i++){
      //for each array position compare with a value found on the winningPositions array
      //if we find any mismatch stop the loop and return false
      if (pPositions[i]!== winningPositions[i]) return false
    }
    //No mismatch was found so function returns true, 
    //meaning player has successfully arranged the puzzle
    return true
  }
  
  function handleClick(e){
    //e.preventDefault()
    //We use the CSS className to determine where the game piece is placed
    //The class names are numbered according to the position in the game grid for the piece
    const className = e.target.className
    
    //We need the length of the class to use in extracting the position number
    const len = className.length
    
    //Extract the position number from the className, this will be used below to decide 
    //whether or not to move the clicked piece
    const pos = parseInt(className.substring(len-1,len))
    
     //Get position of the blank piece, since we need to track it's position
     //throughout the game. Essentially, a clicked piece of the puzzle can move only if
     //the blank piece is adjacent to it, left, top, right or bottom
     const blank = parseInt(pPositions.indexOf(9))
     //console.log(`Pos :${pos} and blank :${blank}`)
     //Check the position of the currently clicked piece relative to the position of the blank
     //We make these checks simply by tracking the blank from position 0 to position 8
     //The game is played by simply swapping the position of the blank piece with an adjacent
     //clicked piece
     
      //If the blank is on position 0 on the grid, then a piece on position 1 or 3 can swap
       if ((pos === 1 || pos === 3) && (blank === 0)){   
         swap(pos,blank)    
       } 
     //If the blank is on position 1 on the grid, then a piece on position 0 or 2 or 4 can swap
        if ((pos === 0 || pos === 2 || pos === 4) && (blank === 1)){
            swap(pos,blank)
        } 
     //If the blank is on position 2 on the grid, then a piece on position 1 or 5 can swap
        if ((pos === 1 || pos === 5) && blank === 2){
            swap(pos,blank)
        } 
     //If the blank is on position 3 on the grid, then a piece on position 0 or 4 or 6 can swap
        if ((pos === 0 || pos === 4 || pos === 6) && blank === 3){
            swap(pos,blank)
        } 
     //If the blank is on position 4 on the grid, then a piece on position 1 or 3 or 5 or 8 can swap
        if ((pos === 1 || pos === 3 || pos === 5 || pos === 7) && blank === 4){
            swap(pos,blank)
        } 
    //If the blank is on position 5 on the grid, then a piece on position 2 or 4 or 8 can swap
        if ((pos === 2 || pos === 4 || pos === 8) && blank === 5){
            swap(pos,blank)
        } 
     //If the blank is on position 6 on the grid, then a piece on position 3 or 7 can swap
        if ((pos === 3 || pos === 7) && blank === 6){
            swap(pos,blank)
        }  
        //If the blank is on position 7 on the grid, then a piece on position 4 or 6 or 8 can swap
        if ((pos === 4 || pos === 6 || pos === 8) && blank === 7){
            swap(pos,blank)
        }  
       //If the blank is on position 8 on the grid, then a piece on position 5 or 7 can swap
        if ((pos === 5 || pos === 7) && blank === 8){
            swap(pos,blank)
        }
          
              
     
   }
   //Render the component, here we insert all the child components forming different parts of the game
    return(
       <div className = "board">
        {/* We use the array map method to randomly place the puzzle pieces in the board
            This neater and concise compared to adding each instance of the game piece manually
            Note, we pass four props to the component instances, two of which are state 
            variables in the parent component, one is parent component method for click events.
            Two state variables, one is to track the puzzle piece's position and the second
            is to track status of whether the puzzle has been solved
        */}
        {pPositions.map(position => (
           <Piece key={position} num={position} pos={pPositions.indexOf(position)} handleClick = {handleClick} won={won}/>
        )  
       )}
        {/*Here we call a component that displays the number of moves during the game 
           until the puzzle is solved   
        */}
        <Moves clickCount ={moves} gameShuffle = {gameShuffle} arrangeGame = {arrangeGame} won = {won}/>
        {/*Here we use the ternary operator to check if it is time to inform player 
           they have won the game. This is done by monitoring the state variable 'won'
           which has a value of false by default and is set to true 
           if the puzzle is solved through play. So if won is true, we invoke the 
           child component with the same name to display the winner's message
        */}
        {won ? <Won /> : null}
       </div>
    )
}

export default Board;