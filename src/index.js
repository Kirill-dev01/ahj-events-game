import './css/style.css';
import GamePlay from './js/GamePlay';
import GameController from './js/GameController';

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector('#game-container'));

const gameController = new GameController(gamePlay);
gameController.init();