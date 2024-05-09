## WebSockets - Socket.io


io -> complete circuit or server
soceket -> individual client


### each socket has an individual room whose id is same as socket id

emit ->  this will emit the message (socket.emit('message_name', message) / io.emit('message_name', message))
on ->   it is an event listener to listen or to recieve msg  ( socket.on('message_name', (messaage) => {}) )
broadcast -> used when a socket req. for msg and msg is provided to every other socket except that one  
            (socket.brodcast.emit('message_name', message))
to -> used for individual msg  socket.to(room_id | room_name).emit('message_name', message), we can add multiple   
     sockets in one room
join -> used for joining sockets in room (socket.join(room_name))
