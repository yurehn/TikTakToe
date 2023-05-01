import { useState } from "react";
import confetti from 'canvas-confetti'
import { INITIALGAME, INITIALWINNINGBOXES, TURNS } from './constants.js'
import Square from './component/Square.jsx'


const verifyWinner = (game, boxesWinners) => {

  let result = {
    winner: false,
    boxWinner: [],
    newWinningBoxes: boxesWinners
  }

  for (const arr of boxesWinners) {
    const [a, b, c] = arr.map((position) => game[position - 1])

    if ([a, b, c].includes(null)) continue

    if (a === b && a === c) {
      result.winner = true
      result.boxWinner = arr
    } else {
      result.newWinningBoxes = result.newWinningBoxes.filter(array => array !== arr)
    }
  }

  return result
}


function App() {

  const [boxesWinners, setBoxesWinners] = useState(INITIALWINNINGBOXES)
  const [game, setGame] = useState(INITIALGAME)

  const [actualPlayer, setActualPlayer] = useState(TURNS.X)
  const [boxWin, setBoxWin] = useState([])
  const [winner, setWinner] = useState(false)


  const makeMark = (boardIndex) => {

    const newGame = [...game]
    newGame[boardIndex] = actualPlayer
    setGame(newGame)

    let { winner, boxWinner, newWinningBoxes } = verifyWinner(newGame, boxesWinners)

    if (winner) {
      setBoxWin(boxWinner)
      setWinner(true)
      confetti();

    } else {
      setBoxesWinners(newWinningBoxes)
      setActualPlayer(actualPlayer === TURNS.X ? TURNS.O : TURNS.X)
    }
  }

  const reset = () => {
    setGame(INITIALGAME)
    setBoxesWinners(INITIALWINNINGBOXES)
    setActualPlayer(TURNS.X)
    setBoxWin([])
    setWinner(false)
  }

  return (
    <div className="game">
      <div className="infoPanel">
        {
          boxesWinners.length === 0 ? (
            <div className="panel panelTie">
              <span> Tie!</span>
            </div>
          ) : (
            winner ? (
              <div className="panel panelWinner">
                <div>{actualPlayer} <span> Win!</span></div>
              </div>
            ) : (
              <div className="instructionPanel">
                Next player: <span>{actualPlayer}</span>
              </div>
            )
          )
        }
      </div>
      <div className="board">
        {
          game.map((value, index) => {
            return (
              <Square
                key={index}
                makeMark={makeMark}
                boardIndex={index}
                boxWin={boxWin}
              >
                {value}
              </Square>
            )
          })
        }
      </div>
      <button className="buttonReset" onClick={reset}>
        Reset
      </button>
    </div>
  )
}

export default App;
