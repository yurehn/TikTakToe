import { useState } from "react";
import "./index.css"

function App() {
  const initialGame = [null, null, null, null, null, null, null, null, null]

  const [game, setGame] = useState(initialGame)
  const [actualPlayer, setActualPlayer] = useState('X')

  const makeMark = (e) => {
    console.log(e);
  }

  const Square = ({makeMark, player, value}) => {
    return <div className="square">{value}</div>;
  }

  return (
    <div className="game">
      <div className="instructionPanel">
          Next player: <span>{actualPlayer}</span>
      </div>
      <div className="board">
          <div className="boardRow">
            <Square makeMark={makeMark} player={actualPlayer} value={game[0]}/>
            <Square makeMark={makeMark} player={actualPlayer} value={game[1]}/>
            <Square makeMark={makeMark} player={actualPlayer} value={game[2]}/>
          </div>
          <div className="boardRow">
            <Square />
            <Square />
            <Square />
          </div>
          <div className="boardRow">
            <Square />
            <Square />
            <Square />
          </div>
        </div>
        <button className="buttonReset" onClick={() => {setGame(initialGame)}}>Reset</button>
    </div>
  )
}

export default App;
