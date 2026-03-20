const config = {
    type: Phaser.AUTO,

    width: 360,
    height: 640,

    backgroundColor: "#000000",

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },

    scene: [Inicio, Juego, GameOver]
};

const game = new Phaser.Game(config);

// 📱 Forzar vertical
if (screen.orientation) { 
    screen.orientation.lock("portrait").catch(function(error){
        console.log("No se pudo bloquear orientación");
    });
}