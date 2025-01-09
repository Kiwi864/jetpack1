class preloadGame extends Phaser.Scene{
    constructor(){
      super("PreloadGame");
    }
    preload(){
      this.load.image("bg_1", "assets/backgrounds/bg-1.png");
      this.load.image("bg_2", "assets/backgrounds/bg-2.png");
      this.load.image("ground", "assets/backgrounds/ground.png");
      this.load.image("ShopBg", "assets/backgrounds/shopBg.png");
      this.load.image("dialogue", "assets/backgrounds/dialogueM.png");

      this.load.audio("noMoney", ["assets/sounds/noMoney.ogg", "assets/sounds/noMoney.mp3"]);
      this.load.audio("pay", ["assets/sounds/pay.ogg", "assets/sounds/pay.mp3"]);
      this.load.audio("bgmusic", ["assets/sounds/backgroundmusic.ogg", "assets/sounds/backgroundmusic.mp3"]);
      this.load.audio("cannonsound", ["assets/sounds/cannonFire.ogg", "assets/sounds/cannonFire.mp3"]);
      this.load.audio("turkey", ["assets/sounds/Turkey.ogg", "assets/sounds/Turkey.mp3"]);

      this.load.spritesheet("player", "assets/spritesheets/bee.png",{
        frameWidth: 37,
        frameHeight: 39
      });
      this.load.spritesheet("playerkebab", "assets/spritesheets/beemitkebab.png",{
        frameWidth: 37,
        frameHeight: 39
      });
      this.load.spritesheet("map", "assets/spritesheets/map.png",{
        frameWidth: 143,
        frameHeight: 64
      });
      this.load.spritesheet("mapLoc", "assets/spritesheets/maplocater.png",{
        frameWidth: 84,
        frameHeight: 64
      });
      this.load.spritesheet("cannon", "assets/spritesheets/cannon.png",{
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("cannondown", "assets/spritesheets/cannondown.png",{
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("cannonsold", "assets/spritesheets/cannonsold.png",{
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("cannondownsold", "assets/spritesheets/cannondownsold.png",{
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("textbg", "assets/spritesheets/textbg.png",{
        frameWidth: 70,
        frameHeight: 124
      });
      this.load.spritesheet("menubg", "assets/spritesheets/menu.png",{
        frameWidth: 384,
        frameHeight: 240
      });
      this.load.spritesheet("jetpack", "assets/spritesheets/jetpack.png",{
        frameWidth: 32,
        frameHeight: 32
      });
      this.load.spritesheet("duck", "assets/spritesheets/duck.png",{
        frameWidth: 98,
        frameHeight: 98
      });  
      this.load.spritesheet("duckplayer", "assets/spritesheets/duckplayer.png",{
        frameWidth: 98,
        frameHeight: 98
      }); 
      this.load.spritesheet("bread", "assets/spritesheets/bread.png",{
        frameWidth: 32,
        frameHeight: 32
      });    
      this.load.spritesheet("breadcooldown", "assets/spritesheets/breadcooldown.png",{
        frameWidth: 64,
        frameHeight: 64
      });  
      this.load.spritesheet("kebab", "assets/spritesheets/kebab.png",{
        frameWidth: 240,
        frameHeight: 240
      });  
      this.load.spritesheet("kuchar", "assets/spritesheets/kuchar.png",{
        frameWidth: 50,
        frameHeight: 50
      });
      this.load.spritesheet("pdial", "assets/spritesheets/beedial.png",{
        frameWidth: 37,
        frameHeight: 39
      });

      this.load.spritesheet("textbg", "assets/spritesheets/textbg.png",{
        frameWidth: 70,
        frameHeight: 124
    });  
    
    this.load.bitmapFont("pixelFont", "assets/font/font.png", "assets/font/font.xml");
    this.load.bitmapFont("pixelFont2", "assets/font/font2.png", "assets/font/font2.xml");
    this.load.bitmapFont("pixelFont3", "assets/font/font3.png", "assets/font/font3.xml");
      
    }
    create(){
      this.scene.start("PlayGame");
      
      this.anims.create({
        key: "fly",
        frames: this.anims.generateFrameNumbers("player"),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "flykebab",
        frames: this.anims.generateFrameNumbers("playerkebab"),
        frameRate: 20,
        repeat: -1
      });
      this.anims.create({
        key: "duckFly",
        frames: this.anims.generateFrameNumbers("duck"),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: "duckPFly",
        frames: this.anims.generateFrameNumbers("duckplayer"),
        frameRate: 5,
        repeat: -1
      });
      this.anims.create({
        key: "breadAnim",
        frames: this.anims.generateFrameNumbers("breadcooldown"),
        frameRate: 5,
        repeat: 0
      });
    }
}
