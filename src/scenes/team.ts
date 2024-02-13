import * as Phaser from 'phaser';
// /import { io } from 'socket.io-client';

export class Team extends Phaser.Scene {
  constructor() {
    super('test');
  }

  create() {
    const center_x = this.game.canvas.width / 2;
    const center_y = this.game.canvas.height / 2;
    
    const team_intro = this.add.text(center_x, center_y, 'Team 24', { fontFamily: 'cursive' ,color: 'white', fontSize: '50px'}).setOrigin(0.5);
    const game_name = this.add.text(center_x, center_y - 80, 'Bite-Sized Dungeons', { fontFamily: 'cursive', color: 'white', fontSize: '75px'}).setOrigin(0.5);

    this.tweens.add({ 
      targets: [game_name],
      y: center_y - 175,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      repeat: -1
    });

    this.tweens.add({
      targets: [game_name, team_intro],
      alpha: 0,
      duration: 4000,
      onComplete: () => { 
        this.scene.start('menu'); }
    })
    
    /*
    this for later
    const socket = io(import.meta.env.VITE_SERVER_URL);
    socket.on('connect', () => {
      console.log('connected to server: ' + socket.id);
    });
    */
    // other server events here
  }

  update() {
    // game logic here
  }
}
