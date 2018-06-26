
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
    this.player1 = this.physics.add.sprite(200, 200, 'player1');
    this.player1.setBounce(0.2); // our player will bounce from items
    this.player1.setCollideWorldBounds(true); // don't go out of the map

  //Load the initial sprite
  this.player2 = this.physics.add.sprite(400, 180, 'player2', 'p2_front.png');
  this.player2.setBounce(0.2); // our player will bounce from items
  this.player2.setCollideWorldBounds(true); // don't go out of the map



    // set collision
    this.physics.add.collider(layer, this.player1);
    this.physics.add.collider(layer, this.player2);
    this.physics.add.collider(this.player1, this.player2);




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
      this.player1.body.setVelocityX(-200); // move left
    } else if (cursors.right.isDown) {
      this.player1.body.setVelocityX(200); // move right
    }

    if ( cursors.up.isDown && this.player1.body.onFloor()) {
      this.player1.body.setVelocityY(-500); // jump up
    }

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q).isDown) {
      this.player2.body.setVelocityX(-200); // move left
    } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
      this.player2.body.setVelocityX(200); // move right
    }

    if ( this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z).isDown && this.player2.body.onFloor()) {
      this.player2.body.setVelocityY(-500); // jump up
    }
  }
}

export default TitleScene;