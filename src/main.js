// Modules
import 'phaser';

// Scenes
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
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
    BootScene,
    PreloadScene,
    TitleScene
  ]
};

// 
var game = new Phaser.Game(config);