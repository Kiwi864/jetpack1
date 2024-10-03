class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
    this.game = game
    this.playerSpeed = 1.5;
    this.boostSpeed = 6;
    this.cannonshot = 0;
    this.menuActive = true;
    this.Scoretemp = 0;
    
  }
  create() {
    this.menuActive = true;
    this.Scoretemp = 0;
    this.bg_1 = this.add.tileSprite(0, 0, game.config.width, 240, "bg_1");
    this.bg_1.setOrigin(0, 0);
    this.bg_1.setScrollFactor(0);

    this.bg_2 = this.add.tileSprite(0, 0, game.config.width, game.config.height, "bg_2");
    this.bg_2.setOrigin(0, 0);
    this.bg_2.setScrollFactor(0);

    this.ground = this.add.tileSprite(0, 0, game.config.width, 48, "ground");
    this.ground.setOrigin(0, 0);
    this.ground.setScrollFactor(0);
    this.ground.y = 12 * 16;

    
    this.player = this.add.sprite(0, game.config.height / 2 - 100, "player");
    this.player.alpha = 0;
    this.physics.world.enable(this.player);
    this.player.play("fly");

    this.uiContainer = this.add.container(this.player.x - 50, 10);
   
    this.fuelLevel = 100 * globalJetpack; 
    this.fuelIndicator = this.add.graphics();
    this.updateFuelIndicator();
    this.uiContainer.add(this.fuelIndicator);
   
    
    this.uiContainer.alpha = 0;
    this.mapLocater = this.add.sprite(100, 5, "mapLoc");
    this.map = this.add.sprite(210, 1, "map");
    this.map.setScale(2);
    this.uiContainer.add(this.map);
    this.uiContainer.add(this.mapLocater);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cannon = this.physics.add.sprite(-150, game.config.height/2 + 60, "cannon");
    this.cannondown = this.physics.add.sprite(-150, game.config.height/2 + 60, "cannondown");
    this.cannon.setScale(2);
    this.cannondown.setScale(2);


    
    this.menuBg = this.add.graphics();
    this.menuBg.fillStyle(0x0000, 1);
    this.menuBg.fillRect(-200, 0, game.config.width +20, game.config.height); 
    this.menuBg.alpha = 0.5;
    this.Name = this.add.bitmapText(-50,game.config.height /2 - 40, "pixelFont", "GAME", 50);
    this.Start = this.add.bitmapText(-80,game.config.height /2, "pixelFont", "PRESS ENTER TO START \n", 20);
    this.scoreText = this.add.bitmapText(-50,game.config.height /2 + 20, "pixelFont", "SCORE: ", 20);
    this.textbg = this.add.sprite(150, 5, "textbg").setInteractive();
    this.textbg.angle = 90;
    this.textbg.alpha = 0.5;
    this.Shop = this.add.bitmapText(110,5, "pixelFont", "SHOP", 40);
    this.EnterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.SpaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.menuContainer = this.add.container(-10, 0);
    this.menuContainer.add(this.menuBg);
    this.menuContainer.add(this.Name);
    this.menuContainer.add(this.Start);
    this.menuContainer.add(this.textbg);
    this.menuContainer.add(this.Shop);
    this.menuContainer.add(this.scoreText);
   
    /*this.duck = this.add.sprite(20, game.config.height / 2 - 80, "duckplayer");
    this.duck.play("duckPFly");*/

    
   

    this.Cam =this.cameras.main
    this.Cam.startFollow(this.player);
    this.Cam.setBounds(-300,0, game.config.width * 200, game.config.height);
    
    this.input.on('pointermove', this.handlePointerMove, this);
    this.input.on('pointerdown', this.handlePointerDown, this);

    this.shootSound = this.sound.add("cannonsound", {volume: 0.5});
    if (!this.music || !this.music.isPlaying) {
      this.music = this.sound.add("bgmusic", {volume: 0.25});
      var musicConfig = {
          mute: false,
          volume: 0,
          rate: 1,
          detune: 0,
          seek: 0,
          loop: true,
          delay: 0
      };
      this.music.play(musicConfig);
  }
  
    this.textbg.on('pointerdown', () => {
      this.scene.start("Shop");
      console.log("shop")
    });
    
  }
  handlePointerMove(pointer){
    if(this.menuActive == false){
      this.input.on('pointermove', function(pointer) {
        let cursor = pointer
        let angle = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY);
        this.updateCannon(angle)
      },this);
    
    }
  }
  handlePointerDown(pointer){
    if(this.menuActive == false && this.cannonshot == 0){
      this.input.on('pointerdown', function(pointer) {
        if(this.cannonshot == 0){
          this.player.alpha = 1;
          this.player.x = this.cannon.x;
          this.player.y = this.cannon.y;
          let angle = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, pointer.x + this.cameras.main.scrollX, pointer.y + this.cameras.main.scrollY);
          this.shootSound.play()
          if(globalCannonStrength == 0){
            const launchSpeed = 400; 
            this.player.body.setVelocity(Math.cos(angle) * launchSpeed, Math.sin(angle) * launchSpeed);
          }else{
            const launchSpeed = 350 + globalCannonStrength; 
            this.player.body.setVelocity(Math.cos(angle) * launchSpeed, Math.sin(angle) * launchSpeed);
          }
  
         
          const gravity = 50; 
          this.player.body.gravity.y = gravity;
          this.cannonshot = 1;
          
        
        }
       
      },this);
    }
  }

  update() {
    
    this.Scoretemp = this.player.x;
   
    globalScore = Math.max(0, Math.ceil(this.Scoretemp ));
    
    globalScore2 = globalScore/100 +globalScore2;
    globalScore2 = Math.ceil(globalScore2);
    let formattedScore = String(globalScore2).padStart(6, '0');
    this.scoreText.text = "SCORE: " + formattedScore;
    
    if(this.menuActive == false){
      this.uiContainer.alpha = 1;

      
      if (this.cursors.up.isDown && this.fuelLevel > 0 && this.cannonshot == 1) {
        this.fuelLevel -= 4; 
        this.updateFuelIndicator();
        this.player.y -= this.boostSpeed - 2;
      }
      else{
        if (this.player.y < this.ground.y && this.cannonshot == 1) {
          this.player.y += this.playerSpeed;
        }
        else {
        this.player.y = this.ground.y - 20;
        }
      
      }
    }
    if(this.player.y >= this.ground.y - 1 && this.player.y <= this.ground.y + 1 && this.cannonshot == 1){
      this.scene.start("PlayGame");
      this.uiContainer.alpha = 0;
      this.cannonshot = 0;
    }

    this.bg_1.tilePositionX = this.Cam.scrollX * .3;
    this.bg_2.tilePositionX = this.Cam.scrollX * .6;
    this.ground.tilePositionX = this.Cam.scrollX;

   this.uiContainer.x = this.player.x - 50;
  
    

    
    
   

    const mapWidth = this.map.width; 
    const playerRelativeX = this.player.x / (game.config.width * 50);
    this.mapLocater.x = playerRelativeX;
    
    const mapLocatorX = this.map.x + playerRelativeX * mapWidth * 2 ;
   
    this.mapLocater.x = mapLocatorX - 90;

    
    const mapLeftBound = this.map.x/2 - 30;
    const mapRightBound = this.map.x + mapWidth/2 -10;
    this.mapLocater.x = Phaser.Math.Clamp(this.mapLocater.x, mapLeftBound, mapRightBound);

    if(Phaser.Input.Keyboard.JustDown(this.EnterKey)){
      this.menuContainer.alpha = 0;
      this.Shop.destroy();
      this.textbg.destroy();
      this.menuActive = false;
    }
    
   
    
    
  }
  updateFuelIndicator() {
    this.fuelIndicator.clear();
    this.fuelIndicator.fillStyle(0xff0000, 1);
    this.fuelIndicator.fillRect(-10, -10, this.fuelLevel /globalJetpack, 20); 
  }
  updateCannon(angle){
    this.cannon.rotation = angle;
  }
  
 
}
