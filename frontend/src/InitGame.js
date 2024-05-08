import { Button, Stack, TextField } from "@mui/material"
import { useState } from "react"
import CustomDialog from "./components/CustomDialog"
import socket from "./socket"

function InitGame({ setRoom, setOrientation, setPlayers }) {
  const [roomDialogOpen, setRoomDialogOpen] = useState(false)
  const [roomInput, setRoomInput] = useState('')
  const [roomError, setRoomError] = useState('')

  return (
    <Stack justifyContent="center" alignItems="center" sx={{ py: 1, height: "100vh" }}>
      <CustomDialog open={roomDialogOpen} handleClose={() => setRoomDialogOpen(false)} title="Choose your chamber" contentText="Enter the cipher" handleContinue={() => {
        console.log("testing")
      }} >
        <TextField autoFocus margin="dense" id="room" label="Chamber" name="room" value={roomInput} required onChange={(e) => setRoomInput(e.target.value)} type="text" fullWidth variant="standard" error={Boolean(roomError)} helperText={!roomError ? 'Enter your chamber' : `You seek a false chamber: ${roomError}`} />
      </CustomDialog>
      <Button variant="contained" onClick={() => {
        socket.emit("createRoom", (r) => {
          console.log(r)
          setRoom(r)
          setOrientation("white")
        })
      }}>Begin</Button>
      <Button onClick={() => { setRoomDialogOpen(true) }}>Join a game</Button>
    </Stack >
  )
}

export default InitGame
