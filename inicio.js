class Inicio extends Phaser.Scene {
    constructor(){
        super("Inicio");
    }

    preload(){
        this.load.image("fondo","Fondo_Circo.png");
        this.load.image("bird","Bubble.png");
        this.load.image("pipe","TuboRojo.png");
        this.load.image("pipe2","TuboNaranja.png");
        this.load.image("boton","Boton_Play.png");
        this.load.image("personaje","Bubble_Portada.png");
    }

    create(){

        // 🎬 Fade IN (pro)
        this.cameras.main.fadeIn(500, 0, 0, 0);

        // 🎨 Fondo centrado
        this.add.image(this.scale.width / 2,this.scale.height / 2 ,"fondo")
         .setDisplaySize(this.scale.width,this.scale.height);


        // 🎪 Título PRO
        this.add.text(this.scale.width/2, 100, "FLAPY CIRCUS", {
            fontFamily: '"Press Start 2P"',
            fontSize: "20px",
            color: "#ff4df0",
            stroke: "#000000",
            strokeThickness: 6,
            align: "center"
        }).setOrigin(0.5);

        // 🫧 Personaje con animación flotante
        this.personaje = this.add.image(this.scale.width/2, 260, "personaje")
            .setScale(0.3);

        this.tweens.add({
            targets: this.personaje,
            y: this.personaje.y - 15,
            duration: 1000,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        // 🎮 Botón centrado
        let boton = this.add.image(this.scale.width/2, 460, "boton")
            .setInteractive()
            .setScale(0.15);

        // 🔥 Click con transición PRO
        boton.on("pointerdown", ()=>{

            this.cameras.main.fadeOut(300, 0, 0, 0);

            this.time.delayedCall(300, ()=>{
                this.scene.start ("Juego");
            });

        });

        // ✨ Hover suave
        boton.on("pointerover", ()=>{
            this.tweens.add({
                targets: boton,
                scale: 0.11,
                duration: 100
            });
        });

        boton.on("pointerout", ()=>{
            this.tweens.add({
                targets: boton,
                scale: 0.10,
                duration: 100
            });
        });

        // 💫 EFECTO EXTRA (respiración del botón)
        this.tweens.add({
            targets: boton,
            scale: 0.105,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });
    }
}
