
class TitleScene extends Phaser.Scene {

  constructor(test) {
    super({
      key: 'TitleScene'
    });
  }

  preload() {
  }

  create() {
    console.log("TitleScene");

    //add repeating background image
    //var background = this.add.tileSprite(0, 0, this.game.width, this.game.height, "background");
    var background = this.add.tileSprite(0, 0, 1050 * 2, 700 * 2, "background"); //don't know why, but it didn't repeat until the end of the canvas

    //add level tileset
    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('cybernoid', 'tiles');
    var layer = map.createStaticLayer(0, tiles, 0, 0);
    //var layer = map.createDynamicLayer('World', tiles, 0, 0);
    layer.setCollisionByExclusion([-1, 0]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = layer.width;
    this.physics.world.bounds.height = layer.height;

    // create the player sprite    
    this.player = this.physics.add.sprite(200, 200, 'player1');
    this.player.setBounce(0.2); // our player will bounce from items
    this.player.setCollideWorldBounds(true); // don't go out of the map

    // set collision
    this.physics.add.collider(layer, this.player);




    //demo
    //this.add.image(400, 300, 'sky');
    /*
        var particles = this.add.particles('red');
    
        var emitter = particles.createEmitter({
          speed: 100,
          scale: { start: 1, end: 0 },
          blendMode: 'ADD'
        });
        var logo = this.physics.add.image(400, 100, 'logo');
    
        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);
    
        emitter.startFollow(logo);*/
  }


  update() {
    // Move player

    var cursors = this.input.keyboard.createCursorKeys();

    if (cursors.left.isDown) {
      this.player.body.setVelocityX(-200); // move left
    } else if (cursors.right.isDown) {
      this.player.body.setVelocityX(200); // move right
    }

    if ((cursors.space.isDown || cursors.up.isDown) && this.player.body.onFloor()) {
      this.player.body.setVelocityY(-500); // jump up
    }
  }
}

export default TitleScene;