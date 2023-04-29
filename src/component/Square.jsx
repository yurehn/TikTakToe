const Square = ({ children, makeMark, boardIndex, boxWin }) => {
  const colorWinningBox = `${boxWin.includes(boardIndex + 1) ? 'winner' : ''}`
  const colorCheckedBox = `${children ? 'checkedBox' : ''}`

  const handleClick = () => {
    // If it has already been marked, it returns
    if (children || boxWin.length > 0) return
    makeMark(boardIndex)
  }

  return (
    <div
      className={`square ${colorWinningBox} ${colorCheckedBox}`}
      onClick={handleClick}
    >
      {children}
    </div>
  )
}

export default Square
