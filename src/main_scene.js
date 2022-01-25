import { Card } from './Card'
import { checkTable } from './tools'

const costTable = {
    HiCard: -1,
    OnePair: 1,
    TwoPair: 2,
    Set: 3,
    Straight: 4,
    Flush: 5,
    FullHouse: 6,
    FourKind: 7,
    FlashStright: 8,
    RoyalFlush: 10
}

export class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: "MainScene" });
        this.step = 0;
        this.score = 0;
        this.bet = 10;
    }

    create() {
        const calculateSizes = (width, height) => {
            const card_coof = 5;
            const card = {
                card_coof,
                width: (width / card_coof) - 10,
                height: (width / card_coof * (190 / 140)) - 10
            }
            const button_coof = 5;
            const button = {
                width: width / button_coof,
                height: width / button_coof * (45 / 135)
            }
            return {
                card,
                button,
                width,
                height
            }
        }
        const sizes = calculateSizes(this.game.config.width, this.game.config.height);
        console.log('create', sizes.card);
        const replaceCards = () => {
            const un = unselected();
            fiveCards.forEach((card, idx) => {
                if (un.find(e => e === card)) {
                    fiveCards[idx] = allCards.pop()
                    dropCards.push(card)
                }
            })
        }
        const unselected = () => fiveCards.filter(e => !e.selected);
        const clearselectAll = () => [...allCards, ...fiveCards].filter(e => e.setSelected(false));
        const getResult = () => checkTable(fiveCards);
        const draw = () => {
            allCards.forEach((item, idx) => item.setDepth(idx))
            Phaser.Actions.GridAlign(allCards, {
                width: 9,
                cellWidth: sizes.card.width * .3,
                cellHeight: sizes.card.height * .3,
                x: sizes.card.width / 2 + 50,
                y: sizes.height * 0.6
            })
            fiveCards.forEach((item, idx) => item.setDepth(idx))
            Phaser.Actions.GridAlign(fiveCards, {
                width: 5,
                cellWidth: sizes.card.width + 10,
                cellHeight: sizes.card.height,
                x: sizes.card.width / 2 + 10,
                y: sizes.card.height / 2 + sizes.height * 0.1,
            })
            dropCards.forEach((item, idx) => item.setDepth(idx))
            Phaser.Actions.GridAlign(dropCards, {
                width: 10,
                cellWidth: 15,
                cellHeight: 30,
                x: sizes.card.width / 2,
                y: sizes.height * 0.35
            })
        }

        const init = (arr, depth = 1) => {
            arr.forEach(item => {
                this.add.existing(item)
                    .setDepth(depth)
                    .on('my-event', event => {
                    }).on('pointerover', function () {
                        this.setHover(true);
                    }).on('pointerout', function () {
                        this.setHover(false);
                    }).on('pointerup', function () {
                        this.toggle();
                    })
            });
        }


        let allCards = this.textures.get('cards')
            .getFrameNames()
            .filter(em => em !== 'joker' && em !== 'back')
            .map(name => new Card(this, name, sizes.card));
        let dropCards = [];
        let fiveCards = Array(2).fill(0).map(e => allCards.pop());

        init(allCards);
        init(fiveCards);
        this.score = 100;

        draw();
        this.cameras.main.setBounds(0, 0, this.game.config.width, this.game.config.height);
        const on3button = event => {
            const _this = this;
            this.cameras.main.on('camerafadeoutcomplete', function (camera) {
                _this.scene.restart()
            });
            this.cameras.main.fadeOut(1000);
        }

        const on2button = event => {
            // this.scene.start('ResultScene', getResult());
            // debug.setText('Сменить сцену');
            this.bet = this.score;
        }

        const makeBtn = (row, img = 0, y = 0, callback) => {
            const { width, height } = sizes.button;
            this.add.sprite(((sizes.button.width * row - sizes.button.width) + 20 * row) + 20, y, 'button', img, this, 2, 1, 0)
                .setInteractive({ cursor: 'pointer' })
                .setOrigin(0)
                .setDisplaySize(sizes.button.width, sizes.button.height)
                .on('pointerup', callback)
        }

        const spinButton = () => {
            replaceCards();
            clearselectAll();
            if (this.step === 0) {
                // Tern
                this.step = 1;

            }
            else if (this.step === 1) {
                // River
                const result = checkTable(fiveCards);
                this.score += this.bet * costTable[result.message] || 0;
                this.step = 0;

            }
            draw();
        }

        makeBtn(1, 1, sizes.height / 2, spinButton);
        makeBtn(2, 0, sizes.height / 2, on3button);
        makeBtn(3, 2, sizes.height / 2, on2button);

        const debug = this.add.text(10, 10, "", { font: '16px Courier', fill: '#42a522' });
        this.text = debug

    }

    update() {
        this.text.setText([
            `step:${this.step}`,
            `score:${this.score}`
        ])
    }
}