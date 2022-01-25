export class WinScene extends Phaser.Scene {

    constructor() {
        super({ key: "WinScene" });
    }

    init(data) {
        this.score = data;
        console.log(data);
    }

    create() {
        this.g = this.add.graphics({ fillStyle: { color: 0xaa0000 } })
        this.rect = new Phaser.Geom.Rectangle(0, 0, 300, 200);
    }

    update() {
        this.g
            .clear()
            .fillRect(0, 0, 200, 200)
    }

}
