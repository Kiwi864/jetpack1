class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOver");
      this.atPlace = 0;
      this.textAway = 0;
      
      
    }
    create(){
        this.fadeOutAllSounds(2000);
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
        this.kebab = this.add.tileSprite(270, 130, 240, 240, "kebab");
        this.kebab.setScale(0.75);
        this.player = this.add.sprite(-150, game.config.height / 2 + 50, "player");
        this.player.alpha = 1;
        this.physics.world.enable(this.player);
        this.player.play("fly");
        this.Cam =this.cameras.main
        this.Cam.startFollow(this.player);
        this.Cam.setBounds(-300,0, game.config.width * 200, game.config.height);
        this.cursors = this.input.keyboard.createCursorKeys();
        this.uiContainer = this.add.container();
    }
    update(){
        
        if(this.player.x < this.kebab.x - 57 && this.atPlace == 0){
            this.player.x += 1;
            this.player.scaleX = -1;
            
        }  
        if(this.player.x >= this.kebab.x - 60 && this.atPlace == 0){
            this.dialogueStart();
            this.atPlace = 1;

            
        }  
        if(this.atPlace == 2 && this.textAway == 0){
            this.player.x += 0.5;
            this.player.scaleX = -1;
            this.phonedialog.x = this.player.x; 
            if(this.Name){
                this.Name.x = this.player.x - 100;
                this.Name2.x = this.player.x - 70;
            }

            console.log(this.phonedialog.visible);
            console.log(this.phonedialog.text)
            console.log(this.phonedialog.x)

        }  
        if(this.atPlace == 2 && this.textAway == 1){
            this.player.x += 0.5;
            this.player.scaleX = -1;
            this.phonedialog.x -= 5; 

            console.log(this.phonedialog.visible);
            console.log(this.phonedialog.text)
            console.log(this.phonedialog.x)

        } 
        if (this.phonedialog && this.textAway == 1) {
            const cameraBounds = this.Cam.worldView;
            const dialogBounds = this.phonedialog.getBounds();
            if (Phaser.Geom.Intersects.RectangleToRectangle(cameraBounds, dialogBounds)) {
                this.textAway = 1;
            } 
            else {
                this.textAway = 0;
                this.phonedialog.alpha = 0;
            }
        }
        this.bg_1.tilePositionX = this.Cam.scrollX * .3;
        this.bg_2.tilePositionX = this.Cam.scrollX * .6;
        this.ground.tilePositionX = this.Cam.scrollX;
      
    }
    dialogueStart(){
        this.music = this.sound.add("turkey", {volume: 0.25});
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
        this.dialog = this.add.tileSprite(game.config.width/2 - 80,0, game.config.width/2 + 28, 52, "dialogue");
        this.dialog.setOrigin(0,0);
        this.dialog.alpha = 0.75;
        this.admiral = this.add.sprite(165, 26, "pdial");
        this.admiral.setScale(1.25);
        this.admiral.alpha= 1;
        this.chef = this.add.sprite(165, 26, "kuchar");
        this.chef.setScale(1);
        this.chef.alpha= 0;
        this.phonedialog = this.add.bitmapText(202,12, "pixelFont", " ", 19);
        this.uiContainer = this.add.container();
        this.uiContainer.add(this.phonedialog);
        this.typewriteBitmapText(this.phonedialog, " Jonapot Kivanok\nOne Kebab please ");
        this.time.addEvent({
            delay: 2000,
            callback: async () => {
                this.admiral.alpha=0;
                this.chef.alpha=1;
                this.phonedialog.setText("");
                this.typewriteBitmapText(this.phonedialog, " Of Course my \nfriend, which one? ");
                this.time.addEvent({
                    delay: 2000,
                    callback: async () => {
                        this.admiral.alpha=1;
                        this.chef.alpha=0;
                        this.phonedialog.setText("");
                        this.typewriteBitmapText(this.phonedialog, "The pork one\n bitteshon ");
                        this.time.addEvent({
                            delay: 2000,
                            callback: async () => {
                                this.admiral.alpha=0;
                                this.chef.alpha=1;
                                this.phonedialog.setText("");
                                this.typewriteBitmapText(this.phonedialog, "Here you go my \n       friend! ");
                                this.time.addEvent({
                                    delay: 2000,
                                    callback: async () => {
                                        this.player.setTexture("playerkebab");
                                        this.player.play("flykebab");
                                    },
                                    callbackScope: this,
                                });
                                this.time.addEvent({
                                    delay: 2000,
                                    callback: async () => {
                                        this.admiral.alpha=1;
                                        this.chef.alpha=0;
                                        this.phonedialog.setText("");
                                        this.typewriteBitmapText(this.phonedialog, "Thank you bye!");

                                        this.time.addEvent({
                                            delay: 2000,
                                            callback: async () => {
                                                
                                                this.admiral.alpha=0;
                                                this.dialog.alpha=0;
                                                this.atPlace = 2;
                                                this.phonedialog.setText("");
                                                this.time.addEvent({
                                                    delay: 2000,
                                                    callback: async () => {
                                                        this.credits();
                                                    },
                                                    callbackScope: this,
                                                });
                                            },
                                            callbackScope: this,
                                        });
                                    },
                                    callbackScope: this,
                                });
                            },
                            callbackScope: this,
                        });
                    },
                    callbackScope: this,
                });
            },
            callbackScope: this,
        });

    }
    credits(){
        this.phonedialog.setText("Made By:Samuel Tamas");
        this.phonedialog.alpha = 0;
        this.textfade();
        this.phonedialog.alpha = 0;
        this.delay(4000,"Code: Samuel Tamas");
        this.delay(8000,"Inspiration: Ansimuz");
        this.delay(12000,"Background: Ansimuz");
        this.delay(16000,"MUSIC");
        this.delay(19000,"8-Bit Jungle\n Charlie Armour");
        this.delay(23000,"Saniye'm\nSelim Sesler & Idil Uner");
        this.delay(27000,"SPECIAL THANKS");
        this.delay(30000,"Peter Harcar");
        this.delay(33000,"Adam");
        this.delay(36000,"Erik");
        this.delay(39000,"Ansimuz");
        this.delay(42000, "Jablkovy muz");
        this.delay(45000, "Filip Bokros");
        this.delay(49000, "-SCHODIKY");
        this.delay(54000, "Made for Filip Bokros\n (kup mi kebab)");
        this.time.addEvent({
            delay: 58000,
            callback: async () => {
                this.Name = this.add.bitmapText(-110,game.config.height /2 - 40, "pixelFont", "Jungle Trail", 50);
                this.Name2 = this.add.bitmapText(-110,game.config.height /2, "pixelFont", "Thanks for playing", 20);
                this.Name.alpha = 0;
                this.Name2.alpha = 0;
                this.tweens.add({
                    targets: [this.Name],
                    alpha: { from: 0, to: 1 },
                    duration: 2000,
                    ease: "Power2",
                    onComplete: () => {
                        this.tweens.add({
                            targets: [this.Name2],
                            alpha: { from: 0, to: 1 },
                            duration: 2000,
                            ease: "Power2",
                            onComplete: () => {
                            
                            }
                        });
                    }
                });
            },
            callbackScope: this,
        });
        
        
    }
    typewriteBitmapText(targetTextObject, text)
    {
        targetTextObject.setText("");
        const bounds = this.phonedialog.getTextBounds(false)
        const wrappedText = bounds['wrappedText'] || text
    
        this.phonedialog.setText('')
    
        const length = wrappedText.length
        let i = 0
        this.time.addEvent({
            callback: () => {
                targetTextObject.text += wrappedText[i];
                ++i
            },
            repeat: length - 1,
            delay: 50
        })
    }
    textfade(){
        this.tweens.add({
            targets: [this.phonedialog],
            alpha: { from: 0, to: 1 },
            duration: 2000,
            ease: "Power2",
            onComplete: () => {
              this.textAway = 1;
            }
        });
    }
    delay(time,text){
        this.time.addEvent({
            delay: time,
            callback: async () => {
                this.textfade();
                this.phonedialog.y = Phaser.Math.Between(20, 195);
                this.phonedialog.setText(text);
                
            },
            callbackScope: this,
        });
    }
    fadeOutAllSounds(duration) {
        this.sound.sounds.forEach((sound) => {
            if (sound.isPlaying) {
                this.tweens.add({
                    targets: sound,
                    volume: 0,
                    duration: duration,
                    ease: "Linear",
                    onComplete: () => {
                        sound.stop();
                    }
                });
            }
        });
    }
    
}