
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

    this.load.setBaseURL('http://labs.phaser.io');
    this.load.image('sky', 'assets/skies/space3.png');
    this.load.image('logo', 'assets/sprites/phaser3-logo.png');
    this.load.image('red', 'assets/particles/red.png');
  }

}

export default PreloadScene;