import io from 'socket.io-client';

const setupSocket = (dispatch, username, addMessage) => {
  const newSocket = io();

  newSocket.on('newMessage', (newMessage) => {
    if (newMessage.username !== username) {
      dispatch(addMessage(newMessage));
    }
  });

  return newSocket;
};

export default setupSocket;
