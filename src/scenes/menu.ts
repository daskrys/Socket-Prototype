import * as Phaser from 'phaser';
import dragonURL from '/assets/8_bit_dragon.png';

const settings: string = 'SETTINGS';
const credits: string = 'CREDITS';
const join_room: string = 'JOIN ROOM';

export class Menu extends Phaser.Scene { 
    constructor() {
        super('menu');
    }   

    preload() { 
        // load assets here    
        this.load.image('dragon', dragonURL);
    }

    create() {

        this.cameras.main.setBackgroundColor(0x141413); // sets background color change later

        const center_x = this.game.canvas.width / 2;
        const center_y = this.game.canvas.height / 2; 
    
        const game_name = this.add.text(center_x, center_y - 80, 'Bite-Sized Dungeons', { fontFamily: 'Silkscreen', color: '#D3B02C', fontSize: '55px'}).setOrigin(0.5);
        //const title_image = this.add.image(center_x, center_y - 80, 'title').setScale(.75).setOrigin(0.5);
        const dragon_image = this.add.image(center_x, center_y - 175, 'dragon').setScale(0.35).setOrigin(0.5).setVisible(false);
        // sets title in place
        this.tweens.add({ 
            targets: [game_name],
            y: center_y - 385 ,
            duration: 3000,
            ease: 'Power2',
            onComplete: () => { 
                dragon_image.setVisible(true);
            }
        });

        this.tweens.add({ 
            targets: [dragon_image],
            y: center_y - 170,
            duration: 1500,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });

        const join_button = this.add.text(center_x, center_y + 150, join_room, { fontFamily: 'Silkscreen', color: '#D3B02C', fontSize: '35px'}).setOrigin(0.5);
        join_button.setInteractive();
        join_button.on('pointerover', () => { join_button.setColor('#FFF'); });
        join_button.on('pointerout', () => { join_button.setColor('#E5A90A'); });
        join_button.on('pointerdown', () => { this.scene.start('play'); });

        const settings_button = this.add.text(center_x, center_y + 200, settings, { fontFamily: 'Silkscreen', color: '#D3B02C', fontSize: '35px'}).setOrigin(0.5);
        settings_button.setInteractive();
        settings_button.on('pointerover', () => { settings_button.setColor('#FFF'); });
        settings_button.on('pointerout', () => { settings_button.setColor('#E5A90A'); });
        settings_button.on('pointerdown', () => { this.scene.start('settings'); });

        const credits_button = this.add.text(center_x, center_y + 250, credits, { fontFamily: 'Silkscreen', color: '#D3B02C', fontSize: '35px'}).setOrigin(0.5);
        credits_button.setInteractive();
        credits_button.on('pointerover', () => { credits_button.setColor('#FFF'); });
        credits_button.on('pointerout', () => { credits_button.setColor('#E5A90A'); });
        credits_button.on('pointerdown', () => { this.scene.start('credits'); });

       
    }

    update() {
        
    }
}