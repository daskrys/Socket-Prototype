import * as Phaser from 'phaser';
import { Team } from './scenes/team';
import { Menu } from './scenes/menu';
import { Credits } from './scenes/credits';
import { Settings } from './scenes/settings';
import { Play } from './scenes/play';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: '1000',
  height: '1000',
  physics: {
    default: 'arcade',
    arcade: {
        gravity: { y: 0 },
        debug: false
    }
  } ,
  scene: [Team, Menu, Credits, Settings, Play],
  //scene: [Play],
  scale: {
    mode: Phaser.AUTO,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH
  }
};

new Phaser.Game(config);