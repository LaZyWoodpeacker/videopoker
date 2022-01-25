export class ResultScene extends Phaser.Scene {

    constructor() {
        super({ key: "ResultScene" });
    }
    init(result) {
        this.result = result || 'no result';
    }

    preload() {
        this.load.image('face', 'button_sprite_sheet.png');
    }

    create() {
        this.face = this.add.image(400, 400, 'face');
        this.input.on('pointerup', function (pointer, gameObject) {
            const _this = this;
            this.cameras.main.on('camerafadeoutcomplete', function (camera) {
                _this.scene.start('MainScene');
            });
            this.cameras.main.fadeOut(1000);
        }, this);
        this.text = this.add.text(21, 16, 'Loaded scene', { font: '16px Courier', fill: '#00ff00' });
    }

    update(time, delta) {
        this.text.setText([
            this.result.message
        ])
    }
}
