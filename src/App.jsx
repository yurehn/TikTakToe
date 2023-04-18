import { useState } from "react";
import "./index.css"

function App() {
  const initialGame = ['', '', '', '', '', '', '', '', '']

  const [game, setGame] = useState(initialGame)
  const [winner, setWinner] = useState('')
  const [actualPlayer, setActualPlayer] = useState('X')
  const [checkedBox, setCheckedBox] = useState(0)

  const makeMark = (boardIndex) => {
    const newGame = [...game]
    newGame[boardIndex] = actualPlayer
    setGame(newGame)

    setActualPlayer(actualPlayer === "X" ? "O" : "X" )
    setCheckedBox(checkedBox + 1)
  }

  const verifyWinner = () => {
    const winningBoxes = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ]

    
    for(const arr of winningBoxes){
      const changedBox = arr.map((position) => game[position - 1])
      console.log(changedBox);

      if(changedBox[0] === changedBox[1] && changedBox[0] === changedBox[2]) {
        setWinner(changedBox[0])
        break
      }
    }

    if(winner){
      console.log('Winner');
    }else{
      console.log('No winner');
    }
  }


  const Square = ({makeMark, boardIndex}) => {
    return (
      <div className= {`square ${game[boardIndex] ? 'checkedBox' : ''}`}
        onClick={() => !game[boardIndex] ? makeMark(boardIndex) : ''}
      >
        { game[boardIndex] }
      </div>
    )
  }

  return (
    <div className="game">
      <div className="instructionPanel">
          Next player: <span>{actualPlayer}</span> Winner: {winner}
      </div>
      <div className="board">
          <div className="boardRow">
            <Square makeMark={makeMark} boardIndex={0}/>
            <Square makeMark={makeMark} boardIndex={1}/>
            <Square makeMark={makeMark} boardIndex={2}/>
          </div>
          <div className="boardRow">
            <Square makeMark={makeMark} boardIndex={3}/>
            <Square makeMark={makeMark} boardIndex={4}/>
            <Square makeMark={makeMark} boardIndex={5}/>
          </div>
          <div className="boardRow">
            <Square makeMark={makeMark} boardIndex={6}/>
            <Square makeMark={makeMark} boardIndex={7}/>
            <Square makeMark={makeMark} boardIndex={8}/>
          </div>
        </div>
        <button className="buttonReset"
          onClick={() => {
            setGame(initialGame)
            setWinner('')
          }}
        >
          Reset
        </button>
        <button className="buttonReset" onClick={verifyWinner}>Reset</button>
    </div>
  )
}

export default App;
