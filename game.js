globalScore = 0;
globalCannonStrength = 0;
globalJetpack = 0;
globalScore2 = 0;
var game;
window.onload = function(){
  let gameConfig = {
    type: Phaser.CANVAS,
    width: 384,
    height: 240,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
          gravity: {
            y: 0
          }
      }
    },
    scene: [preloadGame, playGame, GameOver,Shop]
  }
  game = new Phaser.Game(gameConfig);
}
