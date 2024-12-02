import { insertionSort, mergeSort, heapSort, quickSort } from "./algorithms.js";

const randomButton = document.getElementById("random");
const runButton = document.getElementById("run");
const container = document.getElementById("container");
let nums = [];

function generateArray(size = 50) {
    nums = [];
    for (let i = 0; i < size; i++) {
        nums.push(Math.floor(Math.random() * 20) + 1);
    }
    render();
}

function render(focusIndex) {
    container.innerHTML = "";
    for (let i = 0; i < nums.length; i++) {
        const num = nums[i];
        const div = document.createElement("div");
        div.style.width = "42px";
        div.style.height = `${18 * num}px`;
        div.style.border = "1px solid black";
        if (i == focusIndex) {
        div.style.background = "purple";
        }
        container.append(div);
    }
}

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

randomButton.addEventListener("click", () => {
    generateArray(10);
});

runButton.addEventListener("click", () => {
    const selectedAlgorithm =
        document.getElementById("algorithm-list").value;

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
    }
});

generateArray(10);
