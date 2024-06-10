const express = require('express')
const { Server } = require("socket.io")
const { v4: uuidV4 } = require('uuid')
const http = require('http')

const app = express()
const server = http.createServer(app)

const port = process.env.PORT || 8090
const io = new Server(server, { cors: '*' })

const rooms = new Map()

server.listen(port, () => {
  console.log(`listening on *:${port}`)
})

io.on('connection', (socket) => {
  console.log(socket.id, 'connected like a mf')
  socket.on('username', (username) => {
    console.log('username', username)
    socket.data.username = username
  })

  socket.on('createRoom', async (callback) => {
    const roomId = uuidV4()
    await socket.join(roomId)

    rooms.set(roomId, {
      roomId,
      players: [{ id: socket.id, username: socket.data?.username }]
    })

    callback(roomId)
  })

  socket.on('joinRoom', async (args, callback) => {
    const room = rooms.get(args.roomId)
    let error, message;

    if (!room) {
      error = true
      message = "Chamber does not exist"
    } else if (room.length <= 0) {
      error = true
      message = "Ain't nobody here, b"
    } else if (room.length >= 2) {
      error = true
      message = "This chamber is occupied"
    }

    if (error) {
      if (callback) {
        callback({
          error,
          message
        })
      }
      return
    }
    await socket.join(args.roomId)
    const roomUpdate = {
      ...room,
      players: [
        ...room.players,
        { id: socket.id, username: socket.data?.username }
      ]
    }
    rooms.set(args.roomId, roomUpdate)
    callback(roomUpdate)
  })
})
