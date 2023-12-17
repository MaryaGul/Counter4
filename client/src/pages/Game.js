import React, { useContext, useState } from 'react';
import {Context} from "../index";
import Square from '../components/Square';
import '../css/GameComponents.css'
import { createGame, getGamesByUser } from '../http/userAPI';
import { calculateWinner, getNextStep, getRandomInt } from './GameUtils';

const Game = () => {
 const { user } = useContext(Context)
 const [board, setBoard] = useState(Array(25).fill(null)) // Измените размер доски на 20
 const [countStep, setCount] = useState(0)
 const winner = calculateWinner(board)

 const buttonClick = (index) => {
  const boardCopy = [...board];
  let step = 0;

  if (winner || boardCopy[index] || (index >= 20 && boardCopy[index - 5]) || (index <= 4 && boardCopy[index + 5])) return; // Разрешить размещение только на нижнюю линию или над существующим крестиком или ноликом
  boardCopy[index] = 'x';
  step++;

  const tmpwinner = calculateWinner(boardCopy);
  if (tmpwinner === null && countStep < 19) {
    index = getNextStep(boardCopy);
    boardCopy[index] = 'o';
    step++;
  }
  setCount(countStep + step)
  setBoard(boardCopy)
 
  //еще одна проверка на конец игры для записи в таблицу
  const lasttmpwinner = calculateWinner(boardCopy)
  if (lasttmpwinner !== null || countStep >= 19){ // Измените количество ходов на 19
    try {
      let bwinner = lasttmpwinner === 'x' ? true : false;
      let time = getRandomInt(2, 30);
      let data = createGame(bwinner, time, user.id)
      this.updateGames()
    } catch (e) {
      alert(e.response.data.message)
    }
  }
 }
  
 
 
 

 const startNewGame = () => {
   setBoard(Array(25).fill(null)) // Измените размер доски на 20
   setCount(0)
 }

 return (
   <div className='black_back'>

     <button
       variant={"outline-light"}
       className="start__btn"
       onClick={() => startNewGame()}>4 В РЯД!</button>

     <div className="board">
     {
       board.map((square, i) => (
         <Square
           key={i}
           value={square}
           onClick={() => buttonClick(i)} />
       ))
       }
      
     </div>

     <div className='game__info'> {winner ? "[ WIN " + winner + " ! ]"
       :
       (countStep === 16) ? "[ DRAW ! ]" : "[ YOU TURN ]"} </div> 
   </div>
 );
}

export default Game;