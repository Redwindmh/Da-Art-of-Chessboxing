import { useState } from "react"
import { Container } from "@mui/material"
import Game from "./Game"
import "./App.css"
import TextField from '@mui/material/TextField'
import socket from "./socket"
import CustomDialog from "./components/CustomDialog"

function App() {
  const [username, setUsername] = useState('')
  const [usernameSubmitted, setUsernameSubmitted] = useState(false)

  return (
    <Container>
      <CustomDialog open={!usernameSubmitted} title="Pick a username" contextText="Speak your name, God" handleContinue={() => {
        if (!username) return
        socket.emit("username", username)
        setUsernameSubmitted(true)
      }}>
        <TextField autoFocus margin="dense" id="username" label="Username" name="username" value={username} required onChange={(e) => setUsername(e.target.value)} type="text" fullWidth variant="standard" />
      </CustomDialog>
      <Game />
    </Container>
  )
}

export default App
