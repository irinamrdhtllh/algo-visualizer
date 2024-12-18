import {
    insertionSort,
    mergeSort,
    heapSort,
    quickSort,
    selectionSort,
} from "./sorting_algorithms.js";

const randomButton = document.getElementById("random");
const runButton = document.getElementById("run");
const container = document.getElementById("container");
let nums = [];

function generateArray(size = 15) {
    nums = [];
    for (let i = 0; i < size; i++) {
        nums.push(Math.floor((Math.random() * (1 - 0.1) + 0.1) * 20) + 1);
    }
    render();
}

function render(focusIndex) {
    container.innerHTML = "";
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const div = document.createElement("div");
        div.style.width = "2.75vw";
        div.style.height = `${2.5 * num}vh`;
        div.style.border = "1px solid #5CC0BC";
        if (i == focusIndex) {
            div.style.background = "#5CC0BC";
        } else {
            div.style.background = "white";
        }
        container.append(div);
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

randomButton.addEventListener("click", () => {
    generateArray();
});

runButton.addEventListener("click", () => {
    const selectedAlgorithm = document.getElementById("algorithm-list").value;

    switch (selectedAlgorithm) {
        case "Insertion Sort":
            insertionSort(nums, async (focusIndex) => {
                render(focusIndex);
                await delay(200);
            });
            break;
        case "Merge Sort":
            mergeSort(nums, async (focusIndex) => {
                render(focusIndex);
                await delay(200);
            });
            break;
        case "Heap Sort":
            heapSort(nums, async (focusIndex) => {
                render(focusIndex);
                await delay(200);
            });
            break;
        case "Quick Sort":
            quickSort(nums, async (focusIndex) => {
                render(focusIndex);
                await delay(200);
            });
            break;
        case "Selection Sort":
            selectionSort(nums, async (focusIndex) => {
                render(focusIndex);
                await delay(200);
            });
            break;
    }
});

generateArray();
