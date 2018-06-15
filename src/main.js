// Modules
import 'phaser';

// Scenes
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import TitleScene from './scenes/TitleScene';

// Declare configuration
const config = {
  type: Phaser.AUTO,
  width: 1050,
  height: 700,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 }
    }
  },
  scene: [
    BootScene,
    PreloadScene,
    TitleScene
  ]
};

// 
var game = new Phaser.Game(config);