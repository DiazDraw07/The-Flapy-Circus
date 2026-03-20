class Juego extends Phaser.Scene {
    constructor(){
        super("Juego");
    }

    preload(){
        this.load.audio("musica", "ASSETS/Cancion.mp3");
        this.load.audio("hit", "ASSETS/Pop.mp3");
        this.load.image("fondo","ASSETS/Fondo_Circo.png");
    }

    create(){

        this.ancho = this.scale.width;
        this.alto = this.scale.height;

        this.iniciado = false;

        // 🎵 Música fondo
        this.musica = this.sound.add("musica", {
            loop: true,
            volume: 0.4
        });

        // 💀 Sonido muerte
        this.sonidoHit = this.sound.add("hit");

        // 🧠 Texto inicio
        this.textoInicio = this.add.text(this.ancho/2, this.alto/2, "TAP TO START", {
            fontFamily: '"Press Start 2P"',
            fontSize: "14px",
            color: "#ffffff"
        }).setOrigin(0.5);

        // 🎬 Fade IN
        this.cameras.main.fadeIn(150, 0, 0, 0);

        // 🎨 Fondo con parallax
        this.fondo = this.add.tileSprite(
    this.ancho/2,
    this.alto/2,
    this.textures.get("fondo").getSourceImage().width,
    this.textures.get("fondo").getSourceImage().height,
    "fondo"
);

// 📏 Escalar proporcionalmente
let escalaX = this.ancho / this.fondo.width;
let escalaY = this.alto / this.fondo.height;

let escala = Math.max(escalaX, escalaY);

this.fondo.setScale(escala);

        // 🐦 Bird
        this.bird = this.physics.add.sprite(100, this.alto/2, "bird");
        this.bird.setDisplaySize(50, 50);
        this.bird.body.setSize(this.bird.width * 0.7, this.bird.height * 0.7);
        this.bird.setCollideWorldBounds(true);

        // ✨ Partículas
        this.particulas = this.add.particles(0, 0, "bird", {
            speed: 20,
            scale: { start: 0.02, end: 0 },
            alpha: { start: 0.5, end: 0 },
            lifespan: 300,
            frequency: 60,
            blendMode: 'ADD'
        });

        this.particulas.startFollow(this.bird);

        // 🎮 Input
        this.input.on("pointerdown", ()=>{

            if(!this.iniciado){
                this.iniciado = true;

                this.textoInicio.destroy();

                // 🎵 INICIA MÚSICA
                if(!this.musica.isPlaying){
                    this.musica.play();
                }

                return;
            }

            this.bird.setVelocityY(-300);

            this.tweens.add({
                targets: this.bird,
                angle: -20,
                duration: 100
            });
        });

        // 🧱 Pipes
        this.pipes = this.physics.add.group();

        this.time.addEvent({
            delay: 1500,
            callback: this.crearTubos,
            callbackScope: this,
            loop: true
        });

        // 🎯 Score
        this.score = 0;

        this.textoScore = this.add.text(this.ancho/2, 50, "0", {
            fontFamily: '"Press Start 2P"',
            fontSize: "32px",
            color: "#ffffff",
            stroke: "#000000",
            strokeThickness: 5
        }).setOrigin(0.5);

        // 💥 Colisión
        this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);

        // 🧠 Capas
        this.fondo.setDepth(0);
        this.particulas.setDepth(1);
        this.bird.setDepth(2);
        this.pipes.setDepth(2);
        this.textoScore.setDepth(3);
    }

    update(){
        this.fondo.tilePositionX += 1;

        if (this.bird.body.velocity.y > 0) {
            this.bird.setAngle(20);
        }
    }

    crearTubos(){

        let espacio = Phaser.Math.Between(150, 220);
        let altura = Phaser.Math.Between(100, this.alto - 100);

        let tipoPipe = Phaser.Math.Between(0,1) ? "pipe" : "pipe2";

        let arriba = this.pipes.create(this.ancho, altura - espacio/2, tipoPipe);
        let abajo = this.pipes.create(this.ancho, altura + espacio/2, tipoPipe);

        // 🎯 Escala correcta
        let anchoDeseado = 70;
        let escala = anchoDeseado / arriba.width;

        arriba.setScale(escala);
        abajo.setScale(escala);

        arriba.setOrigin(0,1);
        abajo.setOrigin(0,0);

        arriba.body.setSize(arriba.width * 0.8, arriba.height);
        abajo.body.setSize(abajo.width * 0.8, abajo.height);

        arriba.body.allowGravity = false;
        abajo.body.allowGravity = false;

        arriba.setVelocityX(-200);
        abajo.setVelocityX(-200);

        arriba.y = Math.floor(arriba.y);
        abajo.y = Math.floor(abajo.y);

        arriba.setAlpha(0.9);
        abajo.setAlpha(1);

        // 🎯 Score
        this.score++;
        this.textoScore.setText(this.score);

        this.textoScore.setScale(1.3);

        this.tweens.add({
            targets: this.textoScore,
            scale: 1,
            duration: 150
        });
    }

    gameOver(){

        this.physics.pause();

        this.cameras.main.shake(300, 0.01);

        this.bird.setTint(0xff0000);

        // 🔇 detener TODA la música del juego
             this.sound.stopAll();  

        // 💀 SONIDO MUERTE
        this.sonidoHit.play();

        this.time.delayedCall(500, ()=>{

            this.cameras.main.fadeOut(300, 0, 0, 0);

            this.time.delayedCall(300, ()=>{
                this.scene.start("GameOver", {score: this.score});
            });

        });
    }
}