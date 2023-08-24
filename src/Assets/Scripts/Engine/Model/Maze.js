export default class Maze {
    constructor(rows, cols) {
        this.rows = rows;
        this.cols = cols;
        this.grid = new Array(rows).fill(null).map(() => new Array(cols).fill(true)); // Initialize grid with walls
        this.visited = new Array(rows).fill(null).map(() => new Array(cols).fill(false)); // Initialize visited cells
        this.start = { row: 0, col: 0 };
        this.generateMaze(this.start.row, this.start.col);
    }

    generateMaze(row, col) {
        this.visited[row][col] = true;
        const directions = [
            { row: -1, col: 0 }, 
            { row: 0, col: 1 }, 
            { row: 1, col: 0 }, 
            { row: 0, col: -1 }
        ];
        directions.sort(() => Math.random() - 0.5); // Randomize the order of directions

        for (const direction of directions) {
            const newRow = row + direction.row;
            const newCol = col + direction.col;

            if (newRow >= 0 && newRow < this.rows && newCol >= 0 && newCol < this.cols && !this.visited[newRow][newCol]) {
                this.grid[newRow][newCol] = false; // Remove wall
                this.generateMaze(newRow, newCol); // Recursive call
            }
        }
    }

    toString() {
        let result = '';
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                result += this.grid[row][col] ? '#' : ' ';
            }
            result += '\n';
        }
        return result;
    }
}

// const maze = new Maze(10, 10); // Create a 10x10 maze
