import * as Phaser from 'phaser';

export class Settings extends Phaser.Scene {
  constructor() {
    super('settings');
  }

  create() {
    const center_x = this.game.canvas.width / 2;
    const center_y = this.game.canvas.height / 2;
    
    const english_settings = this.add.text(center_x, center_y - 80, 'English', { fontFamily: 'Silkscreen', color: '#D3B02C', fontSize: '35px'}).setOrigin(0.5);
    const other_settings = this.add.text(center_x, center_y - 40, 'Not English', { fontFamily: 'Silkscreen', color: '#D3B02C', fontSize: '35px'}).setOrigin(0.5);
    const settings_intro = this.add.text(center_x, center_y, 'Settings', { fontFamily: 'Silkscreen', color: '#D3B02C', fontSize: '60px'}).setOrigin(0.5);

    this.tweens.add({ 
      targets: [settings_intro],
      y: center_y - 175,
      duration: 2000,
      ease: 'Power2',
    });

    this.tweens.add({
      targets: [english_settings, settings_intro, other_settings],
      alpha: 0,
      duration: 8000, // returns to main menu after 8 seconds, temp 
      onComplete: () => { 
        this.scene.start('menu'); }
    })
  }

  update() {
    // game logic here
  }
}
