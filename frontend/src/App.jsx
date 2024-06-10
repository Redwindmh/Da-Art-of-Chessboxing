import { useState, useEffect, useCallback } from "react"
import { Container } from "@mui/material"
import Game from "./Game"
import InitGame from "./InitGame"
import TextField from '@mui/material/TextField'
import socket from "./socket"
import CustomDialog from "./components/CustomDialog"

function App() {
  const [username, setUsername] = useState('')
  const [usernameSubmitted, setUsernameSubmitted] = useState(false)

  const [room, setRoom] = useState("")
  const [orientation, setOrientation] = useState("")
  const [players, setPlayers] = useState([])

  const cleanup = useCallback(() => {
    setRoom("")
    setOrientation("")
    setPlayers("")
  }, [])

  useEffect(() => {
    // const username = prompt("Username")
    // setUsername(username)
    // socket.emit("username", username)

    socket.on("opponentJoined", (roomData) => {
      console.log("roomData", roomData)
      setPlayers(roomData.players)
    })
  }, [])

  return (
    <Container>
      <CustomDialog open={!usernameSubmitted} title="Pick a username" contextText="Speak your name, God" handleContinue={() => {
        if (!username) return
        socket.emit("username", username)
        setUsernameSubmitted(true)
      }}>
        <TextField autoFocus margin="dense" id="username" label="Username" name="username" value={username} required onChange={(e) => setUsername(e.target.value)} type="text" fullWidth variant="standard" />
      </CustomDialog>
      {room ? (
        <Game
          room={room}
          orientation={orientation}
          username={username}
          players={players}
          cleanup={cleanup}
        />
      ) : (
        <InitGame
          setRoom={setRoom}
          setOrientation={setOrientation}
          setPlayers={setPlayers}
        />
      )}
    </Container>
  )
}

export default App
