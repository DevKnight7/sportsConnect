import io from 'socket.io-client';

const url: string = process.env.REACT_APP_PUSH_SERVER_URL || '';

class Socket {
  socket: any
  constructor(url: string) {
    this.socket = io(url);
  }
  loginAction(username: string, id: number) {
    console.log("loginAction called", username, id);

    this.socket.emit('userLogin', {
      userId: id,
      username
    });
  }
  logoutAction() {
    this.socket.emit('logout');
  }
  windowAction(id: number) {
    this.socket.emit('window', {
      userId: id,
    });
  }
  connectAction() {
    this.socket.on('connect', () => {
   console.log(
        'socket has been connected successfully socketId is',
        this.socket.id,
      );
    });
  }
  emitAction(emitType: string, args: any) {
    this.socket.emit(emitType, args);
  }
  onAction(onActionType: string, fn: (value: any) => void) {
    this.socket.on(onActionType, (value: any) => fn(value));
  }
  disconnect (){
    this.socket.disconnect();
  }
  getSocket() {
    return this.socket;
  }
}


export const socket = new Socket(url);
