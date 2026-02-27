const MAX_MISSES = 5;

export default class GameController {
    constructor(gamePlay) {
        this.gamePlay = gamePlay;
        this.hitCount = 0;
        this.missCount = 0;
        this.activePosition = null;
        this.goblinIsVisible = false;
        this.timerId = null;
        // Добавляем флаг, чтобы знать, когда игра завершена
        this.isGameOver = false; 
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
        // Если игра уже закончена, таймер не должен ничего делать
        if (this.isGameOver) return;

        if (this.goblinIsVisible) {
            this.missCount += 1;
            this.gamePlay.updateScore(this.hitCount, this.missCount);
        }

        // Используем константу вместо цифры 5
        if (this.missCount >= MAX_MISSES) {
            clearInterval(this.timerId);
            this.isGameOver = true; // Ставим флаг, что игра окончена
            this.gamePlay.hideGoblin(); // Прячем гоблина, чтобы по нему нельзя было кликнуть
            this.gamePlay.showGameOver(); // Вызываем красивое сообщение вместо alert()
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
        // Защита: если игра окончена, игнорируем любые клики
        if (this.isGameOver) return;

        // Находим именно ячейку (.cell), даже если кликнули по картинке внутри неё
        const clickedCell = event.target.closest('.cell'); 
        if (!clickedCell) return;

        const clickedIndex = this.gamePlay.cells.indexOf(clickedCell);

        if (clickedIndex === this.activePosition && this.goblinIsVisible) {
            this.hitCount += 1;
            this.goblinIsVisible = false;
            this.gamePlay.hideGoblin();
            this.gamePlay.updateScore(this.hitCount, this.missCount);
        }
    }
}
