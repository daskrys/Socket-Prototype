import * as Phaser from 'phaser';
import { io } from 'socket.io-client';

export class Test extends Phaser.Scene {
  constructor() {
    super('test');
  }

  create() {
    this.add.text(0, 0, 'Hello World', { color: 'white' });

    const socket = io("http://localhost:3000");
    socket.on('connect', () => {
      console.log('connected to server: ' + socket.id);
    });

    // other server events here
  }

  update() {
    // game logic here
  }
}