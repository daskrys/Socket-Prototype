import * as Phaser from 'phaser';
// /import { io } from 'socket.io-client';

export class Team extends Phaser.Scene {
  constructor() {
    super('test');
  }

  create() {
    this.cameras.main.setBackgroundColor(0x141413);
    const center_x = this.game.canvas.width / 2;
    const center_y = this.game.canvas.height / 2;
    
    const team_intro = this.add.text(center_x, center_y, 'Team 24', { fontFamily: 'Silkscreen' ,color: '#D3B02C', fontSize: '50px'}).setOrigin(0.5);
    const game_name = this.add.text(center_x, center_y - 80, 'Bite-Sized Dungeons', { fontFamily: 'Silkscreen', color: '#D3B02C', fontSize: '55px'}).setOrigin(0.5);

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
  }

  update() {
    // game logic here
  }
}
