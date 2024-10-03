class Shop extends Phaser.Scene {
  constructor() {
    super("Shop");
    this.game = game;
    this.movetextIndic = 0;
    this.shopItems = 0;
    this.shakingItem = false;
    this.jetpackPrice = 400;
    this.cannonPrice = 200;
    this.duckPrice = 1000;
  }
  create(){
    this.shopBg = this.add.tileSprite(190,120, game.config.width, game.config.height, "ShopBg");

    this.textbg = this.add.sprite(330, 5, "textbg").setInteractive();
    this.textbg.angle = 90;
    this.textbg.alpha = 0.5;
    this.Play = this.add.bitmapText(290,5, "pixelFont", "PLAY", 40);

    this.menuBg  = this.add.sprite(190, 282, "menubg").setInteractive();
    this.MenuText = this.add.bitmapText(game.config.width / 2 - 30,game.config.height - 55, "pixelFont", "MENU", 50);

    this.collizion = this.add.zone(game.config.width /2, this.MenuText.y, game.config.width+ 50, this.MenuText.height + 40).setInteractive(); 
    this.collizionUp = this.add.zone(game.config.width /2, 45, game.config.width+ 50, this.MenuText.height + 25).setInteractive(); 
    this.MenuText2 = this.add.bitmapText(game.config.width / 4 -20,game.config.height - 30, "pixelFont", ">", 80);
    
    this.MenuText2.angle -= 90;
    this.MenuText3 = this.add.bitmapText(game.config.width -90,game.config.height - 30, "pixelFont", ">", 80);
    this.MenuText3.angle -= 90;
    
    this.noMoneySound = this.sound.add("noMoney");
    this.paySound = this.sound.add("pay");

    this.jetpack  = this.add.sprite(130, 290, "jetpack").setInteractive();
    this.jetpack.setScale(4);
    this.JetpackText = this.add.bitmapText(game.config.width  - 160,game.config.height /2 + 130, "pixelFont", "  JETPACK ", 25);
    this.JetpackText2 = this.add.bitmapText(game.config.width - 180, game.config.height / 2 + 150, "pixelFont", `this item boosts\n  you off the\n      ground\n (limited fuel)\n     cost:  ${this.jetpackPrice}`, 25);
    this.jetpackContainer = this.add.container(10, 10);
    this.jetpackContainer.add(this.jetpack);
    this.jetpackContainer.add(this.JetpackText);
    this.jetpackContainer.add(this.JetpackText2);
    this.jetpackContainer.alpha = 0;

    this.cannondown = this.add.sprite(130,300, "cannondown").setInteractive();
    this.cannondown.setScale(2.5);
    this.cannon = this.add.sprite(130,290, "cannon").setInteractive();
    this.cannon.setScale(2.5);
    this.cannonText = this.add.bitmapText(game.config.width  - 160,game.config.height /2 + 130, "pixelFont", "  CANNON ", 25);
    this.cannonText2 = this.add.bitmapText(game.config.width  - 180,game.config.height /2 + 150, "pixelFont", `this item can \n upgrade the \n strength of \nyour cannon\n     cost:  ${this.cannonPrice}` , 25);
    this.cannonContainer = this.add.container(10, 10);
    this.cannonContainer.add(this.cannon);
    this.cannonContainer.add(this.cannondown);
    this.cannonContainer.add(this.cannonText);
    this.cannonContainer.add(this.cannonText2);
    this.cannonContainer.alpha = 0;

    this.duck  = this.add.sprite(130, 305, "bread").setInteractive();
    this.duck.setScale(3);
    this.duckText = this.add.bitmapText(game.config.width  - 160,game.config.height /2 + 130, "pixelFont", "  BREAD ", 25);
    this.duckText2 = this.add.bitmapText(game.config.width - 190, game.config.height / 2 + 150, "pixelFont", `this item lures\na hungry duck\n     that will \n    carry you\n    cost:  ${this.duckPrice}`, 25);
    this.duckContainer = this.add.container(10, 10);
    this.duckContainer.add(this.duck);
    this.duckContainer.add(this.duckText);
    this.duckContainer.add(this.duckText2);
    this.duckContainer.alpha = 0;

    this.ArrowLeft = this.add.bitmapText(60,290, "pixelFont", "<", 50);
    this.ArrowRight = this.add.bitmapText(game.config.width - 60,290, "pixelFont", ">",50).setInteractive();
    this.arrowRightZone = this.add.sprite(this.ArrowRight.x, this.ArrowRight.y, "cannon").setOrigin(0.5).setInteractive().setScale(2);
    this.arrowRightZone.alpha = 0.01;
    this.arrowLeftZone = this.add.sprite(this.ArrowLeft.x, this.ArrowLeft.y, "cannon").setOrigin(0.5).setInteractive().setScale(2);
    this.arrowLeftZone.alpha = 0.01;
    this.jetpackContainer.add(this.ArrowLeft);
    this.jetpackContainer.add(this.ArrowRight);
    this.jetpackContainer.add(this.arrowRightZone);
    this.jetpackContainer.add(this.arrowLeftZone);

    this.buyText = this.add.bitmapText(game.config.width/2 -140,360, "pixelFont", "click the icon to buy", 15);
    
    this.scoreText = this.add.bitmapText(game.config.width/2 -140,240, "pixelFont", "SCORE: ", 25);
    this.jetpackContainer.add(this.buyText);
    this.jetpackContainer.add(this.scoreText);

    
    
    

    this.collizion.on('pointerdown', () => {
      console.log("move")
      if (this.movetextIndic == 0) {
        this.movetextIndic = 1;  
      } 
    });
    this.collizionUp.on('pointerdown', () => {
      console.log("move")
      if (this.movetextIndic == 2) {
        this.movetextIndic = 3;  
      }
    });
    this.arrowRightZone.on('pointerdown', () => {
      console.log("fade");
      this.fadeRight();

    });

    this.arrowLeftZone.on('pointerdown', () => {
      console.log("fade");
      this.fadeLeft();
    
    });

    this.textbg.on('pointerdown', () => {
      this.scene.start("PlayGame");
    
    });
    
    this.cannondown.on('pointerdown', () => {
      if(globalScore2 >= this.cannonPrice && this.cannon.texture.key !== "cannonsold"){
        globalScore2 -= this.cannonPrice;
        globalScore -= this.cannonPrice;
        globalCannonStrength += 37.5;
        this.paySound.play();
        this.cannonPrice *= 2;
        this.cannonText2.setText(`this item can \n upgrade the \n strength of \nyour cannon\n     cost: ${this.cannonPrice}`);
      }else if (this.shakingItem == false && this.cannon.texture.key !== "cannonsold") {
          this.shakingItem = true
          this.noMoneySound.play();
          this.cannondown.setTint(0xff0000); 
          this.tweens.add({
              targets: [this.cannon, this.cannondown],
              x: this.cannon.x + 5, 
              y: this.cannon.y + 5,
              x: this.cannondown.x + 5,
              y: this.cannondown.y + 5, 
              duration: 50, 
              yoyo: true,
              repeat: 5, 
              onComplete: () => {
                this.shakingItem = false;
                this.cannondown.clearTint();
                console.log("nic")
              }
          });
        
        
      }
    });
    this.jetpack.on('pointerdown', () => {
      if(globalScore2 >= this.jetpackPrice){
        globalScore2 -= this.jetpackPrice;
        globalScore -= this.jetpackPrice;
        this.paySound.play();
        globalJetpack += 1;
        this.jetpackPrice *= 2;  
        this.JetpackText2.setText(`this item boosts\n  you off the\n      ground\n (limited fuel)\n     cost: ${this.jetpackPrice}`);
      }else if (this.shakingItem == false) {
        this.shakingItem = true
        this.noMoneySound.play();
        this.jetpack.setTint(0xff0000); 
        this.tweens.add({
            targets: this.jetpack,
            x: this.jetpack.x + 5, 
            y: this.jetpack.y + 5,
           
            duration: 50, 
            yoyo: true,
            repeat: 5, 
            onComplete: () => {
              this.shakingItem = false;
              this.jetpack.clearTint();
              console.log("nic")
            }
        });
        
        
      }
    });
    this.duck.on('pointerdown', () => {
      if(globalScore2 >= this.duckPrice){
        globalScore2 -= this.duckPrice;
        globalScore -= this.duckPrice;
        this.paySound.play();
        globalDuck += 1;
        this.duckPrice *= 2;  
        this.duckText2.setText(`this item lures\na hungry duck\nthat will carry \n        you\n     cost:  ${this.duckPrice}`);
      }else if (this.shakingItem == false) {
        this.shakingItem = true
        this.noMoneySound.play();
        this.duck.setTint(0xff0000); 
        this.tweens.add({
            targets: this.duck,
            x: this.duck.x + 5, 
            y: this.duck.y + 5,
           
            duration: 50, 
            yoyo: true,
            repeat: 5, 
            onComplete: () => {
              this.shakingItem = false;
              this.duck.clearTint();
              console.log("nic")
            }
        });
        
        
      }
    });
      
  }
  update(){
    console.log(this.shopItems)
    let formattedScore = String(globalScore2).padStart(6, '0');
    this.scoreText.text = "SCORE: " + formattedScore;
    if(this.movetextIndic == 1 && this.menuBg.y > 120){
      this.menuBg.y -= 5;
      this.MenuText.y -= 5;
      this.MenuText2.y -= 5;
      this.MenuText3.y -= 5;
      this.jetpackContainer.y -= 5;
      this.cannonContainer.y -= 5;
      this.duckContainer.y -= 5;
    }
    if(this.movetextIndic == 3 && this.menuBg.y <= 280){
      this.menuBg.y += 5;
      this.MenuText.y += 5;
      this.MenuText2.y += 5;
      this.MenuText3.y += 5;
      this.jetpackContainer.y += 5;
      this.cannonContainer.y += 5;
      this.duckContainer.y += 5;
      
    }    
    if(this.menuBg.y <= 120){
      this.movetextIndic = 2;
      this.MenuText2.angle = 90;
      this.MenuText3.angle = 90;
      this.MenuText2.setOrigin(0.7,0.7);
      this.MenuText3.setOrigin(0.7,0.7);
      this.jetpackContainer.alpha = 1;
      this.collizionUp.setInteractive();
      this.collizion.disableInteractive();
      this.textbg.alpha = 0;
      this.Play.alpha = 0;
      this.textbg.disableInteractive();
      
    }
    if(this.menuBg.y >= 280 && this.movetextIndic == 3){
      this.movetextIndic = 0;
      this.MenuText2.angle = 270;
      this.MenuText3.angle = 270;
      this.MenuText2.setOrigin(0,0);
      this.MenuText3.setOrigin(0,0);
      this.collizion.setInteractive();
      this.collizionUp.disableInteractive();
      this.textbg.alpha = 0.5;
      this.Play.alpha = 1;
      this.textbg.setInteractive();
    }
    if(globalCannonStrength >= 150){
      this.cannon.setTexture("cannonsold");
      this.cannondown.setTexture("cannondownsold");
      this.cannonText2.setText("\n    SOLD OUT");
    }
  }
  fadeLeft(){
    console.log("fadeLeft");
    if(this.shopItems == 0){
      this.tweens.add({
        targets: [this.jetpack, this.JetpackText,this.JetpackText2],
        alpha: 0,
        duration: 1000,
        ease: "Power2",
        onComplete: () => {
          this.shopItems = 2;
          this.duck.alpha = 1;
          this.duckText.alpha = 1;
          this.duckText2.alpha = 1;
          this.tweens.add({
            targets: this.duckContainer,
            alpha: 1,
            duration: 2000,
            ease: "Power2",
            
          });
        }
      });
   
    }

    if(this.shopItems == 2){
      console.log(this.shopItems);
      this.tweens.add({
        targets: [this.duck, this.duckText,this.duckText2],
        alpha: 0,
        duration: 1000,
        ease: "Power2",
        onComplete: () => {
          this.shopItems = 1;
          this.cannon.alpha = 1;
          this.cannondown.alpha = 1;
          this.cannonText.alpha = 1;
          this.cannonText2.alpha = 1;
          this.tweens.add({
            targets: this.cannonContainer,
            alpha: 1,
            duration: 1000,
            ease: "Power2",
            
          });
        }
      });
     
    }
    if(this.shopItems == 1){
      console.log(this.shopItems);
      this.tweens.add({
        targets: [this.cannon,this.cannondown, this.cannonText,this.cannonText2],
        alpha: 0,
        duration: 1000,
        ease: "Power2",
        onComplete: () => {
          this.shopItems = 0;
          
          this.tweens.add({
            targets: [this.jetpack, this.JetpackText,this.JetpackText2],
            alpha: 1,
            duration: 1000,
            ease: "Power2",
            
          });
        }
      });
     
    }
  }
  fadeRight(){
    if(this.shopItems == 0){
      this.tweens.add({
        targets: [this.jetpack, this.JetpackText,this.JetpackText2],
        alpha: 0,
        duration: 1000,
        ease: "Power2",
        onComplete: () => {
          this.shopItems = 1;
          this.cannon.alpha = 1;
          this.cannondown.alpha = 1;
          this.cannonText.alpha = 1;
          this.cannonText2.alpha = 1;
          this.tweens.add({
            targets: this.cannonContainer,
            alpha: 1,
            duration: 1000,
            ease: "Power2",
            
          });
        }
      });
    }

    if(this.shopItems == 1){
      this.tweens.add({
        targets: [this.cannon, this.cannondown, this.cannonText,this.cannonText2],
        alpha: 0,
        duration: 1000,
        ease: "Power2",
        onComplete: () => {
          this.shopItems = 2;
          this.duck.alpha = 1;
          this.duckText.alpha = 1;
          this.duckText2.alpha = 1;
          this.tweens.add({
            targets: this.duckContainer,
            alpha: 1,
            duration: 1000,
            ease: "Power2",
            
          });
        }
      });
    }
      if(this.shopItems == 2){
        this.tweens.add({
          targets: [this.duck, this.duckText,this.duckText2],
          alpha: 0,
          duration: 1000,
          ease: "Power2",
          onComplete: () => {
            this.shopItems = 0;
            this.tweens.add({
              targets: [this.jetpack, this.JetpackText,this.JetpackText2],
              alpha: 1,
              duration: 1000,
              ease: "Power2",
              
            });
          }
        });
      
    }
  }
}