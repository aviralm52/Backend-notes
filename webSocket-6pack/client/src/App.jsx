import React, { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

function App() {
    const socket = useMemo(() => io("http://localhost:3000/"), []);
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState("");
    const [socketId, setSocketId] = useState("");
    const [roomName, setRoomName] = useState("");
    const [msgList, setMsgList] = useState([]);

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected", socket.id);
            setSocketId(socket.id);
        });

        // socket.on('welcome', (message) => {
        //   console.log(message);
        // })

        socket.on("user-message", (data) => {
            setMsgList((prev) => [...prev, data.message]);
            console.log(data.message);
        });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("msg", { message, room });
        setMessage("");
    };

    const roomHandler = (e) => {
        e.preventDefault();
        socket.emit("room-name", roomName);
        setRoomName("");
    };

    return (
        <>
            <h1>Hello World! from client</h1>
            <h3>Room Id: {socketId}</h3>

            <form action="" onSubmit={roomHandler}>
                <label htmlFor="">Room Name</label>
                <input
                    type="text"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                />
                <button type="submit">Join</button>
            </form>

            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="message">Message</label>
                <input
                    type="text"
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <br />
                <label htmlFor="room">Room</label>
                <input
                    type="text"
                    name="room"
                    id="room"
                    onChange={(e) => setRoom(e.target.value)}
                />
                <br />
                <button type="submit">Send</button>
            </form>

            {msgList.map((message) => {
                return <p>{message}</p>;
            })}
        </>
    );
}

export default App;
