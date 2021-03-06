// Modules
import 'phaser';

// Scenes
import BootScene from './scenes/BootScene';
import PreloadScene from './scenes/PreloadScene';
import TitleScene from './scenes/TitleScene';

// Configuration
var gameConfiguration = require("./properties/gameConfiguration.json");

console.log("main")

// Declare configuration
const config = {
  type: Phaser.AUTO,
  width: 1050,
  height: 700,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: gameConfiguration.common.gravity },
      debug: true
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
game.properties = gameConfiguration;