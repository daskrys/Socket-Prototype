import * as Phaser from 'phaser';
import { Test } from './scenes/test';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Test],
};

new Phaser.Game(config);