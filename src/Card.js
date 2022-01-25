import { splitCardName } from './tools'

export class Card extends Phaser.GameObjects.Sprite {
    constructor(master, spriteName = 'back', sizes = {}) {
        super(master, 0, 0, 'cards', spriteName);
        this.name = spriteName;
        this.g = master.add.graphics();
        this.active = true;
        this.setData('v', splitCardName(spriteName))
            .setData('selected', false)
            .setData('hover', false)
            .setOrigin(0)
            .setDisplaySize(sizes.width, sizes.height)
            .setInteractive({ cursor: 'pointer' })
        // .setScale(.5)
        this.bounds = this.getBounds();
    }

    setSelected(value) {
        this.setData('selected', value);
        return this;
    }

    setHover(value) {
        this.setData('hover', value);
        return this;
    }

    toggle() {
        this.setSelected(!this.selected)
        return this
    }

    get selected() {
        return this.getData('selected');
    }

    get hover() {
        return this.getData('hover');
    }

    get parsed() {
        return this.getData('v');
    }
    setDepth(depth) {
        super.setDepth(depth);
        this.g.setDepth(depth);
        return this;
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);
        this.g.clear();
        this.g.lineStyle(5, 0x00ff00);
        if (this.hover) {

        }
        if (this.selected) {
            this.g.strokeRectShape(this.getBounds());
        }
    }
}