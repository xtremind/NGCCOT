
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
    var background = this.add.tileSprite(0, 0, this.sys.game.config.width * 2, this.sys.game.config.height * 2, "background"); //don't know why, but it didn't repeat until the end of the canvas if not *2

    //add level tileset
    var map = this.make.tilemap({ key: 'map' });
    var tiles = map.addTilesetImage('cybernoid', 'tiles');
    var layer = map.createStaticLayer(0, tiles, 0, 0);
    layer.setCollisionByExclusion([-1, 0]);

    // set the boundaries of our game world
    this.physics.world.bounds.width = layer.width;
    this.physics.world.bounds.height = layer.height;

    // initiate players
    this.player1 = this.initiatePlayer('player1', 'p1', 850, 180);
    this.player2 = this.initiatePlayer('player2', 'p2', 200, 180);

    // initiate gun
    this.gun = this.initiateGun();

    // set collision
    this.physics.add.collider(layer, this.player1);
    this.physics.add.collider(layer, this.player2);
    this.physics.add.collider(layer, this.gun);
    this.physics.add.collider(this.gun, this.player1);
    this.physics.add.collider(this.gun, this.player2);
    this.physics.add.collider(this.player1, this.player2);


    //  Bullets
    var Bullet = new Phaser.Class({
      Extends: Phaser.GameObjects.Image,
      initialize: function Bullet(scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'bullet');
        this.speed = 0;
        this.born = 0;
      },

      fire: function (player) {
        var x = player.x, 
          y = player.y + 10;

        if (player.flipX) { //  Facing left
          this.speed = Phaser.Math.GetSpeed(-1000 + player.body.velocity.x, 1);
          x -= 50;
        } else { //  Facing right
          this.speed = Phaser.Math.GetSpeed(1000 + player.body.velocity.x, 1);
          x += 50;
        }
        this.setPosition(x, y);
        this.born = 0;
      },

      update: function (time, delta) {
        this.x += this.speed * delta;
        this.born += delta;

        if (this.born > 1000) {
          this.setActive(false);
          this.setVisible(false);
        }
      }
    });

    this.bullets = this.add.group({ classType: Bullet, runChildUpdate: true });
    this.createBulletEmitter();

    // if collision between player and launched gun or hand
    // player collapse for x seconds
    // else if collision between player and fired bullet
    // player killed
    // else if collision between player and gun or bullet
    // player get it
    // item destroyed


  }

  update() {
    // Move player
    var cursors = this.input.keyboard.createCursorKeys();
    this.movePlayer(this.player1, 'p1', cursors.up, cursors.left, cursors.right, cursors.down);
    this.movePlayer(this.player2, 'p2', this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D), this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S));
    /*if (this.gun.body.onFloor()) {
      console.log("rotate");
    }*/

    //  Emitters to bullets
    this.bullets.children.each(function (b) {
      if (b.active) {
        this.flares.setPosition(b.x, b.y);
        this.flares.setSpeed(b.speed + 500 * -1);
        this.flares.emitParticle(1);
      }
    }, this);
  }

  initiateGun() {
    var gun = this.physics.add.sprite(525, -200, 'gun');
    gun.setBounce(0.2); // our player will bounce from items
    gun.setDisplaySize(40, 40);
    return gun;
  }

  initiatePlayer(id, prefix, x, y) {
    this.anims.create({
      key: prefix + '_idle',
      frames: [{ key: id, frame: prefix + '_front.png' }],
      frameRate: 10,
    });
    this.anims.create({
      key: prefix + '_jump',
      frames: [{ key: id, frame: prefix + '_jump.png' }],
      frameRate: 10,
    });
    this.anims.create({
      key: prefix + '_walk',
      frames: this.anims.generateFrameNames(id, { prefix: prefix + '_walk', suffix: '.png', start: 1, end: 11, zeroPad: 2 }),
      frameRate: 10,
      repeat: -1
    });

    var player = this.physics.add.sprite(x, y, id).play(prefix + '_idle');
    player.setBounce(0.2); // our player will bounce from items
    player.setCollideWorldBounds(true); // don't go out of the map

    return player;
  }

  movePlayer(player, prefix, keyUp, keyLeft, keyRight, keyAction) {
    if (keyLeft.isDown) {
      player.body.setVelocityX(-200); // move left
      if (player.body.onFloor()) {
        player.anims.play(prefix + '_walk', true); // play walk animation
      }
      else {
        player.anims.play(prefix + '_jump', true);
      }
      player.flipX = true; // flip the sprite to the left
    }
    else if (keyRight.isDown) {
      player.body.setVelocityX(200); // move right
      if (player.body.onFloor()) {
        player.anims.play(prefix + '_walk', true); // play walk animation
      }
      else {
        player.anims.play(prefix + '_jump', true);
      }
      player.flipX = false; // flip the sprite to the right
    }
    else if (player.body.onFloor()) {
      player.body.setVelocityX(0);
      player.anims.play(prefix + '_idle', true);
    }
    if (keyUp.isDown && player.body.onFloor()) {
      player.body.setVelocityY(-500); // jump up
      player.anims.play(prefix + '_jump', true);
    }
    if (keyAction.isDown) {
      var bullet = this.bullets.get();
      bullet.setActive(true);
      bullet.setVisible(true);

      if (bullet) {
        bullet.fire(player);
      }
    }
    //if action
    //if gun + bullet
    //fire
    //if gun
    //launch it
    //else
    //punch
  }

  createBulletEmitter() {
    this.flares = this.add.particles('flares').createEmitter({
      x: 1600,
      y: 200,
      angle: { min: 170, max: 190 },
      scale: { start: 0.4, end: 0.2 },
      blendMode: 'ADD',
      lifespan: 500,
      on: false
    });
  }
}

export default TitleScene;