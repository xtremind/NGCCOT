// Modules
import 'phaser';

// Scenes
import TitleScene from './scenes/TitleScene';

// Declare configuration
const config = {
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

// 
var game = new Phaser.Game(config);