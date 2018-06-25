
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

    this.load.image('background', 'public/items/bg_castle.png');

    // tiles in spritesheet 
    this.load.image('tiles', 'public/items/tileset.png');
    //this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
    this.load.tilemapTiledJSON('map', 'public/items/tileset.json');

    this.load.image('player1', 'public/preview/Player/p1_front.png');
    this.load.atlas('player2', 'public/items/player2.png', 'public/items/player2.json');
    this.load.atlas('player3', 'public/items/player3.png', 'public/items/player3.json');

    // demo
    //this.load.setBaseURL(' http://labs.phaser.io');
    /*
    this.load.image('sky', 'http://labs.phaser.io/assets/skies/space3.png');
    this.load.image('logo', 'http://labs.phaser.io/assets/sprites/phaser3-logo.png');
    this.load.image('red', 'http://labs.phaser.io/assets/particles/red.png');*/
  }

}

export default PreloadScene;