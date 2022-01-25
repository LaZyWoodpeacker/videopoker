import { MainScene } from './main_scene'
import { ResultScene } from './result_scene';
import { WinScene } from './win_scene'
import { LoadingScene } from './loading_scene'


let height = window.innerHeight;
// let height = 800;//x 450 

let width = height * 9 / 16;
if (width > window.innerWidth) {
    width = window.innerWidth;
    height = width * 16 / 9;
}

const config = {
    type: Phaser.WEBGL,
    parent: 'wrapper',
    width,
    height,
    // backgroundColor: '#141414',
    backgroundColor: '#0e0e0e',
    scene: [
        LoadingScene,
        MainScene,
        WinScene,
        ResultScene
    ]
};

const game = new Phaser.Game(config);
window.a = game;
