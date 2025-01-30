class playGame extends Phaser.Scene {
  constructor() {
    super("PlayGame");
    this.game = game
    this.playerSpeed = 1.5;
    this.boostSpeed = 6;
    this.cannonshot = 0;
    this.menuActive = true;
    this.Scoretemp = 0;
    this.duckExist = false;
    this.duckRun = false
    this.endX = false;
    this.eagleActive = false;
    this.eagleWarning = null;
    this.eagle = null; 
    this.gravity = 0;
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

    this.uiContainer = this.add.container(145, 10);
   
    this.fuelLevel = 100 * globalJetpack; 
    this.fuelIndicator = this.add.graphics();
    this.updateFuelIndicator();
    this.uiContainer.add(this.fuelIndicator);
   
    
    this.uiContainer.alpha = 0;
    this.mapLocater = this.add.sprite(100, 5, "mapLoc");
    this.map = this.add.sprite(80, 1, "map");
    this.map.setScale(2);
    this.uiContainer.add(this.map);
    this.uiContainer.add(this.mapLocater);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cannon = this.physics.add.sprite(-150, game.config.height/2 + 60, "cannon");
    this.cannondown = this.physics.add.sprite(-150, game.config.height/2 + 60, "cannondown");
    this.cannon.setScale(2);
    this.cannondown.setScale(2);
    
    this.eagleWarning = this.add.sprite(game.config.width / 2, 50, "warning");
    this.eagleWarning.setAlpha(0);
    this.eagleWarning.setScrollFactor(0);
    this.time.addEvent({
      delay: Phaser.Math.Between(5000, 8000),
      callback: this.spawnEagle,
      callbackScope: this,
      loop: true,
    });

    if(globalDuck >= 1){
      this.duck = this.add.sprite(-300, game.config.height / 2 - 80, "duckplayer");
      this.duck.play("duckPFly");
      globalDuck -= 1;
      this.duckRun = true;
      this.breadcooldown = this.add.sprite(180, 200, "breadcooldown");
      this.breadcooldown.anims.play("breadAnim");
      this.breadcooldown.anims.pause();
      
      this.uiContainer.add(this.breadcooldown);
    }
    else{
      this.duckRun = false;
      console.log(this.duckRun);
    }
    if(this.duckRun == true){
      this.duckExist = true;
    }
    else{
      this.duckExist = false
      this.duckRun = false;
    }
    

    
    this.menuBg = this.add.graphics();
    this.menuBg.fillStyle(0x0000, 1);
    this.menuBg.fillRect(-200, 0, game.config.width +20, game.config.height); 
    this.menuBg.alpha = 0.5;
    this.Name = this.add.bitmapText(-110,game.config.height /2 - 40, "pixelFont", "Jungle Trail", 50);
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
          volume: 0.25,
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
    this.time.addEvent({
      delay: 5000,
      callback:async () => {
        if(this.player.body.gravity.y >10)
          this.gravity += 10;
          this.player.body.gravity.y = 30- this.gravity;
        console.log(this.player.body.gravity.y)
        if(this.player.Speed <0.7){
          this.playerSpeed -= 0.3
        }
        
      },
      callbackScope: this,
      loop: true,
    });
  }
  handlePointerMove(pointer){
    if(this.menuActive == false && this.duckRun == false){
      this.input.on('pointermove', function(pointer) {
        let cursor = pointer
        let angle = Phaser.Math.Angle.Between(this.cannon.x, this.cannon.y, cursor.x + this.cameras.main.scrollX, cursor.y + this.cameras.main.scrollY);
        this.updateCannon(angle)
      },this);
    
    }
  }
  handlePointerDown(pointer){
    if(this.menuActive == false && this.cannonshot == 0 && this.duckRun == false){
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
  
         
          this.player.body.gravity.y = 30 - this.gravity;
          this.cannonshot = 1;
          
        
        }
       
      },this);
    }
  }
  update() {
    
    this.bg_1.tilePositionX = this.Cam.scrollX * .3;
    this.bg_2.tilePositionX = this.Cam.scrollX * .6;
    this.ground.tilePositionX = this.Cam.scrollX;
    
    this.Scoretemp = this.player.x - 500;
   
    globalScore = Math.max(0, Math.ceil(this.Scoretemp ));
    
    globalScore2 = globalScore/100 +globalScore2;
    globalScore2 = Math.ceil(globalScore2);
    let formattedScore = String(globalScore2).padStart(6, '0');
    this.scoreText.text = "SCORE: " + formattedScore;
    
    if(this.menuActive == false ){
      this.uiContainer.alpha = 1;
      
      
      if (this.cursors.up.isDown && this.fuelLevel > 0 && this.cannonshot == 1) {
        this.fuelLevel -= 4; 
        this.updateFuelIndicator();
        this.player.y -= this.boostSpeed - 2;
      }
      else{
        if (this.player.y < this.ground.y && this.cannonshot == 1) {
          if(this.duckRun == false){
            this.player.y += this.playerSpeed - 0.3;
          }
          if(this.duckRun == true){
            this.player.y += this.playerSpeed - 0.8;
          }
        }
        else {
        this.player.y = this.ground.y - 20;
        }
      
      }
    }
    if(this.menuActive == false && this.duckRun == true){
      this.uiContainer.alpha = 1;
      
      
      if (this.cursors.up.isDown && this.fuelLevel > 0 && !this.breadcooldown) {

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
    if(this.player.y >= this.ground.y - 1 && this.player.y && this.cannonshot == 1 && this.endX == false){
      this.scene.start("PlayGame");
      this.uiContainer.alpha = 0;
      this.cannonshot = 0;
    }
      this.uiContainer.setScrollFactor(0);
      if (this.orol && this.player) {
        this.physics.world.overlap(this.player, this.orol, this.playerDied, null, this);
      }
    if(this.duckExist == false || this.duckRun == false){
      const mapWidth = this.map.width; 
      const playerRelativeX = this.player.x / (game.config.width * 20);
      this.mapLocater.x = playerRelativeX;
      
      const mapLocatorX = this.map.x + playerRelativeX * mapWidth * 2 ;
     
      this.mapLocater.x = mapLocatorX - 90;
  
      
      const mapLeftBound = this.map.x/2 - 80;
      const mapRightBound = this.map.x + mapWidth/2 +35;
      this.mapLocater.x = Phaser.Math.Clamp(this.mapLocater.x, mapLeftBound, mapRightBound);
      
      if(this.mapLocater.x == mapRightBound && this.endX == false){
        this.sceneNew();
        this.endX = true;

      }
    }
    if(this.duckExist == true && this.duckRun == true){
      const mapWidth = this.map.width; 
      const playerRelativeX = this.duck.x / (game.config.width * 16);
      this.mapLocater.x = playerRelativeX;
      
      const mapLocatorX = this.map.x + playerRelativeX * mapWidth * 2 ;
     
      this.mapLocater.x = mapLocatorX - 90;
  
      
      const mapLeftBound = this.map.x/2 - 80;
      const mapRightBound = this.map.x + mapWidth/2 + 35;
      this.mapLocater.x = Phaser.Math.Clamp(this.mapLocater.x, mapLeftBound, mapRightBound);
      if(this.mapLocater.x == mapRightBound){
        this.Cam.stopFollow(this.duck);
        this.Cam.main.fadeOut(1000, 0, 0, 0);
        this.Cam.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
          this.scene.start("gameOver");
        });
      }
    }
    
    if(Phaser.Input.Keyboard.JustDown(this.EnterKey)){
      this.menuContainer.alpha = 0;
      this.Shop.destroy();
      this.textbg.destroy();
      this.menuActive = false;
      console.log(this.breadcooldown)
      if(this.breadcooldown != null && this.duckRun == true){
        if(!this.breadcooldown.anims.isPlaying){
          this.breadcooldown.play("breadAnim");
         
        }
      }
    }
    
    if(this.duck && this.menuActive == false && this.duckExist && this.duckRun == true){
      console.log(this.duckRun);
      this.duck.x += 2;  
      let amplitude = 10; 
      let frequency = 0.05; 
      this.duck.y = 60 + Math.sin(this.duck.x * frequency) * amplitude; 
      if (this.duck && this.duck.x > this.cannon.x + 40) {
        this.Cam.startFollow(this.duck);
      } else {
        this.Cam.startFollow(this.player);
      }
      if(this.breadcooldown){
        
        if(!this.breadcooldown.anims.isPlaying){
          this.player.x = this.duck.x;
          if(this.duck){
            this.player.y = this.duck.y;
          }
          
          this.player.alpha = 1;
          this.cannonshot = 1;
          this.duck.destroy();
          this.duckExist = false;
          this.breadcooldown.destroy();
        }
      }
        
    }
    if(this.duckExist == false && this.duckRun == true){
      this.player.x += this.playerSpeed + 5;
      this.breadcooldown.destroy();
      this.Cam.startFollow(this.player);
    }
    
    if (this.orol && this.orol.x < -50) {
      this.orol.destroy();
      this.eagleActive = false;
    }
    if(this.eagleWarning){
      this.eagleWarning.x = this.Cam.width - 30;
    }
    

  }
  updateFuelIndicator() {
    this.fuelIndicator.clear();
    this.fuelIndicator.fillStyle(0xff0000, 1);
    if(globalJetpack == 0){
      this.fuelIndicator.fillRect(-145, -10, 0, 20); 
    }
    if(globalJetpack > 0){
      this.fuelIndicator.fillRect(-145, -10, this.fuelLevel/globalJetpack, 20); 
    }
    
  }
  sceneNew(){
    console.log("end");
    this.Cam.stopFollow(this.player);
    this.cameras.main.fadeOut(1000, 0, 0, 0);
    this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
        this.scene.start("gameOver");
    });
  }
  updateCannon(angle){
    this.cannon.rotation = angle;
  }
  spawnEagle() {
    if(this.duckExist == false && this.player.x > 1000 ){
      console.log(this.eagleActive);
      if (this.eagleActive) return;
      const eagleY = Phaser.Math.Between(50, game.config.height - 50);
      this.eagleActive = true;
      this.eagleWarning.setAlpha(1);
      this.eagleWarning.y = eagleY;
      this.eagleWarning.x = this.Cam.scrollX + this.Cam.width - 50;
      this.time.delayedCall(2000, () => {
        this.eagleWarning.setAlpha(0);
        const warningTween = this.tweens.add({
          targets: this.eagleWarning,
          alpha: { from: 0, to: 1 },
          duration: 100,            
          yoyo: true,                
          repeat: 5                  
        }); 
        this.time.delayedCall(100 * 6, () => {
          this.eagleWarning.setAlpha(0); 
          warningTween.stop();
          this.orol = this.physics.add.sprite(this.Cam.scrollX + this.Cam.width, eagleY, "orol");

          this.orol.setScale(1);
          this.orol.setVelocityX(-200);
          this.physics.world.enable(this.orol);
          console.log(this.orol.x)
          this.orol.play("orolAnim")
        });

        
    

        this.physics.add.collider(this.player, this.orol, this.playerDied, null, this);
        if(this.orol){
          if (this.orol.x < this.Cam.scrollX - 50 ) {
            this.orol.destroy();
            this.eagleActive = false;
          }
        }
        
      });
    }
  }
  playerDied() {
    this.scene.start("PlayGame");
    this.eagleActive = false;
  }
 
}
