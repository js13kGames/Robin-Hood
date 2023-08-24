export default class MazeGenerator {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array(rows).fill(null).map(()=>new Array(cols).fill(true));
        this.generateMaze();
    }

    generateMaze() {
        this.clearMaze();
        this.carvePassage(0, 0);
        return this.grid;
    }

    clearMaze() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col] = true;
            }
        }
    }

    carvePassage(row, col) {
        this.grid[row][col] = false;

        const directions = this.shuffleDirections();
        for (const direction of directions) {
            const newRow = row + direction[0];
            const newCol = col + direction[1];

            if (this.isValidCell(newRow, newCol) && this.grid[newRow][newCol]) {
                const betweenRow = row + direction[0] / 2;
                const betweenCol = col + direction[1] / 2;
                this.grid[betweenRow][betweenCol] = false;
                this.carvePassage(newRow, newCol);
            }
        }
    }

    isValidCell(row, col) {
        return row >= 0 && row < this.rows && col >= 0 && col < this.cols;
    }

    shuffleDirections() {
        const directions = [[-2, 0], [2, 0], [0, -2], [0, 2]];
        for (let i = directions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [directions[i],directions[j]] = [directions[j], directions[i]];
        }
        return directions;
    }
}
