import 'phaser';
import TitleScene from './scenes/TitleScene';

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [
    TitleScene
  ]
};

var game = new Phaser.Game(config);