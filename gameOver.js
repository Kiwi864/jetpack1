class GameOver extends Phaser.Scene {
    constructor() {
      super("gameOver");
      
      
    }
    create(){
        globalScore = Phaser.Math.RoundTo(globalScore, 0)
        console.log("ending!!!");
        this.gameOver = this.add.bitmapText(100,56, "pixelFont", "GAME OVER", 50);
        this.finalScoreLabel = this.add.bitmapText(75,90, "pixelFont", "SCORE ", 25);
        this.resetLabel = this.add.bitmapText(100,116, "pixelFont", "PRESS Z TO START AGAIN", 20);
        this.ZKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
        
    }
    update(){
        
        let formattedScore = String(globalScore).padStart(6, '0');
        if(this.finalScoreLabel){
            this.finalScoreLabel.text = "TOTAL DISTANCE: " + formattedScore; 
        } 
        if (Phaser.Input.Keyboard.JustDown(this.ZKey)){
           
            this.scene.start("PlayGame");
            
            
        }
    }
}