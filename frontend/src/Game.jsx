import { useState, useMemo, useCallback, useEffect } from "react"
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js"
import CustomDialog from "./components/CustomDialog"

function Game({ players, room, orientation, cleanup }) {
  const chess = useMemo(() => new Chess(), [])
  const [fen, setFen] = useState(chess.fen())
  const [over, setOver] = useState("")
  const [overText, setOverText] = useState("")

  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chess.move(move)
        setFen(chess.fen())

        console.log("over, checkmate", chess.isGameOver(), chess.isCheckmate())

        if (chess.isGameOver()) {
          if (chess.isCheckmate()) {
            setOver(
              `Checkmate, God! ${chess.turn() === "w" ? "Black" : "white"} wins!`
            )
            setOverText("Protect ya neck!")
          } else if (chess.isDraw()) {
            setOver("Draw. Is that even possible in chess?")
          } else {
            setOver("This game's a wrap")
          }
        }
        return result
      } catch (e) {
        return null
      }
    },
    [chess]
  )

  function onDrop(sourceSqaure, targetSquare) {
    const moveData = {
      from: sourceSqaure,
      to: targetSquare,
      color: chess.turn(),
      promotion: "q",
    }
    const move = makeAMove(moveData)

    if (move === null) {
      setOver("Invalid move.")
      setOverText("Stop playin', b.")
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <div className="board">
        <Chessboard position={fen} onPieceDrop={onDrop} />
      </div>
      <CustomDialog open={Boolean(over)} title={over} contentText={overText} handleContinue={() => { setOver("") }} />
    </>
  )
}
export default Game
