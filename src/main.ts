import * as Phaser from 'phaser';
import { Team } from './scenes/team';
import { Menu } from './scenes/menu';
import { Credits } from './scenes/credits';
import { Settings } from './scenes/settings';
import { Play } from './scenes/play';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: '100%',
  height: '100%',
  scene: [Team, Menu, Credits, Settings, Play],
  //scene: [Team, Menu, Credits],
  scale: {
    mode: Phaser.Scale.ScaleModes.RESIZE,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH
  }
};

new Phaser.Game(config);