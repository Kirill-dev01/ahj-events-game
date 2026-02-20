export default class GameController {
    constructor(gamePlay) {
        this.gamePlay = gamePlay;
        this.hitCount = 0;
        this.missCount = 0;
        this.activePosition = null;
        this.goblinIsVisible = false;
        this.timerId = null;
    }

    init() {
        this.gamePlay.drawBoard();

        this.gamePlay.boardEl.addEventListener('click', (event) => this.onCellClick(event));

        this.start();
    }

    start() {
        this.timerId = setInterval(() => {
            this.tick();
        }, 1000);
    }

    tick() {
        if (this.goblinIsVisible) {
            this.missCount += 1;
            this.gamePlay.updateScore(this.hitCount, this.missCount);
        }

        // Проверка поражения
        if (this.missCount >= 5) {
            clearInterval(this.timerId);
            alert('Game Over! Вы пропустили 5 гоблинов.');
            return;
        }

        this.gamePlay.hideGoblin();
        let newPosition;
        do {
            newPosition = Math.floor(Math.random() * this.gamePlay.cells.length);
        } while (newPosition === this.activePosition);

        this.activePosition = newPosition;
        this.gamePlay.showGoblin(this.activePosition);
        this.goblinIsVisible = true;
    }

    onCellClick(event) {
        const clickedCell = event.target;
        const clickedIndex = this.gamePlay.cells.indexOf(clickedCell);

        if (clickedIndex === this.activePosition && this.goblinIsVisible) {
            this.hitCount += 1;
            this.goblinIsVisible = false;
            this.gamePlay.hideGoblin();
            this.gamePlay.updateScore(this.hitCount, this.missCount);
        }
    }
}