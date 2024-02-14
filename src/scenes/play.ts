import * as Phaser from 'phaser';
import { io } from 'socket.io-client';
import spriteURL from '/assets/_Run.png';
import spriteMapURL from '/assets/sprites.json?url';

export class Play extends Phaser.Scene {

    connected: boolean = false;
    player_number: number = 0;

    center_x?: number;
    center_y?: number;

    player_sprite?: any;
    cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    moving: boolean = false;
    players: any = {};

    glitchURL = "https://scratched-cyclic-washer.glitch.me/";
    //socket = io(import.meta.env.VITE_SERVER_URL); // for local development
    socket: any;

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

        //const glitchURL = "https://scratched-cyclic-washer.glitch.me/";
        //const socket = io(import.meta.env.VITE_SERVER_URL); // for local development
        this.socket = io(this.glitchURL);

        let users_textbox: Phaser.GameObjects.Text;
        let player_textbox: Phaser.GameObjects.Text;

        // connect to server
        this.socket.on('connect', () => {
            connecting.setText('Connected to Glitch!');
            setTimeout(() => { connecting.destroy(); }, 2000);

            loading.setVisible(false);
            console.log('connected to server: ' + this.socket.id);
        });

        // create player
        this.socket.on('current_players', (players_info: any) => {
            Object.keys(players_info).forEach((id) => {
                if (players_info[id].player_id === this.socket.id) {
                    this.player_sprite = this.createPlayer(players_info[id]);
                } else {
                    this.players[id] = this.createPlayer(players_info[id]);
                }
            });
        });

        // get player number
        this.socket.on('player_number', (player_number: number) => { 
            this.player_number = player_number;

            if (player_textbox) {
                player_textbox.destroy();
            }

            player_textbox = this.add.text(this.center_x!, this.center_y! - 80, `Player ${this.player_number}`, { fontFamily: 'cursive', color: 'white', fontSize: '60px'}).setOrigin(0.5);
            
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
        });

        // new player connected
        this.socket.on('new_player', (player: any) => {
            this.players[player.player_id] = this.createPlayer(player);
        });

        // checks users connected
        this.socket.on('users_connected', (count: number) => {

            if (users_textbox) {
                users_textbox.destroy();
            }

            this.player_number = count;

            users_textbox = this.add.text(this.center_x!, 50, `Players Connected: ${count}`, { fontFamily: 'cursive', color: 'white', fontSize: '25px'}).setOrigin(0.5);
            
        });
        
        // update player position
        this.socket.on('player_moved', (players_info: any) => {
            const player = (players_info.player_id === this.socket.id) ? this.player_sprite : this.players[players_info.player_id];

            if (player) {
                player.anims.play("walk_t", true);
                player.x = players_info.x;
                player.y = players_info.y;
            }
        });

        // new player connected
        this.socket.on('disconnected', (player_id: any) => {

            if(this.players[player_id]) {
                this.players[player_id].destroy();
                delete this.players[player_id];
            }
        });

    }   
    
    update() {
        // Example of moving the player based on keyboard input
        if(this.connected) {

            if (this.cursors!.left.isDown) {

                this.player_sprite!.setVelocityX(-160);
                this.player_sprite!.flipX = true;
                this.moving = true;

                this.updatePlayerPosition();
            } else if (this.cursors!.right.isDown) {

                this.player_sprite!.setVelocityX(160);
                this.player_sprite!.flipX = false;
                this.moving = true;
                this.updatePlayerPosition();

            } else {

                this.player_sprite!.setVelocityX(0);
                this.moving = false;
            }
        
            if (this.cursors!.up.isDown) {

                this.player_sprite!.setVelocityY(-160);
                this.moving = true;
                this.updatePlayerPosition();

            } else if (this.cursors!.down.isDown) {

                this.player_sprite!.setVelocityY(160);
                this.moving = true;
                this.updatePlayerPosition();

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

    updatePlayerPosition() { 
        const movement_data: any = {
            x: this.player_sprite!.x,
            y: this.player_sprite!.y,
            animation: 'walk_t'
        };

        this.socket.emit('player_movement', movement_data);
    }
    

    createPlayer(player_id?: string) {
        const new_player: any = this.physics.add.sprite(this.center_x!, this.center_y!, 'player_atlas', 'walk_t').setScale(2);
        new_player.player_id = player_id;

        this.connected = true;

        return new_player;
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