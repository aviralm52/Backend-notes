import React, { useEffect, useMemo, useState } from 'react';
import {io} from 'socket.io-client';

function App() {
  const socket = useMemo(() => io("http://localhost:3000/"), []);
  const [message, setMessage] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected', socket.id);
    })

    socket.on('welcome', (message) => {
      console.log(message);
    })

    // socket.on('msg', (message) => {
    //   console.log(message);
    // })
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('message: ', message);
    socket.emit('msg', message);
    setMessage("");
  }


  return (
    <>
        <h1>
          Hello World! from client
        </h1>
        <form action="">
          <label htmlFor="message">Message</label>
          <input type="text" name="message" value={message} onChange={(e) => setMessage(e.target.value)}/>
          <br />
          <label htmlFor="room">Room</label>
          <input type="text" name="room" id="room" value={room} onChange={(e) => setRoom(e.target.value)}/>
          <br />
          <button type='submit' onClick={handleSubmit}>Send</button>
        </form>
    </>
  )
}

export default App;
