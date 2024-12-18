import { BFS, DFS, dijkstra, AStar } from "./pathfinding_algorithms.js";

const nRow = 15;
const nCol = 35;

const sourceId = "7-5";
const goalId = "7-29";

const randomButton = document.getElementById("random");
const runButton = document.getElementById("run");
const clearButton = document.getElementById("clear");

let walls = [];

function generateWalls(nums = 150) {
    walls.forEach((cell) => {
        cell.classList.replace("wall", "unvisited");
    });
    walls = [];

    let visited = Array.from(document.getElementsByClassName("visited"));
    visited.forEach((cell) => {
        cell.classList.replace("visited", "unvisited");
    });

    let path = Array.from(document.getElementsByClassName("path"));
    path.forEach((cell) => {
        if (String(cell.id) !== sourceId && String(cell.id) !== goalId) {
            cell.classList.replace("path", "unvisited");
        } else if (String(cell.id) === sourceId) {
            cell.classList.replace("path", "source");
        } else {
            cell.classList.replace("path", "goal");
        }
    });

    let unvisited = document.getElementsByClassName("unvisited");
    let availableCells = Array.from(unvisited);

    if (availableCells.length === 0) {
        return;
    }

    for (let i = 0; i < nums; i++) {
        if (availableCells.length === 0) {
            return;
        }
        let randomId = Math.floor(Math.random() * availableCells.length);
        let randomCell = availableCells[randomId];
        walls.push(randomCell);
    }

    for (let cell of walls) {
        cell.classList.replace("unvisited", "wall");
    }
}

function clearBoard() {
    let visited = Array.from(document.getElementsByClassName("visited"));
    visited.forEach((cell) => {
        cell.classList.replace("visited", "unvisited");
    });

    let path = Array.from(document.getElementsByClassName("path"));
    path.forEach((cell) => {
        if (String(cell.id) !== sourceId && String(cell.id) !== goalId) {
            cell.classList.replace("path", "unvisited");
        } else if (String(cell.id) === sourceId) {
            cell.classList.replace("path", "source");
        } else {
            cell.classList.replace("path", "goal");
        }
    });
}

function render(currentId) {
    let currentCell = document.getElementById(currentId);
    if (currentId == sourceId) {
        currentCell.classList.replace("source", "visited");
    } else if (currentId == goalId) {
        currentCell.classList.replace("goal", "visited");
    } else {
        currentCell.classList.replace("unvisited", "visited");
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getNeighbors(currentCell) {
    let [row, col] = currentCell.split("-");
    row = parseInt(row);
    col = parseInt(col);
    let directions = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
    ];
    let neighbors = [];
    for (let d of directions) {
        let neighborRow = row + d[0];
        let neighborCol = col + d[1];
        let neighborId = neighborRow + "-" + neighborCol;
        let isWall = walls.find((wall) => wall.id == neighborId);
        if (
            !isWall &&
            neighborRow >= 0 &&
            neighborRow < nRow &&
            neighborCol >= 0 &&
            neighborCol < nCol
        ) {
            neighbors.push(neighborId);
        }
    }
    return neighbors;
}

randomButton.addEventListener("click", () => {
    generateWalls();
});

clearButton.addEventListener("click", () => {
    clearBoard();
});

runButton.addEventListener("click", async () => {
    const selectedAlgorithm = document.getElementById("algorithm-list").value;
    let predecessor;

    switch (selectedAlgorithm) {
        case "Breadth-First Search":
            predecessor = await BFS(
                sourceId,
                goalId,
                getNeighbors,
                async (currentCell) => {
                    render(currentCell);
                    await delay(20);
                }
            );
            break;
        case "Depth-First Search":
            predecessor = await DFS(
                sourceId,
                goalId,
                getNeighbors,
                async (currentCell) => {
                    render(currentCell);
                    await delay(20);
                }
            );
            break;
        case "Dijkstra":
            predecessor = await dijkstra(
                sourceId,
                goalId,
                getNeighbors,
                async (currentCell) => {
                    render(currentCell);
                    await delay(20);
                }
            );
            break;
        case "A* Search":
            predecessor = await AStar(
                sourceId,
                goalId,
                getNeighbors,
                async (currentCell) => {
                    render(currentCell);
                    await delay(20);
                }
            );
            break;
    }

    async function renderPath(currentId) {
        let currentCell = document.getElementById(currentId);
        if (currentId === sourceId) {
            currentCell.classList.replace("visited", "path");
        } else {
            await renderPath(predecessor[currentId]);
            currentCell.classList.replace("visited", "path");
        }
        await delay(20);
    }

    await renderPath(goalId);
});

generateWalls();
