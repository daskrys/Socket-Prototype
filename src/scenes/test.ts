import * as Phaser from 'phaser';

export class Test extends Phaser.Scene {
  constructor() {
    super('test');
  }

  create() {
    this.add.text(0, 0, 'Hello World', { color: 'white' });
  }
}