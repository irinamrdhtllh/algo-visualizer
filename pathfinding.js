const randomButton = document.getElementById("random");

function generateWalls(nums = 100) {
    const allCells = document.querySelectorAll(".unvisited, .wall");

    allCells.forEach(cell => {
        if (cell.classList.contains("wall")) {
            cell.classList.replace("wall", "unvisited");
        }
    })

    const unvisited = document.getElementsByClassName("unvisited");
    const availableCells = Array.from(unvisited);

    if (availableCells.length === 0) {
        return;
    }

    for (let i = 0; i < nums; i++) {
        if (availableCells.length === 0) {
            return;
        }

        let randomIndex = Math.floor(Math.random() * availableCells.length);
        const randomCell = availableCells[randomIndex];

        randomCell.classList.replace("unvisited", "wall");
        availableCells.splice(randomIndex, 1);
    }
}

randomButton.addEventListener("click", () => {
    generateWalls();
});

generateWalls();