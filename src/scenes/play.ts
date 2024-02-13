import * as Phaser from 'phaser';
import { io } from 'socket.io-client';

export class Play extends Phaser.Scene {
    constructor() {
        super('play');
    }
    
    create() {
        const center_x = this.game.canvas.width / 2;
        const center_y = this.game.canvas.height / 2;
        
        const game_name = this.add.text(center_x, center_y - 80, 'Bite-Sized Dungeons', { fontFamily: 'cursive', color: 'white', fontSize: '75px'}).setOrigin(0.5);
        const connecting = this.add.text(center_x, center_y + 150, 'Connecting to Server', { fontFamily: 'cursive', color: 'white', fontSize: '50px'}).setOrigin(0.5);
        const loading = this.add.text(center_x, center_y + 200, 'Loading...', { fontFamily: 'cursive', color: 'white', fontSize: '50px'}).setOrigin(0.5);
        
        
        //this for later
        const socket = io(import.meta.env.VITE_SERVER_URL);
        socket.on('connect', () => {
            connecting.setText('Connected to Server!');
            loading.setVisible(false);
            console.log('connected to server: ' + socket.id);
        });
        
    }   
    
    update() {
        // game logic here
    }
}