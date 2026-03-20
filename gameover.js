class GameOver extends Phaser.Scene {
    constructor(){
        super("GameOver");
    }

    init(data){
        // 🔒 Evita error si no llega score
        this.finalScore = data.score || 0;
    }

    create(){

        // 🎬 Fade IN
        this.cameras.main.fadeIn(400, 0, 0, 0);

        // 🎨 Fondo bien escalado
        this.add.image(this.scale.width / 2, this.scale.height / 2, "fondo")
            .setDisplaySize(this.scale.width, this.scale.height);

        // 💀 Título centrado
        this.add.text(this.scale.width/2, 200, "GAME OVER", {
            fontFamily: '"Press Start 2P"',
            fontSize: "18px",
            color: "#ff0000",
            stroke: "#000000",
            strokeThickness: 6
        }).setOrigin(0.5);

        // 🎯 Score centrado
        this.add.text(this.scale.width/2, 270, "SCORE: " + this.finalScore, {
            fontFamily: '"Press Start 2P"',
            fontSize: "14px",
            color: "#ffffff"
        }).setOrigin(0.5);

        // 👆 Texto reinicio con animación
        this.textoReinicio = this.add.text(this.scale.width/2, 360, "CLICK PARA REINICIAR", {
            fontFamily: '"Press Start 2P"',
            fontSize: "12px",
            color: "#ffffff"
        }).setOrigin(0.5);

        // ✨ Parpadeo (pro)
        this.tweens.add({
            targets: this.textoReinicio,
            alpha: 0.3,
            duration: 600,
            yoyo: true,
            repeat: -1
        });

        // 🔄 Reinicio con transición
        this.input.once("pointerdown", ()=>{

            this.cameras.main.fadeOut(300, 0, 0, 0);

            this.time.delayedCall(300, ()=>{
                this.scene.start("Inicio");
            });

        });
    }
}