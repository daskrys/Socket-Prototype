import * as Phaser from 'phaser';
import dragonURL from '/assets/8_bit_dragon.png';

export class Menu extends Phaser.Scene { 
    constructor() {
        super('menu');
    }   

    preload() { 
        // load assets here    
        this.load.image('dragon', dragonURL);
    }

    create() {

        this.cameras.main.setBackgroundColor(0x000000); // sets background color change later

        const center_x = this.game.canvas.width / 2;
        const center_y = this.game.canvas.height / 2;
    
        const game_name = this.add.text(center_x, center_y - 80, 'Bite-Sized Dungeons', { fontFamily: 'cursive', color: 'white', fontSize: '75px'}).setOrigin(0.5);
        
        // sets title in place
        this.tweens.add({ 
            targets: [game_name],
            y: center_y - 375,
            duration: 3000,
            ease: 'Power2',
            onComplete: () => { 
                this.add.image(center_x, center_y - 150, 'dragon').setScale(0.5).setOrigin(0.5);
            }
        });


        const join_button = this.add.text(center_x, center_y + 100, 'Join Room', { fontFamily: 'cursive', color: 'white', fontSize: '50px'}).setOrigin(0.5);
        join_button.setInteractive();

        const settings_button = this.add.text(center_x, center_y + 160, 'Settings', { fontFamily: 'cursive', color: 'white', fontSize: '50px'}).setOrigin(0.5);
        settings_button.setInteractive();

        const credits_button = this.add.text(center_x, center_y + 220, 'Credits', { fontFamily: 'cursive', color: 'white', fontSize: '50px'}).setOrigin(0.5);
        credits_button.setInteractive();
        credits_button.on('pointerdown', () => { this.scene.start('credits'); });
    }

    update() {
        
    }
}