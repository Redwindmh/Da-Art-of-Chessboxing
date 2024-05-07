import { io } from "socket.io-client"

const socket = io('localhost:8090')

export default socket
