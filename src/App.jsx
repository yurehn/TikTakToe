import { useState } from "react";
import "./index.css"

const initialGame = [null, null, null, null, null, null, null, null, null]
const initialWinningBoxes = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
]

const verifyWinner = (game, boxesWinners) => {

  let newBoxesWinners = [...boxesWinners]

  for (const arr of boxesWinners) {
    const changedBox = arr.map((position) => game[position - 1])

    if (changedBox.includes(null)) {
      continue
    }

    if (changedBox[0] === changedBox[1] && changedBox[0] === changedBox[2]) {
      return {
        winner: true,
        boxWinner: arr
      }
    } else {
      newBoxesWinners = newBoxesWinners.filter(array => array !== arr)
    }
  }

  return {
    winner: false,
    newBoxesWinners: newBoxesWinners
  }
}


function App() {
  
  const [boxesWinners, setBoxesWinners] = useState(initialWinningBoxes)
  const [game, setGame] = useState(initialGame)

  const [actualPlayer, setActualPlayer] = useState('X')
  const [winner, setWinner] = useState(false)
  const [boxWin, setBoxWin] = useState([])
  

  const makeMark = (boardIndex) => {
    const newGame = [...game]
    newGame[boardIndex] = actualPlayer
    setGame(newGame)

    let data = verifyWinner(newGame, boxesWinners)

    if (data.winner) {
      setActualPlayer('--')
      setWinner(true)
      setBoxWin(data.boxWinner)
      
    } else {
      setBoxesWinners(data.newBoxesWinners)
      setActualPlayer(actualPlayer === "X" ? "O" : "X")
    }
  }

  const Square = ({ makeMark, boardIndex }) => {
    return (
      <div
        className={` square ${game[boardIndex] ? 'checkedBox' : ''} ${boxWin.includes(boardIndex + 1) ? 'winner': ''}`}
        onClick={() => !game[boardIndex] && !winner ? makeMark(boardIndex) : ''}
      >
        {game[boardIndex]}
      </div>
    )
  }

  return (
    <div className="game">
      <div className="instructionPanel">
        Next player: <span>{actualPlayer}</span>
      </div>
      <div className="board">
        <div className="boardRow">
          <Square makeMark={makeMark} boardIndex={6} />
          <Square makeMark={makeMark} boardIndex={7} />
          <Square makeMark={makeMark} boardIndex={8} />
        </div>
        <div className="boardRow">
          <Square makeMark={makeMark} boardIndex={3} />
          <Square makeMark={makeMark} boardIndex={4} />
          <Square makeMark={makeMark} boardIndex={5} />
        </div>
        <div className="boardRow">
          <Square makeMark={makeMark} boardIndex={0} />
          <Square makeMark={makeMark} boardIndex={1} />
          <Square makeMark={makeMark} boardIndex={2} />
        </div>
      </div>
      <button className="buttonReset"
        onClick={() => {
          setGame(initialGame)
          setBoxesWinners(initialWinningBoxes)
          setActualPlayer('X')
          setWinner(false)
          setBoxWin([])
        }}
      >
        Reset
      </button>
    </div>
  )
}

export default App;
