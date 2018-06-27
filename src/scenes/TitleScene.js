
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
    layer.setCollisionByExclusion([-1, 0]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = layer.width;
    this.physics.world.bounds.height = layer.height;

    // create the player sprite    
    this.player1 = this.physics.add.sprite(200, 180, 'player1');
    this.player1.setBounce(0.2); // our player will bounce from items
    this.player1.setCollideWorldBounds(true); // don't go out of the map


    this.anims.create({
      key: 'p1_idle',
      frames: [{ key: 'player1', frame: 'p1_front.png' }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'p1_jump',
      frames: [{ key: 'player1', frame: 'p1_jump.png' }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'p1_walk',
      frames: this.anims.generateFrameNames('player1', { prefix: 'p1_walk', suffix: '.png', start: 1, end: 11, zeroPad: 2 }),
      frameRate: 10,
      repeat: -1
    });

    //Load the initial sprite
    this.player2 = this.physics.add.sprite(400, 180, 'player2', 'p2_front.png');
    this.player2.setBounce(0.2); // our player will bounce from items
    this.player2.setCollideWorldBounds(true); // don't go out of the map

    this.anims.create({
      key: 'p2_idle',
      frames: [{ key: 'player2', frame: 'p2_front.png' }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'p2_jump',
      frames: [{ key: 'player2', frame: 'p2_jump.png' }],
      frameRate: 10,
    });

    this.anims.create({
      key: 'p2_walk',
      frames: this.anims.generateFrameNames('player2', { prefix: 'p2_walk', suffix: '.png', start: 1, end: 11, zeroPad: 2 }),
      frameRate: 10,
      repeat: -1
    });

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
      if (this.player1.body.onFloor()) {
        this.player1.anims.play('p1_walk', true); // play walk animation
      } else {
        this.player1.anims.play('p1_jump', true);
      }
      this.player1.flipX = true; // flip the sprite to the left
    } else if (cursors.right.isDown) {
      this.player1.body.setVelocityX(200); // move right
      if (this.player1.body.onFloor()) {
        this.player1.anims.play('p1_walk', true); // play walk animation
      } else {
        this.player1.anims.play('p1_jump', true);
      }
      this.player1.flipX = false; // flip the sprite to the right
    } else if (this.player1.body.onFloor()) {
      this.player1.body.setVelocityX(0);
      this.player1.anims.play('p1_idle', true);
    }

    if (cursors.up.isDown && this.player1.body.onFloor()) {
      this.player1.body.setVelocityY(-500); // jump up
      this.player1.anims.play('p1_jump', true);
    }

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q).isDown) {
      this.player2.body.setVelocityX(-200); // move left
      if (this.player2.body.onFloor()) {
        this.player2.anims.play('p2_walk', true); // play walk animation
      } else {
        this.player2.anims.play('p2_jump', true);
      }
      this.player2.flipX = true; // flip the sprite to the left
    } else if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D).isDown) {
      this.player2.body.setVelocityX(200); // move right
      if (this.player2.body.onFloor()) {
        this.player2.anims.play('p2_walk', true); // play walk animation
      } else {
        this.player2.anims.play('p2_jump', true);
      }
      this.player2.flipX = false; // flip the sprite to the right
    } else if (this.player2.body.onFloor()) {
      this.player2.body.setVelocityX(0);
      this.player2.anims.play('p2_idle', true);
    }

    if (this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z).isDown && this.player2.body.onFloor()) {
      this.player2.body.setVelocityY(-500); // jump up
      this.player2.anims.play('p2_jump', true);
    }
  }
}

export default TitleScene;