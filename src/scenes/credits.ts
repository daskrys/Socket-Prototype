import * as Phaser from 'phaser';

export class Credits extends Phaser.Scene {
  constructor() {
    super('credits');
  }

  create() {
    this.cameras.main.setBackgroundColor(0x141413);
    const center_x = this.game.canvas.width / 2;
    const center_y = this.game.canvas.height / 2;
    
    const team_name_str = "Production Lead\nVincent Kurniadjaja\n\nEngine Lead\nSooin Jung\n\nDesign Lead\nLouis Lim\n\nTesting Lead\nChristian Perez\n";

    const team_names = this.add.text(center_x, center_y, team_name_str, { fontFamily: 'Bangers' ,color: '#D3B02C', fontSize: '35px'}).setOrigin(0.5);
    const credits_intro = this.add.text(center_x, center_y, 'Credits', { fontFamily: 'Silkscreen', color: '#D3B02C', fontSize: '60px'}).setOrigin(0.5);

    this.tweens.add({ 
      targets: [credits_intro],
      y: center_y - 300,
      duration: 2000,
      ease: 'Power2',
    });

    this.tweens.add({
      targets: [credits_intro, team_names],
      alpha: 0,
      duration: 10000,
      onComplete: () => { 
        this.scene.start('menu'); } // for now just return to main menu after 15 seconds
    })
  }

  update() {
    // game logic here
  }
}