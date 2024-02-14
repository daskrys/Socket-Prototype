import * as Phaser from 'phaser';
import { io } from 'socket.io-client';
import spriteURL from '/assets/_Run.png';
import spriteMapURL from '/assets/sprites.json?url';

export class Play extends Phaser.Scene {

    connected: boolean = false;
    player_number: number = 0;

    center_x?: number;
    center_y?: number;

    player_sprite?: Phaser.Physics.Arcade.Sprite;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    moving: boolean = false;

    preload() { 
        this.load.image('player', spriteURL);
        this.load.atlas('player_atlas', spriteURL, spriteMapURL);
    }

    constructor() {
        super('play');
    }
    
    create() {
        this.animatePlayer();

        this.center_x = this.game.canvas.width / 2;
        this.center_y = this.game.canvas.height / 2;
        this.cursors = this.input.keyboard!.createCursorKeys();
        
        //onst game_name = this.add.text(center_x, center_y - 80, 'Bite-Sized Dungeons', { fontFamily: 'cursive', color: 'white', fontSize: '75px'}).setOrigin(0.5);
        const connecting = this.add.text(this.center_x, this.center_y + 150, 'Connecting to Server', { fontFamily: 'cursive', color: 'white', fontSize: '50px'}).setOrigin(0.5);
        const loading = this.add.text(this.center_x, this.center_y + 200, 'Loading...', { fontFamily: 'cursive', color: 'white', fontSize: '50px'}).setOrigin(0.5);

        const glitchURL = "https://scratched-cyclic-washer.glitch.me/";
        //const socket = io(import.meta.env.VITE_SERVER_URL); // for local development
        const socket = io(glitchURL);

        let users_textbox: Phaser.GameObjects.Text;
        let player_textbox: Phaser.GameObjects.Text;

        socket.on('connect', () => {
            connecting.setText('Connected to Glitch!');
            setTimeout(() => { connecting.destroy(); }, 2000);

            loading.setVisible(false);
            console.log('connected to server: ' + socket.id);
        });

        socket.on('users_connected', (count: number) => {

            if (users_textbox) {
                users_textbox.destroy();
            }

            this.player_number = count;

            users_textbox = this.add.text(this.center_x!, 50, `Players Connected: ${count}`, { fontFamily: 'cursive', color: 'white', fontSize: '25px'}).setOrigin(0.5);
        });

        socket.on('player_number', (player_number: number) => { 
            this.player_number = player_number;

            if (player_textbox) {
                player_textbox.destroy();
            }

            player_textbox = this.add.text(this.center_x!, this.center_y! - 80, `Player ${player_number}`, { fontFamily: 'cursive', color: 'white', fontSize: '60px'}).setOrigin(0.5);
            setTimeout(() => { 
                this.tweens.add({ 
                    targets: [player_textbox],
                    x: this.center_x!,
                    y: this.center_y! - 100,
                    alpha: 0,
                    duration: 3000,
                    ease: 'Power2',
                }); 
            }, 2000);

            this.createPlayer();
            
        });
        
    }   
    
    update() {
        // Example of moving the player based on keyboard input
        if(this.connected) {
            if (this.cursors!.left.isDown) {
                this.player_sprite!.setVelocityX(-160);
                this.player_sprite!.flipX = true;
                this.moving = true;
            } else if (this.cursors!.right.isDown) {
                this.player_sprite!.setVelocityX(160);
                this.player_sprite!.flipX = false;
                this.moving = true;
            } else {
                this.player_sprite!.setVelocityX(0);
                this.moving = false;
            }
        
            if (this.cursors!.up.isDown) {
                this.player_sprite!.setVelocityY(-160);
                this.moving = true;
            } else if (this.cursors!.down.isDown) {
                this.player_sprite!.setVelocityY(160);
                this.moving = true;
            } else {
                this.player_sprite!.setVelocityY(0);
            }

            if (this.moving) {
                this.player_sprite!.anims.play("walk_t", true);
            } else {
                this.player_sprite!.anims.stop();
            }
            
        }
    }
    

    createPlayer() {
        this.player_sprite = this.physics.add.sprite(this.center_x!, this.center_y!, 'player_atlas', 'walk_1').setScale(2);
        this.connected = true;
    }
    
    animatePlayer() { 
        this.anims.create({
            key: "walk_t",
            frames: this.anims.generateFrameNames("player_atlas", { 
                prefix: "walk_", 
                start: 1, 
                end: 8, 
                suffix: "",
                zeroPad: 0 }),
            frameRate: 10,
            repeat: -1
        });
    }
}