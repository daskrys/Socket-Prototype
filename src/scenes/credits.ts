import * as Phaser from 'phaser';

export class Credits extends Phaser.Scene {
  constructor() {
    super('credits');
  }

  create() {
    const center_x = this.game.canvas.width / 2;
    const center_y = this.game.canvas.height / 2;
    
    const team_name_str = "Vincent Kurniadjaja\n Sooin Jung\n Louis Lim\n Christian Perez\n";

    const team_names = this.add.text(center_x, center_y, team_name_str, { fontFamily: 'cursive' ,color: 'white', fontSize: '50px'}).setOrigin(0.5);
    const credits_intro = this.add.text(center_x, center_y, 'Credits', { fontFamily: 'cursive', color: 'white', fontSize: '75px'}).setOrigin(0.5);

    this.tweens.add({ 
      targets: [credits_intro],
      y: center_y - 275,
      duration: 2000,
      ease: 'Power2',
    });

    this.tweens.add({
      targets: [credits_intro, team_names],
      alpha: 0,
      duration: 15000,
      onComplete: () => { 
        this.scene.start('menu'); } // for now just return to main menu after 15 seconds
    })
  }

  update() {
    // game logic here
  }
}