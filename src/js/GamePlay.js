import goblinImg from '../img/goblin.png';

export default class GamePlay {
    constructor() {
        this.boardSize = 4;
        this.container = null;
        this.cells = [];
    }

    bindToDOM(container) {
        if (!(container instanceof HTMLElement)) {
            throw new Error('container is not HTMLElement');
        }
        this.container = container;
    }

    drawBoard() {
        // Создаем табло со счетом
        this.statusEl = document.createElement('div');
        this.statusEl.innerHTML = `Попаданий: <span id="hit">0</span> | Промахов: <span id="miss">0</span>`;
        this.container.append(this.statusEl);

        // Создаем поле
        this.boardEl = document.createElement('div');
        this.boardEl.classList.add('board');

        for (let i = 0; i < this.boardSize ** 2; i += 1) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            this.boardEl.append(cell);
        }

        this.cells = Array.from(this.boardEl.children);
        this.container.append(this.boardEl);
    }

    showGoblin(index) {
        if (!this.goblinElement) {
            this.goblinElement = document.createElement('img');
            this.goblinElement.src = goblinImg;
            this.goblinElement.classList.add('goblin');
        }
        this.cells[index].append(this.goblinElement);
    }

    hideGoblin() {
        if (this.goblinElement && this.goblinElement.parentElement) {
            this.goblinElement.remove();
        }
    }

    updateScore(hit, miss) {
        document.getElementById('hit').textContent = hit;
        document.getElementById('miss').textContent = miss;
    }
}