
class PreloadScene extends Phaser.Scene {
  constructor(test) {
    super({
      key: 'PreloadScene'
    });
  }

  init() { }

  preload() {
    console.log("PreloadScene");

    const progress = this.add.graphics();

    // Register a load progress event to show a load bar
    this.load.on('progress', (value) => {
      progress.clear();
      progress.fillStyle(0xffffff, 1);
      progress.fillRect(0, this.sys.game.config.height / 2, this.sys.game.config.width * value, 60);
    });

    // Register a load complete event to launch the title screen when all files are loaded
    this.load.on('complete', () => {
      progress.destroy();
      this.scene.start('TitleScene');
    });

    this.load.image('background', 'public/tileset/bg_castle.png');

    this.load.atlas('tiles', 'public/tileset/tileset.png', 'public/tileset/tileset_spritesheet.json');
    this.load.tilemapTiledJSON('map', 'public/tileset/tileset.json');

    this.load.atlas('player1', 'public/game/player/player1.png', 'public/game/player/player1.json');
    this.load.atlas('player2', 'public/game/player/player2.png', 'public/game/player/player2.json');
    this.load.atlas('player3', 'public/game/player/player3.png', 'public/game/player/player3.json');

    this.load.image('gun', 'public/game/gun/laser_gun.png');
    this.load.image('energy', 'public/game/gun/energy.png');

  }

}

export default PreloadScene;